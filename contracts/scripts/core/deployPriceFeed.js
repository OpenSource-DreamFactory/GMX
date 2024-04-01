const {
  getFrameSigner,
  deployContract,
  contractAt,
  verifyContract,
  sendTxn
} = require("../shared/helpers");
const { expandDecimals } = require("../../test/shared/utilities");
const { getNetwork, getDeployFilteredInfo } = require("../shared/syncParams");
const tokenList = require('./tokens')

async function deployPriceFeed() {
  const signer = await getFrameSigner();
  const tokenManagerAddr = signer.address;

  const network = getNetwork();
  const tokens = tokenList

  
  

  const {btc, eth, bnb, busd, usdc, usdt} = tokens
  const tokenArr = [btc, eth, bnb, busd, usdc, usdt]
  const fastPriceTokens = [btc, eth, bnb]

  // let fastPriceTokens = []
  // for (const coin in tokens) {
  //   fastPriceTokens = [...fastPriceTokens, tokens[coin]]
  // }

  const  fastPriceEventsAddress = await deployContract("FastPriceEvents", [])

  const fastPriceEvents = await contractAt(
    "FastPriceEvents",
    fastPriceEventsAddress.address
  )

  // const  positionUtilsAddr = await deployContract("PositionUtils", [])

  const tokenManager = "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
  // const positionUtils = positionUtilsAddr.address

  // const positionRouter1 = await contractAt(
  //   "PositionRouter",
  //   "0x34241D273f3b63EAd42b2AFa81D16b74a53cfBE9", undefined, {
  //     libraries: {
  //       PositionUtils: positionUtils
  //     }
  //   }
  // )

  // const positionRouter2 = await contractAt(
  //   "PositionRouter",
  //   "0x0508Ae0720Fd04a9C80827BDD1D76eFEe2490cA0", undefined, {
  //     libraries: {
  //       PositionUtils: positionUtils
  //     }
  //   }
  // )
  
  const chainlinkFlags = "0x51c02BF4c2129fc935b3A2D1d7B679A347e6d80F" 
  
  // let tokenArr = []
  // for (const coin in tokens) {
  //   tokenArr = [...tokenArr, tokens[coin]]
  // }

  const updaters = [
    "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
    // getDeployFilteredInfo("MultiSigner1").imple,
    // getDeployFilteredInfo("MultiSigner2").imple,
    // getDeployFilteredInfo("MultiSigner3").imple,
    // getDeployFilteredInfo("MultiSigner4").imple,
  ];
  // const  priceFeedTimelockAddr = await deployContract("PriceFeedTimelock", [])
  const priceFeedTimelock = "0x7221B8C803F04Ed9cfFEab080912B81a1e863A5c"

  const signers = [
    "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
    // getDeployFilteredInfo("MultiSigner1").imple, // coinflipcanada
    // getDeployFilteredInfo("MultiSigner2").imple, // G Account 1
    // getDeployFilteredInfo("MultiSigner3").imple, // G Account 2
    // getDeployFilteredInfo("MultiSigner4").imple, // kr
    // getDeployFilteredInfo("MultiSigner5").imple, // quat
    // getDeployFilteredInfo("MultiSigner6").imple, // xhiroz
  ];

  if (fastPriceTokens.find((t) => !t?.fastPricePrecision)) {
    throw new Error("Invalid price precision");
  }

  if (fastPriceTokens.find((t) => !t?.maxCumulativeDeltaDiff)) {
    throw new Error("Invalid price maxCumulativeDeltaDiff");
  }

  const secondaryPriceFeed = await deployContract("FastPriceFeed", [
    5 * 60, // _priceDuration
    60 * 60, // _maxPriceUpdateDelay
    1, // _minBlockInterval
    250, // _maxDeviationBasisPoints
    fastPriceEvents.address, // _fastPriceEvents
    tokenManagerAddr, // _tokenManager
  ]);

  // await verifyContract("FastPriceFeed",secondaryPriceFeed.address,"contracts/oracle/FastPriceFeed.sol:FastPriceFeed",[
  //   5 * 60, // _priceDuration
  //   60 * 60, // _maxPriceUpdateDelay
  //   1, // _minBlockInterval
  //   250, // _maxDeviationBasisPoints
  //   fastPriceEvents.address, // _fastPriceEvents
  //   tokenManagerAddr, // _tokenManager
  // ])

  const vaultPriceFeed = await contractAt("VaultPriceFeed","0xF884116910AbaCe658826f2C3Fdb77fB2648520D")

  await sendTxn(
    vaultPriceFeed.setMaxStrictPriceDeviation(expandDecimals(1, 28)),
    "vaultPriceFeed.setMaxStrictPriceDeviation"
  ) // 0.01 USD

  await sendTxn(
    vaultPriceFeed.setPriceSampleSpace(1),
    "vaultPriceFeed.setPriceSampleSpace"
  )

  await sendTxn(
    vaultPriceFeed.setSecondaryPriceFeed(secondaryPriceFeed.address),
    "vaultPriceFeed.setSecondaryPriceFeed"
  )

  await sendTxn(
    vaultPriceFeed.setIsAmmEnabled(false),
    "vaultPriceFeed.setIsAmmEnabled"
  )


  // if (chainlinkFlags) {
    // await sendTxn(
    //   vaultPriceFeed.setChainlinkFlags(chainlinkFlags),
    //   "vaultPriceFeed.setChainlinkFlags"
    // );
  // }

  // for (const [i, tokenItem] of tokenArr.entries()) {
  //   if (tokenItem === undefined || tokenItem.spreadBasisPoints === undefined) {
  //     continue;
  //   }
  //   await sendTxn(
  //     vaultPriceFeed.setSpreadBasisPoints(
  //       tokenItem.address, // _token
  //       tokenItem.spreadBasisPoints // _spreadBasisPoints
  //     ),
  //     `vaultPriceFeed.setSpreadBasisPoints(${tokenItem.name}) ${tokenItem.spreadBasisPoints}`
  //   )
  // }

  // for (const token of tokenArr) {
  //   if (token === undefined) continue

    // await sendTxn(
    //   vaultPriceFeed.setTokenConfig(
    //     token.address, // _token
    //     token.priceFeed, // _priceFeed
    //     token.priceDecimals, // _priceDecimals
    //     token.stable // _isStrictStable
    //   ),
    //   `vaultPriceFeed.setTokenConfig(${token.name}) ${token.address} ${token.priceFeed}`
    // );
  }

  await sendTxn(
    secondaryPriceFeed.initialize(1, signers, updaters),
    "secondaryPriceFeed.initialize"
  )

  // await sendTxn(
  //   secondaryPriceFeed.setTokens(
  //     fastPriceTokens.filter(t => t !== undefined).map((t) => t.address),
  //     fastPriceTokens.filter(t => t !== undefined).map((t) => t.fastPricePrecision)
  //   ),
  //   "secondaryPriceFeed.setTokens"
  // )

  await sendTxn(
    secondaryPriceFeed.setVaultPriceFeed(vaultPriceFeed.address),
    "secondaryPriceFeed.setVaultPriceFeed"
  )

  await sendTxn(
    secondaryPriceFeed.setMaxTimeDeviation(60 * 60),
    "secondaryPriceFeed.setMaxTimeDeviation"
  )

  await sendTxn(
    secondaryPriceFeed.setSpreadBasisPointsIfInactive(20), // +- 0.2%: min, max price inactive
    "secondaryPriceFeed.setSpreadBasisPointsIfInactive"
  )

  await sendTxn(
    secondaryPriceFeed.setSpreadBasisPointsIfChainError(50), // +-0.5%: min, max price for chain error.
    "secondaryPriceFeed.setSpreadBasisPointsIfChainError"
  )

  // await sendTxn(
  //   secondaryPriceFeed.setMaxCumulativeDeltaDiffs(
  //     fastPriceTokens.filter(t => t !== undefined).map((t) => t.address),
  //     fastPriceTokens.filter(t => t !== undefined).map((t) => t.maxCumulativeDeltaDiff)
  //   ),
  //   "secondaryPriceFeed.setMaxCumulativeDeltaDiffs"
  // )

  await sendTxn(
    secondaryPriceFeed.setPriceDataInterval(1 * 60),
    "secondaryPriceFeed.setPriceDataInterval"
  )

  // await sendTxn(
  //   positionRouter1.setPositionKeeper(secondaryPriceFeed.address, true),
  //   "positionRouter.setPositionKeeper(secondaryPriceFeed)"
  // )

  // await sendTxn(
  //   positionRouter2.setPositionKeeper(secondaryPriceFeed.address, true),
  //   "positionRouter.setPositionKeeper(secondaryPriceFeed)"
  // )

  await sendTxn(
    fastPriceEvents.setIsPriceFeed(secondaryPriceFeed.address, true),
    "fastPriceEvents.setIsPriceFeed"
  )

  // await sendTxn(
  //   vaultPriceFeed.setGov(priceFeedTimelock),
  //   "vaultPriceFeed.setGov"
  // )

  // await sendTxn(
  //   secondaryPriceFeed.setGov(priceFeedTimelock),
  //   "secondaryPriceFeed.setGov"
  // )
  
  await sendTxn(
    secondaryPriceFeed.setTokenManager(tokenManager),
    "secondaryPriceFeed.setTokenManager"
  );
}

deployPriceFeed()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
