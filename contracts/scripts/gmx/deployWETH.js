
const { deployContract } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

async function main() {
  const initialSupply = 7
  await deployContract("WETH", ["WETH", "weth", initialSupply])
  // return { weth }const weth = a
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
