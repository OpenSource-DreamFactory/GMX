const { contractAt, sendTxn } = require("../shared/helpers")
const { getDeployFilteredInfo } = require("../shared/syncParams");

async function directPoolDeposit() {
  const amount = 100
  const router = await contractAt("Router", "0x729E3eD537499DB055c2704665171897DAF53fE4")
  const WETH = await contractAt("WETH", "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF")
  const btc = await contractAt("FaucetToken","0xa55dc525780e5c40916dA3B9798EcbdC56e4878c")
  // const usdt = await contractAt("ArbitrumExtension","0x0760CC619df90d875B97277550A744d603c91F60")
  await sendTxn(WETH.approve(router.address, amount), "router.approve")
  await sendTxn(btc.approve(router.address, amount), "router.approve")
  // await sendTxn(usdt.approve(router.address, amount), "router.approve")
  await sendTxn(router.directPoolDeposit(btc.address, amount), "router.directPoolDeposit")
  await sendTxn(router.directPoolDeposit(WETH.address, amount), "router.directPoolDeposit")
  // await sendTxn(router.directPoolDeposit(usdt.address, amount), "router.directPoolDeposit")
}

directPoolDeposit()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
