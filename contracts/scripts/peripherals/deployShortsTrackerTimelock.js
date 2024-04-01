const {
  deployContract,
  contractAt,
  sendTxn,
  verifyContract,
  getFrameSigner
} = require("../shared/helpers")

const { getDeployFilteredInfo } = require("../shared/syncParams");

async function deployShortsTrackerTimelock() {
  const signer = await getFrameSigner()
  const admin = signer.address
  const handlers = [
    "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
  ]

  const buffer = 60 // 60 seconds
  const updateDelay = 300 // 300 seconds, 5 minutes
  const maxAveragePriceChange = 20 // 0.2%

  const shortsTrackerTimelockDeployment = await deployContract("ShortsTrackerTimelock", [admin, buffer, updateDelay, maxAveragePriceChange])

  await verifyContract("ShortsTrackerTimelock",shortsTrackerTimelockDeployment.address,"contracts/peripherals/ShortsTrackerTimelock.sol:ShortsTrackerTimelock",[admin, buffer, updateDelay, maxAveragePriceChange])

  const shortsTrackerTimelock = await contractAt("ShortsTrackerTimelock", shortsTrackerTimelockDeployment.address)

  // console.log("Setting handlers")
  for (const handler of handlers) {
    await sendTxn(
      shortsTrackerTimelock.setContractHandler(handler, true),
      `shortsTrackerTimelock.setContractHandler ${handler}`
    )
  }
}

deployShortsTrackerTimelock()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })