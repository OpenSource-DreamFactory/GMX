const { deployContract, contractAt, sendTxn, getFrameSigner, verifyContract } = require("../shared/helpers")
const { getDeployFilteredInfo } = require("../shared/syncParams");

async function deployPriceFeedTimelock() {
  const signer = await getFrameSigner()
  const admin = signer.address
  const buffer = 24 * 60 * 60

  const tokenManager  = "0xe9c6480593f1D2e5a000C9808c9145257Ca10AcE"

  const priceFeedTimelockAddr  =  await deployContract("PriceFeedTimelock", [
    admin,
    buffer,
    tokenManager
  ], "PriceFeedTimelock")

  await verifyContract("PriceFeedTimelock", priceFeedTimelockAddr.address, "contracts/peripherals/PriceFeedTimelock.sol:PriceFeedTimelock",[
    admin,
    buffer,
    tokenManager
  ])

  // const timelock = await contractAt("PriceFeedTimelock", priceFeedTimelockAddr.address)

  const deployedTimelock = await contractAt("PriceFeedTimelock",priceFeedTimelockAddr.address)

  const signers = [
   "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
  ]

  console.log("Signing contract handlers...", deployedTimelock.address)
  for (let i = 0; i < signers.length; i++) {
    const signer = signers[i]
    await sendTxn(deployedTimelock.setContractHandler(signer, true), `deployedTimelock.setContractHandler(${signer})`)
  }

  const keepers = [
    "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
  ]

  console.log("Signing keepers...")
  for (let i = 0; i < keepers.length; i++) {
    const keeper = keepers[i]
    await sendTxn(deployedTimelock.setKeeper(keeper, true), `deployedTimelock.setKeeper(${keeper})`)
  }
}

deployPriceFeedTimelock()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
