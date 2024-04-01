const { deployContract, contractAt, sendTxn, getFrameSigner, verifyContract } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities");
const { getDeployFilteredInfo } = require("../shared/syncParams");

async function deployTimelock() {
  const signer = await getFrameSigner()
  const admin = signer.address
  const buffer = 24 * 60 * 60
  const maxTokenSupply = expandDecimals("13250000", 18)
  const vault = await contractAt("Vault", "0x6119d2EC36Cd00E6C11182aC9518BC3d0a3FB388")
  const vaultAddress = "0x753c5c9dC72ACE96614f8f831b453343203b5eb7"
  const tokenManager = "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
  const glpManager =  "0xafC8aCb5F17b019b12Ef7977967Be9075C1c99a4"
  const rewardRouter = "0x5615cc53Ab83cCDD16BABB515599a14F325995fa" 
  // const { imple: glpManager } = getDeployFilteredInfo("GlpManager")
  // const { imple: rewardRouter } = getDeployFilteredInfo("RewardRouterV2")
  // const { imple: vault } = getDeployFilteredInfo("Vault")
  // const { imple: tokenManager } = getDeployFilteredInfo("TokenManager")
  // const { imple: glpManager } = getDeployFilteredInfo("GlpManager")
  // const { imple: rewardRouter } = getDeployFilteredInfo("RewardRouterV2")
  // const { imple: positionRouter } = getDeployFilteredInfo("PositionRouter")
  // const { imple: positionManager } = getDeployFilteredInfo("PositionManager")
  // const { imple: gmx } = getDeployFilteredInfo("GMX")
  const gmx = await contractAt("GSX", "0x6156eb94431FA4eEC03f0228caE9bd0F52f7F4Dd") 
  const mintReceiver = "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"

  const timelockDeployment =  await deployContract("Timelock", [
    admin, // admin
    buffer, // buffer
    tokenManager, // tokenManager
    mintReceiver, // mintReceiver
    glpManager, // glpManager
    rewardRouter, // rewardRouter
    maxTokenSupply, // maxTokenSupply
    10, // marginFeeBasisPoints 0.1%
    500 // maxMarginFeeBasisPoints 5%
  ], "Timelock")

  // await verifyContract("Timelock",timelockDeployment.address,"contracts/peripherals/Timelock.sol:Timelock",[
  //   admin, // admin
  //   buffer, // buffer
  //   tokenManager, // tokenManager
  //   mintReceiver, // mintReceiver
  //   glpManager, // glpManager
  //   rewardRouter, // rewardRouter
  //   maxTokenSupply, // maxTokenSupply
  //   10, // marginFeeBasisPoints 0.1%
  //   500 // maxMarginFeeBasisPoints 5%
  // ])

  // const vaultAddress = await contractAt("Vault", vault)
  const deployedTimelock = await contractAt("Timelock", timelockDeployment.address, signer)

  await sendTxn(deployedTimelock.setShouldToggleIsLeverageEnabled(true), "deployedTimelock.setShouldToggleIsLeverageEnabled(true)")
  // await sendTxn(deployedTimelock.setContractHandler(positionRouter.address, true), "deployedTimelock.setContractHandler(positionRouter)")
  // await sendTxn(deployedTimelock.setContractHandler(positionManager.address, true), "deployedTimelock.setContractHandler(positionManager)")

    // // update gov of vault
  // const vaultGov = await contractAt("Timelock", await vault.gov(), signer)

  // await sendTxn(vaultGov.signalSetGov(vault.address, deployedTimelock.address), "vaultGov.signalSetGov")
  // await sendTxn(deployedTimelock.signalSetGov(vault.address, vaultGov.address), "deployedTimelock.signalSetGov(vault)")

  const handlers = [
    "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
    // getDeployFilteredInfo("MultiSigner1").imple, // coinflipcanada
    // getDeployFilteredInfo("MultiSigner2").imple, // G
    // getDeployFilteredInfo("MultiSigner3").imple, // kr
    // getDeployFilteredInfo("MultiSigner4").imple, // quat
    // getDeployFilteredInfo("MultiSigner5").imple // xhiroz
  ]

  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i]
    await sendTxn(deployedTimelock.setContractHandler(handler, true), `deployedTimelock.setContractHandler(${handler})`)
  }

  const keepers = [
    "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
  ]

  for (let i = 0; i < keepers.length; i++) {
    const keeper = keepers[i]
    await sendTxn(deployedTimelock.setKeeper(keeper, true), `deployedTimelock.setKeeper(${keeper})`)
  }

  await sendTxn(deployedTimelock.signalApprove(gmx.address, admin, "1000000000000000000"), "deployedTimelock.signalApprove")
  // ReferralStorage
  // const referralStorage = await contractAt("ReferralStorage", getDeployFilteredInfo("ReferralStorage").imple)
  // await sendTxn(referralStorage.setGov(deployedTimelock.address), `referralStorage.setGov(${deployedTimelock.address})`)
}

deployTimelock()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })