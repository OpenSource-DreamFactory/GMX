const { deployContract,contractAt,sendTxn, verifyContract } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
async function main() {
  // const initialSupply = expandDecimals(100 * 1000, 18)
  // const xgmt = await deployContract("YieldToken", ["xGambit", "xGMT", initialSupply])
  // verifyContract("YieldToken",xgmt.address,["xGambit", "xGMT", "contracts/token/MintableBaseToken.sol", initialSupply]) 
  const slpDeployment =  await deployContract("SLP", ["SLP", "SLP"])
  await verifyContract("SLP",slpDeployment.address,"contracts/gmx/SLP.sol:SLP", ["SLP", "SLP"]) 
  const glp = await contractAt("SLP", slpDeployment.address)
  await sendTxn(glp.setInPrivateTransferMode(true), "glp.setInPrivateTransferMode")
  // await verifyContract("ShortsTracker",shortsTracker.address,"scripts/core/ShortsTracker.sol:ShortsTracker",[vaultAddress])  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
