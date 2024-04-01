const { deployContract, contractAt, sendTxn, getFrameSigner } = require("../shared/helpers")
const { getDeployFilteredInfo } = require("../shared/syncParams")
const { chainInfo } = require('../networks/chain')
const { getNetwork } = require('../shared/syncParams')

async function deployRewardRouterV2() {
  const signer = await getFrameSigner()
  // const { imple: nativeToken } = getDeployFilteredInfo("WETH")
//365 * 24 * 60 * 60
  const nativeToken  = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF";

  const vestingDuration = 1

  const glpManager = await contractAt("GlpManager", "0xafC8aCb5F17b019b12Ef7977967Be9075C1c99a4")
  const glp = await contractAt("SLP", "0xE53ddF969b36fbc1fe9C5dEd196483Cd34bE759F")
  const gmx = await contractAt("GSX", "0x6156eb94431FA4eEC03f0228caE9bd0F52f7F4Dd");
  const esGmx = await contractAt("EsGSX", "0xDB32114EeaCe9a52E46581DA2af999a1ACB3B14B");

  // const network = getNetwork()

  const BonusGSX =  await deployContract("MintableBaseToken", ["Bonus GSX","bnGSX", 0], undefined, undefined, "BonusGSX");
  // verifyContract

  const bnGmx = await contractAt("MintableBaseToken", BonusGSX.address)

  // await sendTxn(esGmx.setInPrivateTransferMode(true), "esGmx.setInPrivateTransferMode")
  // await sendTxn(glp.setInPrivateTransferMode(true), "glp.setInPrivateTransferMode")

  const RewardTrackerStakedGMX =await deployContract("RewardTracker", ["Staked GSX", "sGSX"], undefined, undefined, "RewardTrackerStakedGMX")

  const stakedGmxTracker = await contractAt("RewardTracker", RewardTrackerStakedGMX.address)

  const RewardDistributorStakedGMX = await deployContract("RewardDistributor", [esGmx.address, stakedGmxTracker.address], undefined, undefined, "RewardDistributorStakedGMX")

  const stakedGmxDistributor = await contractAt("RewardDistributor", RewardDistributorStakedGMX.address)

  await sendTxn(stakedGmxTracker.initialize([gmx.address, esGmx.address], stakedGmxDistributor.address), "stakedGmxTracker.initialize")
  // await sendTxn(stakedGmxDistributor.updateLastDistributionTime(), "stakedGmxDistributor.updateLastDistributionTime")

  const RewardTrackerStakedBonusGMX = await deployContract("RewardTracker", ["Staked + Bonus GSX", "sbGSX"], undefined, undefined, "RewardTrackerStakedBonusGMX")

  const bonusGmxTracker = await contractAt("RewardTracker", RewardTrackerStakedBonusGMX.address)

  const BonusDistributorStakedGMX = await deployContract("BonusDistributor", [bnGmx.address, bonusGmxTracker.address], undefined, undefined, "BonusDistributorStakedGMX")

  const bonusGmxDistributor = await contractAt("BonusDistributor", BonusDistributorStakedGMX.address)

  await sendTxn(bonusGmxTracker.initialize([stakedGmxTracker.address], bonusGmxDistributor.address), "bonusGmxTracker.initialize")
  // await sendTxn(bonusGmxDistributor.updateLastDistributionTime(), "bonusGmxDistributor.updateLastDistributionTime")

  const RewardTrackerStakedBonusFeeGMX = await deployContract("RewardTracker", ["Staked + Bonus + Fee GSX", "sbfGSX"], undefined, undefined, "RewardTrackerStakedBonusFeeGMX")

  const feeGmxTracker = await contractAt("RewardTracker", RewardTrackerStakedBonusFeeGMX.address)

  const RewardDistributorStakedBonusFeeGMX = await deployContract("RewardDistributor", [nativeToken, feeGmxTracker.address], undefined, undefined, "RewardDistributorStakedBonusFeeGMX")

  const feeGmxDistributor = await contractAt("RewardDistributor", RewardDistributorStakedBonusFeeGMX.address)

  await sendTxn(feeGmxTracker.initialize([bonusGmxTracker.address, bnGmx.address], feeGmxDistributor.address), "feeGmxTracker.initialize")
  // await sendTxn(feeGmxDistributor.updateLastDistributionTime(), "feeGmxDistributor.updateLastDistributionTime")

  const RewardTrackerFeeGLP = await deployContract("RewardTracker", ["Fee SLP", "fSLP"], undefined, undefined, "RewardTrackerFeeGLP")

  const feeGlpTracker = await contractAt("RewardTracker", RewardTrackerFeeGLP.address)
  
  const RewardDistributorFeeGLP = await deployContract("RewardDistributor", [nativeToken, feeGlpTracker.address], undefined, undefined, "RewardDistributorFeeGLP")
  const feeGlpDistributor = await contractAt("RewardDistributor", RewardDistributorFeeGLP.address)

  await sendTxn(feeGlpTracker.initialize([glp.address], feeGlpDistributor.address), "feeGlpTracker.initialize")
  // await sendTxn(feeGlpDistributor.updateLastDistributionTime(), "feeGlpDistributor.updateLastDistributionTime")

  const RewardTrackerFeeStakedGLP = await deployContract("RewardTracker", ["Fee + Staked SLP", "fsSLP"], undefined, undefined, "RewardTrackerFeeStakedGLP")

  const stakedGlpTracker = await contractAt("RewardTracker",RewardTrackerFeeStakedGLP.address)

  const RewardDistributorFeeStakedGLP = await deployContract("RewardDistributor", [esGmx.address, stakedGlpTracker.address], undefined, undefined, "RewardDistributorFeeStakedGLP")

  const stakedGlpDistributor = await contractAt("RewardDistributor", RewardDistributorFeeStakedGLP.address)

  await sendTxn(stakedGlpTracker.initialize([feeGlpTracker.address], stakedGlpDistributor.address), "stakedGlpTracker.initialize")
  // await sendTxn(stakedGlpDistributor.updateLastDistributionTime(), "stakedGlpDistributor.updateLastDistributionTime")

  // await sendTxn(stakedGmxTracker.setInPrivateTransferMode(true), "stakedGmxTracker.setInPrivateTransferMode")
  // await sendTxn(stakedGmxTracker.setInPrivateStakingMode(true), "stakedGmxTracker.setInPrivateStakingMode")
  // await sendTxn(bonusGmxTracker.setInPrivateTransferMode(true), "bonusGmxTracker.setInPrivateTransferMode")
  // await sendTxn(bonusGmxTracker.setInPrivateStakingMode(true), "bonusGmxTracker.setInPrivateStakingMode")
  // await sendTxn(bonusGmxTracker.setInPrivateClaimingMode(true), "bonusGmxTracker.setInPrivateClaimingMode")
  // await sendTxn(feeGmxTracker.setInPrivateTransferMode(true), "feeGmxTracker.setInPrivateTransferMode")
  // await sendTxn(feeGmxTracker.setInPrivateStakingMode(true), "feeGmxTracker.setInPrivateStakingMode")

  // await sendTxn(feeGlpTracker.setInPrivateTransferMode(true), "feeGlpTracker.setInPrivateTransferMode")
  // await sendTxn(feeGlpTracker.setInPrivateStakingMode(true), "feeGlpTracker.setInPrivateStakingMode")
  // await sendTxn(stakedGlpTracker.setInPrivateTransferMode(true), "stakedGlpTracker.setInPrivateTransferMode")
  // await sendTxn(stakedGlpTracker.setInPrivateStakingMode(true), "stakedGlpTracker.setInPrivateStakingMode")

  
  const VesterGSXDeployment = await deployContract("Vester", [
    "Vested GSX", "vGSX", // _name, _symbol
    vestingDuration, // _vestingDuration
    esGmx.address, // _esToken
    feeGmxTracker.address, // _pairToken
    gmx.address, // _claimableToken
    stakedGmxTracker.address, // _rewardTracker
  ], undefined, undefined, "VesterGSX")

  const gmxVester = await contractAt("Vester", VesterGSXDeployment.address)

  const VesterGLPDeployment = await deployContract("Vester", [
    "Vested SLP", "vSLP", // _name, _symbol
    vestingDuration, // _vestingDuration
    esGmx.address, // _esToken
    stakedGlpTracker.address, // _pairToken
    gmx.address, // _claimableToken
    stakedGlpTracker.address, // _rewardTracker
  ], undefined, undefined, "VesterGLP")

  const glpVester = await contractAt("Vester", VesterGLPDeployment.address)

  const rewardRouterDeployment = await deployContract("RewardRouterV2", [])

  const rewardRouter = await contractAt("RewardRouterV2", rewardRouterDeployment.address)

  await sendTxn(rewardRouter.initialize(
    nativeToken,
    gmx.address,
    esGmx.address,
    bnGmx.address,
    glp.address,
    stakedGmxTracker.address,
    bonusGmxTracker.address,
    feeGmxTracker.address,
    feeGlpTracker.address,
    stakedGlpTracker.address,
    glpManager.address,
    gmxVester.address,
    glpVester.address
  ), "rewardRouter.initialize")

  // await sendTxn(glpManager.setHandler(rewardRouter.address, true), "glpManager.setHandler(rewardRouter)")

  // // allow rewardRouter to stake in stakedGmxTracker
  // await sendTxn(stakedGmxTracker.setHandler(rewardRouter.address, true), "stakedGmxTracker.setHandler(rewardRouter)")
  // // allow bonusGmxTracker to stake stakedGmxTracker
  // await sendTxn(stakedGmxTracker.setHandler(bonusGmxTracker.address, true), "stakedGmxTracker.setHandler(bonusGmxTracker)")
  // // allow rewardRouter to stake in bonusGmxTracker
  // await sendTxn(bonusGmxTracker.setHandler(rewardRouter.address, true), "bonusGmxTracker.setHandler(rewardRouter)")
  // // allow bonusGmxTracker to stake feeGmxTracker
  // await sendTxn(bonusGmxTracker.setHandler(feeGmxTracker.address, true), "bonusGmxTracker.setHandler(feeGmxTracker)")
  // await sendTxn(bonusGmxDistributor.setBonusMultiplier(10000), "bonusGmxDistributor.setBonusMultiplier")
  // // allow rewardRouter to stake in feeGmxTracker
  // await sendTxn(feeGmxTracker.setHandler(rewardRouter.address, true), "feeGmxTracker.setHandler(rewardRouter)")
  // // allow stakedGmxTracker to stake esGmx
  // await sendTxn(esGmx.setHandler(stakedGmxTracker.address, true), "esGmx.setHandler(stakedGmxTracker)")
  // // allow feeGmxTracker to stake bnGmx
  // await sendTxn(bnGmx.setHandler(feeGmxTracker.address, true), "bnGmx.setHandler(feeGmxTracker")
  // // allow rewardRouter to burn bnGmx
  // await sendTxn(bnGmx.setMinter(rewardRouter.address, true), "bnGmx.setMinter(rewardRouter")

  // // allow stakedGlpTracker to stake feeGlpTracker
  // await sendTxn(feeGlpTracker.setHandler(stakedGlpTracker.address, true), "feeGlpTracker.setHandler(stakedGlpTracker)")
  // // allow feeGlpTracker to stake glp
  // await sendTxn(glp.setHandler(feeGlpTracker.address, true), "glp.setHandler(feeGlpTracker)")

  // // allow rewardRouter to stake in feeGlpTracker
  // await sendTxn(feeGlpTracker.setHandler(rewardRouter.address, true), "feeGlpTracker.setHandler(rewardRouter)")
  // // allow rewardRouter to stake in stakedGlpTracker
  // await sendTxn(stakedGlpTracker.setHandler(rewardRouter.address, true), "stakedGlpTracker.setHandler(rewardRouter)")

  // await sendTxn(esGmx.setHandler(rewardRouter.address, true), "esGmx.setHandler(rewardRouter)")
  // await sendTxn(esGmx.setHandler(stakedGmxDistributor.address, true), "esGmx.setHandler(stakedGmxDistributor)")
  // await sendTxn(esGmx.setHandler(stakedGlpDistributor.address, true), "esGmx.setHandler(stakedGlpDistributor)")
  // await sendTxn(esGmx.setHandler(stakedGlpTracker.address, true), "esGmx.setHandler(stakedGlpTracker)")
  // await sendTxn(esGmx.setHandler(gmxVester.address, true), "esGmx.setHandler(gmxVester)")
  await sendTxn(esGmx.setHandler(glpVester.address, true), "esGmx.setHandler(glpVester)")

  // await sendTxn(esGmx.setMinter(gmxVester.address, true), "esGmx.setMinter(gmxVester)")
  await sendTxn(esGmx.setMinter(glpVester.address, true), "esGmx.setMinter(glpVester)")

  // await sendTxn(gmxVester.setHandler(rewardRouter.address, true), "gmxVester.setHandler(rewardRouter)")
  await sendTxn(glpVester.setHandler(rewardRouter.address, true), "glpVester.setHandler(rewardRouter)")

  // await sendTxn(feeGmxTracker.setHandler(gmxVester.address, true), "feeGmxTracker.setHandler(gmxVester)")
  await sendTxn(stakedGlpTracker.setHandler(glpVester.address, true), "stakedGlpTracker.setHandler(glpVester)")

  // ************************************
  // await sendTxn(esGmx.setMinter(signer.address, true), "esGmx.setMinter(deployer,true)")
  // await sendTxn(esGmx.mint(stakedGmxDistributor.address, '1000000000000000000000'), "esGmx.mint(stakedGmxDistributor,10000)")
}

deployRewardRouterV2()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
