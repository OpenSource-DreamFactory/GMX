const { deployContract } = require("../shared/helpers")

async function deployReader() {
  await deployContract("Reader", [], "Reader")
}

deployReader()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
