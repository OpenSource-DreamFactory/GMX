const { deployContract, sendTxn, contractAt } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities");
const { getDeployFilteredInfo } = require("../shared/syncParams");

async function deployOrderBook() {
  const nativeToken = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF"
  
  const orderBookAdress =await deployContract("OrderBook", []);

  const orderBook = await contractAt("OrderBook", orderBookAdress.address)
  
  const routerInfo = "0x729E3eD537499DB055c2704665171897DAF53fE4"
  const vaultInfo = "0x6119d2EC36Cd00E6C11182aC9518BC3d0a3FB388"
  const usdgInfo = "0x194958fb9f5Ad2Dc229E02d6e0407e7dCbBA2203"
  console.log("%s,%s,%s,%s", orderBook.address,routerInfo,vaultInfo,usdgInfo)
  await sendTxn(orderBook.initialize(
    routerInfo, // router
    vaultInfo, // vault
    nativeToken, // weth
    usdgInfo, // usdg
    "10000000000000000", // 0.01 bnb
    expandDecimals(10, 30) // min purchase token amount usd
  ), "orderBook.initialize")
}

deployOrderBook()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })