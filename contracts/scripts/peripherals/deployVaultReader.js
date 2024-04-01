const { deployContract } = require("../shared/helpers")

async function deployVaultReader() {
  await deployContract("VaultReader", [], "VaultReader")
}

deployVaultReader()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
