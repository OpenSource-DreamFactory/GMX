const { getFrameSigner, deployContract, contractAt , sendTxn, verifyContract, writeTmpAddresses } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const { toUsd } = require("../../test/shared/units");
const { getArgumentForSignature } = require("typechain");

const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('./tokens')[network];

async function getTestnetValues() {
  return { vaultAddress: "0x6119d2EC36Cd00E6C11182aC9518BC3d0a3FB388", gasLimit: 12500000 }
}

async function getArbValues() {
  return { vaultAddress: "0x489ee077994B6658eAfA855C308275EAd8097C4A", gasLimit: 12500000 }
}

async function getAvaxValues() {
  return { vaultAddress: "0x9ab2De34A33fB459b538c43f251eB825645e8595" }
}

async function getValues() {
  if (network === "avax") {
    return await getAvaxValues()
  } else if (network === "arbitrumTestnet") {
    return await getArbTestnetValues()
  } else {
    return await getArbValues()
  }
}

async function main() {
  const { vaultAddress, gasLimit } = await getTestnetValues()
  const gov = { address: "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c" }
  const shortsTracker = await deployContract("ShortsTracker", [vaultAddress], "ShortsTracker", { gasLimit })

  await verifyContract("ShortsTracker",shortsTracker.address,"scripts/core/ShortsTracker.sol:ShortsTracker",[vaultAddress])  
  await sendTxn(shortsTracker.setGov(gov.address), "shortsTracker.setGov")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
