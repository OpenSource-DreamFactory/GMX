const { deployContract, contractAt , sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const { toUsd } = require("../../test/shared/units");
// const { blobFromSync } = require("node-fetch");

const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('./tokens')[network];

async function main() {
  const secondaryPriceFeed = await contractAt("FastPriceFeed", "0x7Aee3f20EFc8F5a976D6270C7D412274eB967B2E")
  const vaultPriceFeed = await contractAt("VaultPriceFeed", "0xF884116910AbaCe658826f2C3Fdb77fB2648520D")
  const timestamp = Math.floor(Date.now() / 1000)
  await sendTxn(vaultPriceFeed.setIsAmmEnabled(false), "vaultPriceFeed.setIsAmmEnabled")
  console.log("vaultPriceFeed.isSecondaryPriceEnabled", await vaultPriceFeed.isSecondaryPriceEnabled())
const btc = "0xa55dc525780e5c40916dA3B9798EcbdC56e4878c"
const eth = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF"
const usdt = "0x0760CC619df90d875B97277550A744d603c91F60"

  await sendTxn(secondaryPriceFeed.setPrices(
    [btc, eth, usdt],
    [expandDecimals(35000, 30), expandDecimals(4000, 30), expandDecimals(310, 30)],timestamp
  ), "secondaryPriceFeed.setPrices")
}

// setPrices(address[] memory _tokens, uint256[] memory _prices, uint256 _timestamp)
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
