const { deployContract } = require("../shared/helpers")

async function deployMulticall() {
  await deployContract("Multicall3", []);
}

deployMulticall()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })