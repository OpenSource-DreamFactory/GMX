const { deployContract, sendTxn, verifyContract, callWithRetries } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

async function deployTokens() {
  // const addresses = {}
  // addresses.BTC = (await callWithRetries(deployContract, ["FaucetToken", ["Bitcoin", "BTC", 18, expandDecimals(1000, 18)]])).address
  // addresses.USDC = (await callWithRetries(deployContract, ["FaucetToken", ["LINK", "LINK", 18, expandDecimals(1000, 18)]])).address
  // addresses.USDT = (await callWithRetries(deployContract, ["FaucetToken", ["UNI", "UNI", 18, expandDecimals(1000, 18)]])).address
  // verifyContract("FaucetToken",xgmt.address,["xGambit", "xGMT", "contracts/token/MintableBaseToken.sol", initialSupply]) 
  // writeTmpAddresses(addresses)
  const usdt = await deployContract("FaucetToken", ["USDT", "USDT", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",usdt.address,"scripts/tokens/FaucetToken.sol", ["USDT", "USDT", 18, expandDecimals(1000, 18)]) 

  const usdc = await deployContract("FaucetToken", ["USDC", "USDC", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",usdc.address,"scripts/tokens/FaucetToken.sol", ["USDC", "USDC", 18, expandDecimals(1000, 18)]) 

  const dai = await deployContract("FaucetToken", ["DAI", "DAI", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",dai.address,"scripts/tokens/FaucetToken.sol", ["DAI", "DAI", 18, expandDecimals(1000, 18)]) 

  const USDCe = await deployContract("FaucetToken", ["USDC.e", "USDC.e", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",USDCe.address,"scripts/tokens/FaucetToken.sol", ["USDC.e", "USDC.e", 18, expandDecimals(1000, 18)]) 

  const Frax = await deployContract("FaucetToken", ["Frax", "Frax", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",Frax.address,"scripts/tokens/FaucetToken.sol", ["Frax", "Frax", 18, expandDecimals(1000, 18)]) 

  
  const btc = await deployContract("FaucetToken", ["Bitcoin", "BTC", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",btc.address,"scripts/tokens/FaucetToken.sol",["Bitcoin", "BTC", 18, expandDecimals(1000, 18)]) 
 
  const eth = await deployContract("FaucetToken", ["Ethereum", "ETH", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",eth.address,"scripts/tokens/FaucetToken.sol",["Ethereum", "ETH", 18, expandDecimals(1000, 18)]) 

  const LINK = await deployContract("FaucetToken", ["LINK", "LINK", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",LINK.address,"scripts/tokens/FaucetToken.sol", ["LINK", "LINK", 18, expandDecimals(1000, 18)]) 

  const UNI = await deployContract("FaucetToken", ["UNI", "UNI", 18, expandDecimals(1000, 18)])
  verifyContract("FaucetToken",UNI.address,"scripts/tokens/FaucetToken.sol", ["UNI", "UNI", 18, expandDecimals(1000, 18)]) 
}

deployTokens()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
