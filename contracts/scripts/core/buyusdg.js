const { deployContract, contractAt, sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

async function main() {
  
  const usdg = await contractAt("USDG", "0x5459d284A0869b527eabA5d22C46f5277D157E3f")
  const router = await contractAt("Router","0x729E3eD537499DB055c2704665171897DAF53fE4")
  const weth = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF";
  const usdt = "0x61969f38cC00284f798474f5d2f7d2063fB63884";
  const btc = "0xa55dc525780e5c40916dA3B9798EcbdC56e4878c"; 
  
  await sendTxn(router.swap([usdt,usdg],expandDecimals(200, 18),expandDecimals(200, 18)), "router.swap")
  
 
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
