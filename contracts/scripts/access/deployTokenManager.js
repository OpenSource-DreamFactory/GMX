const { deployContract, contractAt, sendTxn } = require("../shared/helpers")
// const { getDeployFilteredInfo } = require("../shared/syncParams")

async function deployTokenManager() {
  const tokenManagerDeployment = await deployContract("TokenManager", [1], "TokenManager")
  // console.log("Deployed contract address:", contractAddress);
  const tokenManagerAddress = tokenManagerDeployment.address;

  const tokenManager = await contractAt("TokenManager", tokenManagerAddress)
//  console.log("Deployed tokenManger.admin address:", tokenManager.admin);
  const multiSigners = ["0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"]
    // getDeployFilteredInfo("MultiSigner1").imple, // Dovey
    // getDeployFilteredInfo("MultiSigner2").imple, // G
    // getDeployFilteredInfo("MultiSigner3").imple, // Han Wen
    // getDeployFilteredInfo("MultiSigner4").imple, // Krunal Amin
    // getDeployFilteredInfo("MultiSigner5").imple, // xhiroz
    // getDeployFilteredInfo("MultiSigner6").imple // Bybit Security Team
  // ]

  await sendTxn(tokenManager.initialize(multiSigners), "tokenManager.initialize")
}

// module.exports = deployTokenMawnager

deployTokenManager()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })