const { deployContract } = require("../shared/helpers")

async function deployRewardReader() {
  await deployContract("RewardReader", [], "RewardReader")
}

deployRewardReader()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
