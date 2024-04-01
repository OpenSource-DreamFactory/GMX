const { contractAt, sendTxn, getFrameSigner } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const { toUsd } = require("../../test/shared/units");
const { ethers } = require("hardhat");

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

const { HashZero } = ethers.constants

async function createOrder() {
  const signer = await getFrameSigner()
  const Wallet = signer
  const executionFee = "13000000000000000";
  const orderBook = await contractAt("OrderBook", "0x2Cd73F86DB33eF663fCC123e417718d59725B1eb")
  const router = await contractAt("Router","0x729E3eD537499DB055c2704665171897DAF53fE4")
  const vault = await contractAt("Vault", "0x6119d2EC36Cd00E6C11182aC9518BC3d0a3FB388")
  const usdg = "0x5459d284A0869b527eabA5d22C46f5277D157E3f";
  const weth = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF";
  const usdt = "0x61969f38cC00284f798474f5d2f7d2063fB63884";
  const btc = "0xa55dc525780e5c40916dA3B9798EcbdC56e4878c";
    const maxPrice = await vault.getMaxPrice(weth);
    console.log("maxPrice:, %s ", maxPrice.toString(),orderBook.address);
    const acceptablePrice = maxPrice;

  const increaseOrderParams = [
    [weth], // _path
    expandDecimals(1, 1), // _amountIn
    usdt, // _indexToken
    0, // _minOut
    toUsd(50), // _sizeDelta
    weth, // collateralToken
    true, // _isLong
    toUsd(1000), // _triggerPrice
    false, //triggerAboveThreshold
    executionFee, // _executionFee
    false//shouldWrap
  ]

  const decreaseOrderParams = [
    weth, // _indexToken
    toUsd(50), // _sizeDelta
    usdt,//collateralToken
    toUsd(20), // _collateralDelta
    true, // _isLong
    maxPrice,  // triggerPrice
    true // _triggerAboveThreshold
  ]
    
    const tx = await orderBook.createIncreaseOrder(
      ...increaseOrderParams,
      { value: executionFee }
    );
    console.log("createIncreaseOrdertx: ", tx.hash);

  const tx2 =  await orderBook.createDecreaseOrder(
    ...decreaseOrderParams,
    { value: executionFee } 
  );
  console.log("createDecreaseOrdertx: ", tx2.hash);


}
 
// }

createOrder()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
