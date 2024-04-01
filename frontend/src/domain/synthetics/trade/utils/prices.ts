import { BASIS_POINTS_DIVISOR, DEFAULT_ACCEPABLE_PRICE_IMPACT_BUFFER } from "config/factors";
import { getCappedPositionImpactUsd, getPriceImpactByAcceptablePrice } from "domain/synthetics/fees";
import { MarketInfo } from "domain/synthetics/markets";
import { OrderType } from "domain/synthetics/orders";
import { TokenPrices, convertToTokenAmount } from "domain/synthetics/tokens";
import { BigNumber } from "ethers";
import { applyFactor, expandDecimals, getBasisPoints, roundUpMagnitudeDivision } from "lib/numbers";
import { TriggerThresholdType } from "../types";

export function getMarkPrice(p: { prices: TokenPrices; isIncrease: boolean; isLong: boolean }) {
  const { prices, isIncrease, isLong } = p;

  const shouldUseMaxPrice = getShouldUseMaxPrice(isIncrease, isLong);

  return shouldUseMaxPrice ? prices.maxPrice : prices.minPrice;
}

export function getDefaultAcceptablePriceImpactBps(p: {
  isIncrease: boolean;
  isLong: boolean;
  indexPrice: BigNumber;
  sizeDeltaUsd: BigNumber;
  priceImpactDeltaUsd: BigNumber;
  acceptablePriceImapctBuffer?: number;
}) {
  const {
    indexPrice,
    sizeDeltaUsd,
    priceImpactDeltaUsd,
    acceptablePriceImapctBuffer = DEFAULT_ACCEPABLE_PRICE_IMPACT_BUFFER,
  } = p;

  if (priceImpactDeltaUsd.gt(0)) {
    return BigNumber.from(acceptablePriceImapctBuffer);
  }

  const baseAcceptablePriceValues = getAcceptablePriceByPriceImpact({
    isIncrease: p.isIncrease,
    isLong: p.isLong,
    indexPrice,
    sizeDeltaUsd,
    priceImpactDeltaUsd,
  });

  if (baseAcceptablePriceValues.acceptablePriceDeltaBps.lt(0)) {
    return baseAcceptablePriceValues.acceptablePriceDeltaBps.abs().add(acceptablePriceImapctBuffer);
  }

  return BigNumber.from(acceptablePriceImapctBuffer);
}

export function getAcceptablePriceByPriceImpact(p: {
  isIncrease: boolean;
  isLong: boolean;
  indexPrice: BigNumber;
  sizeDeltaUsd: BigNumber;
  priceImpactDeltaUsd: BigNumber;
}) {
  const { indexPrice, sizeDeltaUsd, priceImpactDeltaUsd } = p;

  if (!sizeDeltaUsd.gt(0) || indexPrice.eq(0)) {
    return {
      acceptablePrice: indexPrice,
      acceptablePriceDeltaBps: BigNumber.from(0),
      priceDelta: BigNumber.from(0),
    };
  }

  const shouldFlipPriceImpact = getShouldUseMaxPrice(p.isIncrease, p.isLong);

  const priceImpactForPriceAdjustment = shouldFlipPriceImpact ? priceImpactDeltaUsd.mul(-1) : priceImpactDeltaUsd;
  const acceptablePrice = indexPrice.mul(sizeDeltaUsd.add(priceImpactForPriceAdjustment)).div(sizeDeltaUsd);
  const priceDelta = indexPrice.sub(acceptablePrice).mul(shouldFlipPriceImpact ? 1 : -1);
  const acceptablePriceDeltaBps = getBasisPoints(priceDelta, p.indexPrice);

  return {
    acceptablePrice,
    acceptablePriceDeltaBps,
    priceDelta,
  };
}

export function getAcceptablePriceInfo(p: {
  marketInfo: MarketInfo;
  isIncrease: boolean;
  isLong: boolean;
  indexPrice: BigNumber;
  sizeDeltaUsd: BigNumber;
  maxNegativePriceImpactBps?: BigNumber;
}) {
  const { marketInfo, isIncrease, isLong, indexPrice, sizeDeltaUsd, maxNegativePriceImpactBps } = p;
  const { indexToken } = marketInfo;

  const values = {
    acceptablePrice: BigNumber.from(0),
    acceptablePriceDeltaBps: BigNumber.from(0),
    priceImpactDeltaAmount: BigNumber.from(0),
    priceImpactDeltaUsd: BigNumber.from(0),
    priceImpactDiffUsd: BigNumber.from(0),
  };

  if (!sizeDeltaUsd.gt(0) || indexPrice.eq(0)) {
    return values;
  }

  const shouldFlipPriceImpact = getShouldUseMaxPrice(p.isIncrease, p.isLong);

  // For Limit / Trigger orders
  if (maxNegativePriceImpactBps?.gt(0)) {
    let priceDelta = indexPrice.mul(maxNegativePriceImpactBps).div(BASIS_POINTS_DIVISOR);
    priceDelta = shouldFlipPriceImpact ? priceDelta?.mul(-1) : priceDelta;

    values.acceptablePrice = indexPrice.sub(priceDelta);
    values.acceptablePriceDeltaBps = maxNegativePriceImpactBps.mul(-1);

    const priceImpact = getPriceImpactByAcceptablePrice({
      sizeDeltaUsd,
      acceptablePrice: values.acceptablePrice,
      indexPrice,
      isLong,
      isIncrease,
    });

    values.priceImpactDeltaUsd = priceImpact.priceImpactDeltaUsd;
    values.priceImpactDeltaAmount = priceImpact.priceImpactDeltaAmount;

    return values;
  }

  values.priceImpactDeltaUsd = getCappedPositionImpactUsd(
    marketInfo,
    isIncrease ? sizeDeltaUsd : sizeDeltaUsd.mul(-1),
    isLong,
    {
      fallbackToZero: !isIncrease,
    }
  );

  if (!isIncrease && values.priceImpactDeltaUsd.lt(0)) {
    const minPriceImpactUsd = applyFactor(sizeDeltaUsd, marketInfo.maxPositionImpactFactorNegative).mul(-1);

    if (values.priceImpactDeltaUsd.lt(minPriceImpactUsd)) {
      values.priceImpactDiffUsd = minPriceImpactUsd.sub(values.priceImpactDeltaUsd);
      values.priceImpactDeltaUsd = minPriceImpactUsd;
    }
  }

  if (values.priceImpactDeltaUsd.gt(0)) {
    values.priceImpactDeltaAmount = convertToTokenAmount(
      values.priceImpactDeltaUsd,
      indexToken.decimals,
      indexToken.prices.maxPrice
    )!;
  } else {
    values.priceImpactDeltaAmount = roundUpMagnitudeDivision(
      values.priceImpactDeltaUsd.mul(expandDecimals(1, indexToken.decimals)),
      indexToken.prices.minPrice
    );
  }

  const acceptablePriceValues = getAcceptablePriceByPriceImpact({
    isIncrease,
    isLong,
    indexPrice,
    sizeDeltaUsd,
    priceImpactDeltaUsd: values.priceImpactDeltaUsd,
  });

  values.acceptablePrice = acceptablePriceValues.acceptablePrice;
  values.acceptablePriceDeltaBps = acceptablePriceValues.acceptablePriceDeltaBps;

  return values;
}

export function applySlippageToPrice(allowedSlippage: number, price: BigNumber, isIncrease: boolean, isLong: boolean) {
  const shouldIncreasePrice = getShouldUseMaxPrice(isIncrease, isLong);

  const slippageBasisPoints = shouldIncreasePrice
    ? BASIS_POINTS_DIVISOR + allowedSlippage
    : BASIS_POINTS_DIVISOR - allowedSlippage;

  return price.mul(slippageBasisPoints).div(BASIS_POINTS_DIVISOR);
}

export function applySlippageToMinOut(allowedSlippage: number, minOutputAmount: BigNumber) {
  const slippageBasisPoints = BASIS_POINTS_DIVISOR - allowedSlippage;

  return minOutputAmount.mul(slippageBasisPoints).div(BASIS_POINTS_DIVISOR);
}

export function getShouldUseMaxPrice(isIncrease: boolean, isLong: boolean) {
  return isIncrease ? isLong : !isLong;
}

export function getTriggerThresholdType(orderType: OrderType, isLong: boolean) {
  // limit order
  if (orderType === OrderType.LimitIncrease) {
    return isLong ? TriggerThresholdType.Below : TriggerThresholdType.Above;
  }

  // take profit order
  if (orderType === OrderType.LimitDecrease) {
    return isLong ? TriggerThresholdType.Above : TriggerThresholdType.Below;
  }

  // stop loss order
  if (orderType === OrderType.StopLossDecrease) {
    return isLong ? TriggerThresholdType.Below : TriggerThresholdType.Above;
  }

  throw new Error("Invalid trigger order type");
}

export function getTriggerDecreaseOrderType(p: {
  triggerPrice: BigNumber;
  markPrice: BigNumber;
  isLong: boolean;
}): OrderType.LimitDecrease | OrderType.StopLossDecrease {
  const { triggerPrice, markPrice, isLong } = p;

  const isTriggerAboveMarkPrice = triggerPrice.gt(markPrice);

  if (isTriggerAboveMarkPrice) {
    return isLong ? OrderType.LimitDecrease : OrderType.StopLossDecrease;
  } else {
    return isLong ? OrderType.StopLossDecrease : OrderType.LimitDecrease;
  }
}
