const { contractAt, sendTxn } = require("../shared/helpers")
const { expandDecimals, maxUint256 } = require("../../test/shared/utilities")

async function main() {
  const wallet = { address: "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c" }
  const gmx = await contractAt("GSX", "0x6156eb94431FA4eEC03f0228caE9bd0F52f7F4Dd")

  await sendTxn(gmx.setMinter(wallet.address, "true"), "gmx.setMinter(minter, isActive)")
  await sendTxn(gmx.mint(wallet.address, "100000000000000000000"), "gmx.mint(account, amount)")
  await sendTxn(gmx.approve("0xE67AC12f8d493504ea17CE06c0e6d22353F1Be0D", "100000000000000000000"), "gmx.approve(account, amount)")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
