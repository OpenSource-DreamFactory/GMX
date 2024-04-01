const { deployContract, contractAt , sendTxn, verifyContract, callWithRetries } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const { toUsd } = require("../../test/shared/units")



async function deployGlpManager() {


  const vault = await contractAt("Vault", "0x6119d2EC36Cd00E6C11182aC9518BC3d0a3FB388")
  const usdg = await contractAt("USDG", "0x194958fb9f5Ad2Dc229E02d6e0407e7dCbBA2203")
  // const glp = await contractAt("SLP", "0xE53ddF969b36fbc1fe9C5dEd196483Cd34bE759F")
  const glp = await contractAt("GLP", "0x3dF6149139830E068206fe9E6cF5396e7A8b14b5") 
  const shortsTracker =  "0x3CB12467d92a07ea75FFa56Fe11253C484D008F4"
  const glpManager = await deployContract("GlpManager", [vault.address, usdg.address, glp.address, shortsTracker, 15 * 60])
  await verifyContract("GlpManager",glpManager.address,"contracts/core/GlpManager.sol:GlpManager",[vault.address, usdg.address, glp.address,shortsTracker, 15 * 60]) 
  await sendTxn(glpManager.setInPrivateMode(true), "glpManager.setInPrivateMode")

  await sendTxn(glp.setMinter(glpManager.address, true), "glp.setMinter")
  await sendTxn(usdg.addVault(glpManager.address), "usdg.addVault")
  await sendTxn(vault.setManager(glpManager.address, true), "vault.setManager")


}

deployGlpManager()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
