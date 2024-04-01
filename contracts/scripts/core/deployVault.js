const { deployContract, contractAt , sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const { toUsd } = require("../../test/shared/units")
const { errors } = require("../../test/core/Vault/helpers")
const { getNetwork, getDeployFilteredInfo } = require("../shared/syncParams")
const { chainInfo } = require('../networks/chain')

async function deployVault() {
  const nativeToken  = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF";

  const vaultDeployment = await deployContract("Vault", [])
  const vaultAddress = vaultDeployment.address;
  const vault = await contractAt("Vault", vaultAddress)

  const usdgDeployment = await deployContract("USDG", [vault.address])

  const usdg = await contractAt("USDG", usdgDeployment.address)

  const routerDeployment = await deployContract("Router", [vault.address, usdg.address, nativeToken])

  const router = await contractAt("Router", routerDeployment.address)

  const vaultPriceDeployment = await deployContract("VaultPriceFeed", [])

  const vaultPriceFeed = await contractAt("VaultPriceFeed", vaultPriceDeployment.address)

  await sendTxn(vaultPriceFeed.setMaxStrictPriceDeviation(expandDecimals(1, 28)), "vaultPriceFeed.setMaxStrictPriceDeviation") // 0.05 USD
  await sendTxn(vaultPriceFeed.setPriceSampleSpace(1), "vaultPriceFeed.setPriceSampleSpace")
  await sendTxn(vaultPriceFeed.setIsAmmEnabled(false), "vaultPriceFeed.setIsAmmEnabled")
  
  const network = getNetwork()
  // deploy this manually for verification. ##################################################
  // ################################################## await deployContract("GLP", [chainInfo[network].glp.name, chainInfo[network].glp.symbol])
  const slpDeployment =  await deployContract("SLP", ["SLP", "SLP"])

  const glp = await contractAt("SLP", slpDeployment.address)

  await sendTxn(glp.setInPrivateTransferMode(true), "glp.setInPrivateTransferMode")
  
  const shortsTrackeDeployment = await deployContract("ShortsTracker", [vault.address]);

  const shortsTracker = await contractAt("ShortsTracker", shortsTrackeDeployment.address)

  const glpManagerDeployment = await deployContract("GlpManager", [vault.address, usdg.address, glp.address, shortsTracker.address, 15 * 60])

  const glpManager = await contractAt("GlpManager", glpManagerDeployment.address)

  await sendTxn(glpManager.setInPrivateMode(true), "glpManager.setInPrivateMode")

  await sendTxn(glp.setMinter(glpManager.address, true), "glp.setMinter")
  await sendTxn(usdg.addVault(glpManager.address), "usdg.addVault(glpManager)")

  await sendTxn(vault.initialize(
    router.address, // router
    usdg.address, // usdg
    vaultPriceFeed.address, // priceFeed
    toUsd(2), // liquidationFeeUsd
    100, // fundingRateFactor
    100 // stableFundingRateFactor
  ), "vault.initialize")

  await sendTxn(vault.setFundingRate(60 * 60, 100, 100), "vault.setFundingRate")

  await sendTxn(vault.setInManagerMode(true), "vault.setInManagerMode")
  await sendTxn(vault.setManager(glpManager.address, true), "vault.setManager")

  await sendTxn(vault.setFees(
    10, // _taxBasisPoints
    5, // _stableTaxBasisPoints
    20, // _mintBurnFeeBasisPoints
    20, // _swapFeeBasisPoints
    1, // _stableSwapFeeBasisPoints
    10, // _marginFeeBasisPoints
    toUsd(2), // _liquidationFeeUsd
    24 * 60 * 60, // _minProfitTime
    true // _hasDynamicFees
  ), "vault.setFees")

  const vaultErrorControllerDeployment = await deployContract("VaultErrorController", [])

  const vaultErrorController = await contractAt("VaultErrorController", vaultErrorControllerDeployment.address)

  await sendTxn(vault.setErrorController(vaultErrorController.address), "vault.setErrorController")
  await sendTxn(vaultErrorController.setErrors(vault.address, errors), "vaultErrorController.setErrors")

  const vaultUtilsDeployment = await deployContract("VaultUtils", [vault.address])

  const vaultUtils = await contractAt("VaultUtils", vaultUtilsDeployment.address)

  await sendTxn(vault.setVaultUtils(vaultUtils.address), "vault.setVaultUtils")
}


deployVault()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })