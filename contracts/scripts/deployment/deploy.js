/*
  一键部署合约脚本，将所有需要部署的合约整合进来，配置文件参数以及验证合约
  命令：
  npx hardhat run --network bscTestnet scripts/deployment/deploy.js
*/
const { deployContract,contractAt,verifyContract, sendTxn} =  require("../shared/helpers")
const {
  initVault,
  getBtcConfig,
  getEthConfig,
  getBnbConfig,
  getBusdConfig,
} = require("./vaultUtil")
const {
  mockTokenAndPriceFeed,
  mockInitLP,
  mockExecutePosition,
  mockExecutePositionsBot,
} = require("./mockEnv")
const { utils, constants } = require("ethers")
const { expect } = require("chai")

async function main() {
  const [signer, positionKeeper, fastPriceFeedUpdater] =
    await ethers.getSigners()

  // alias function
  const parseUnits = utils.parseUnits
  const parseEther = utils.parseEther
  const formatEther = utils.formatEther

  // constants
  const maxUint256 = constants.MaxUint256

  // constants
  const depositFee = 50
  const minExecutionFee = 4000
  const priceDecimals = 8 // oracle price decimal
  const tokenManager = signer

  // const {
    const bnb = "0x7Bf397A986412Cf7e023E350351F0CcA6ab21B22"
    const bnbPriceFeed = "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526"
    const btc = "0x66bd5666De6861e4DAB4835e62317D94213b3fD1" 
    const btcPriceFeed = "0x5741306c21795FdCBb9b265Ea0255F499DFe515C"
    const eth = "0x9d8765F963C8174568B6A95f442838445C00f96b"
    const ethPriceFeed = "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7"
    const busd = "0x397162b56FffF6D86fCFB5331fc8C7fd1090DCa6"
    const busdPriceFeed = "0xEca2605f0BCF2BA5966372C99837b1F182d3D620"
  // } = await mockTokenAndPriceFeed()
  
  const vault = await deployContract("Vault", [])
  const vaultReader = await deployContract("VaultReader", [])
  // await verifyContract("VaultReader",vaultReader.address,"contracts/peripherals/VaultReader.sol:VaultReader",[]) 
  const glp = await deployContract("GLP",["SLP","SLP"])

  const usdg = await deployContract("USDG", [vault.address])

  const router = await deployContract("Router", [
    vault.address,
    usdg.address,
    bnb,
  ])

  const shortsTrackerAddr = await deployContract("ShortsTracker", [vault.address], "ShortsTracker")

  // await verifyContract("ShortsTracker",shortsTrackerAddr.address,"contracts/core/ShortsTracker.sol:ShortsTracker",[vault.address])  
  await sendTxn(shortsTrackerAddr.setGov(signer.address), "shortsTracker.setGov")

  const positionUtilsDeployment = await deployContract("PositionUtils", [])
  const positionUtils = await contractAt("PositionUtils", positionUtilsDeployment.address)
  await verifyContract("PositionUtils",positionUtilsDeployment.address,"contracts/core/PositionUtils.sol:PositionUtils",[]) 

  const positionRouterArgs = [vault.address, router.address, bnb, shortsTrackerAddr.address, depositFee, minExecutionFee]
  const positionRouterDeployment =  await deployContract("PositionRouter", positionRouterArgs, "PositionRouter", {
    libraries: {
      PositionUtils: positionUtils.address
    }
})
const positionRouter = await contractAt("PositionRouter",positionRouterDeployment.address, undefined, {
  libraries: {
    PositionUtils: positionUtils.address
  }
})

await verifyContract("PositionRouter",positionRouterDeployment.address,"contracts/core/PositionRouter.sol:PositionRouter",positionRouterArgs)

  const referralStorage = await deployContract("ReferralStorage", [])
  const vaultPriceFeed = await deployContract("VaultPriceFeed", [])

  await sendTxn(positionRouter.setReferralStorage(referralStorage.address),"setReferralStorage")
 
  
  await sendTxn(referralStorage.setHandler(positionRouter.address, true),"setHandler")
  const glpManager = await deployContract("GlpManager", [
    vault.address,
    usdg.address,
    glp.address,
    shortsTrackerAddr.address,
    1,
  ])

  const rewardRouter = await deployContract("RewardRouter", [])

  const timelock = await deployContract("Timelock", [
    signer.address, // admin
    5 * 24 * 60 * 60, // buffer
    tokenManager.address, // tokenManager
    signer.address, // mintReceiver
    glpManager.address, // glpManager
    rewardRouter.address,
    parseUnits("1000"), // maxTokenSupply
    10, // marginFeeBasisPoints 0.1%
    500, // maxMarginFeeBasisPoints 5%
  ])

  await initVault(vault, router, usdg, vaultPriceFeed)

  await glp.setMinter(glpManager.address, true)

  const distributor0 = await deployContract("TimeDistributor", [])
  const yieldTracker0 = await deployContract("YieldTracker", [usdg.address])

  await sendTxn(yieldTracker0.setDistributor(distributor0.address),"setDistributor")
  await  sendTxn(distributor0.setDistribution(
    [yieldTracker0.address],
    [1000],
    [bnb]
  ),"setDistribution")

  // await bnb.mint(distributor0.address, 5000)
  await sendTxn(usdg.setYieldTrackers([yieldTracker0.address]), "setYieldTrackers")

  const reader = await deployContract("Reader",[])
  // await verifyContract("Reader",reader.address,"contracts/peripherals/Reader.sol:Reader",[]) 

  await sendTxn(
    vaultPriceFeed.setTokenConfig(
      bnb, // token
      bnbPriceFeed, // priceFeed
      priceDecimals, // priceDecimals
      false // isStrictStable
    ), "setbnbTokenConfig"
  )
  
  await sendTxn(
   vaultPriceFeed.setTokenConfig(
      btc,
      btcPriceFeed,
      priceDecimals,
      false
    ), "setbtcTokenConfig"
  )
 
  await sendTxn(
    vaultPriceFeed.setTokenConfig(
      eth,
      ethPriceFeed,
      priceDecimals,
      false
    ), "setethTokenConfig"
  )
  
  await sendTxn(
    vaultPriceFeed.setTokenConfig(
      busd,
      busdPriceFeed,
      priceDecimals,
      true
    ), "setbusdTokenConfig"
  )

  // mock price
  // await btcPriceFeed.setLatestAnswer(parseUnits("20000", priceDecimals))
  // await vault.setTokenConfig(...getBtcConfig(btc))

  // await bnbPriceFeed.setLatestAnswer(parseUnits("300", priceDecimals))
  // await vault.setTokenConfig(...getBnbConfig(bnb))

  // await ethPriceFeed.setLatestAnswer(parseUnits("2000", priceDecimals))
  // await vault.setTokenConfig(...getEthConfig(eth))

  // await busdPriceFeed.setLatestAnswer(parseUnits("1", priceDecimals))
  // await vault.setTokenConfig(...getBusdConfig(busd))

  await vault.setIsLeverageEnabled(false)
  await vault.setGov(timelock.address)

  const fastPriceEvents = await deployContract("FastPriceEvents", [])
  const fastPriceFeed = await deployContract("FastPriceFeed", [
    5 * 60, // _priceDuration
    120 * 60, // _maxPriceUpdateDelay
    2, // _minBlockInterval
    250, // _maxDeviationBasisPoints
    fastPriceEvents.address, // _fastPriceEvents
    tokenManager.address // _tokenManager
  ])
  await fastPriceFeed.initialize(
    2, // minAuthorizations
    [signer.address], //signers
    [signer.address] //updaters
  )

  await sendTxn(fastPriceEvents.setIsPriceFeed(fastPriceFeed.address, true),"setIsPriceFeed")
  await sendTxn(fastPriceFeed.setVaultPriceFeed(vaultPriceFeed.address),"setVaultPriceFeed")
  await sendTxn(vaultPriceFeed.setSecondaryPriceFeed(fastPriceFeed.address),"setPriceFeed")
  // ----------------------------gmx and glp------------------------------------
  const gmx = await deployContract("GSX",["GSX","GSX"],"GSX")
  const esGmx = await deployContract("EsGSX", ["EsGSX","EsGSX"],"EsGSX")
  const bnGmx = await deployContract(
    "MintableBaseToken",
    ["Bonus GMX", "bnGMX", 0],
    "BN_GMX"
  )

  const stakedGmxTracker = await deployContract(
    "RewardTracker",
    ["Staked GMX", "sGMX"],
    "StakedGmxTracker"
  )

  const stakedGmxDistributor = await deployContract(
    "RewardDistributor",
    [esGmx.address, stakedGmxTracker.address],
    "StakedGmxDistributor"
  )

  await sendTxn(stakedGmxTracker.initialize(
    [gmx.address, esGmx.address],
    stakedGmxDistributor.address
  ),"stakedGmxTracker.initialize")
  await sendTxn(stakedGmxDistributor.updateLastDistributionTime(),"updateLastDistributionTime")

  const bonusGmxTracker = await deployContract(
    "RewardTracker",
    ["Staked + Bonus GMX", "sbGMX"],
    "BonusGmxTracker"
  )
  bonusGmxDistributor = await deployContract(
    "BonusDistributor",
    [bnGmx.address, bonusGmxTracker.address],
    "BonusGmxDistributor"
  )
  await bonusGmxTracker.initialize(
    [stakedGmxTracker.address],
    bonusGmxDistributor.address
  )
  await sendTxn(bonusGmxDistributor.updateLastDistributionTime(),"updateLastDistributionTime")

  const feeGmxTracker = await deployContract(
    "RewardTracker",
    ["Staked + Bonus + Fee GMX", "sbfGMX"],
    "FeeGmxTracker"
  )
  let feeGmxDistributor = await deployContract(
    "RewardDistributor",
    [eth, feeGmxTracker.address],
    "FeeGmxDistributor"
  )
  await sendTxn(feeGmxTracker.initialize(
    [bonusGmxTracker.address, bnGmx.address],
    feeGmxDistributor.address
  ),"initialize")

  await sendTxn(feeGmxDistributor.updateLastDistributionTime(),"updateLastDistributionTime")

  const feeGlpTracker = await deployContract(
    "RewardTracker",
    ["Fee GLP", "fGLP"],
    "FeeGlpTracker"
  )
  // await glp.connect(signer.address).approve(feeGlpTracker.address, maxUint256)

  const feeGlpDistributor = await deployContract(
    "RewardDistributor",
    [eth, feeGlpTracker.address],
    "FeeGlpDistributor"
  )
  await sendTxn(feeGlpTracker.initialize([glp.address], feeGlpDistributor.address),"initialize")

  await feeGlpDistributor.updateLastDistributionTime()

  const stakedGlpTracker = await deployContract(
    "RewardTracker",
    ["Fee + Staked GLP", "fsGLP"],
    "StakedGlpTracker"
  )
  await sendTxn(feeGlpTracker.setHandler(stakedGlpTracker.address, true),"setHandler")

  // await feeGlpTracker
  //   .connect(signer.address)
  //   .approve(stakedGlpTracker.address, maxUint256)

  // await feeGlpTracker
  //   .connect(signer.address)
  //   .approve(stakedGlpTracker.address, maxUint256)

  const stakedGlpDistributor = await deployContract(
    "RewardDistributor",
    [esGmx.address, stakedGlpTracker.address],
    "StakedGlpDistributor"
  )
  await sendTxn(stakedGlpTracker.initialize(
    [feeGlpTracker.address],
    stakedGlpDistributor.address
  ))

  await sendTxn(stakedGlpDistributor.updateLastDistributionTime())

  await sendTxn(stakedGmxTracker.setInPrivateTransferMode(true))
  await sendTxn(stakedGmxTracker.setInPrivateStakingMode(true))
  await sendTxn(bonusGmxTracker.setInPrivateTransferMode(true))
  await sendTxn(bonusGmxTracker.setInPrivateStakingMode(true))
  await sendTxn(bonusGmxTracker.setInPrivateClaimingMode(true))
  await sendTxn(feeGmxTracker.setInPrivateTransferMode(true))
  await sendTxn(feeGmxTracker.setInPrivateStakingMode(true))

  await sendTxn(feeGlpTracker.setInPrivateTransferMode(true))
  await sendTxn(feeGlpTracker.setInPrivateStakingMode(true))
  await sendTxn(stakedGlpTracker.setInPrivateTransferMode(true))
  await sendTxn(stakedGlpTracker.setInPrivateStakingMode(true))

  const vestingDuration = 365 * 24 * 60 * 60

  const gmxVester = await deployContract(
    "Vester",
    [
      "Vested GMX", // _name
      "vGMX", // _symbol
      vestingDuration, // _vestingDuration
      esGmx.address, // _esToken
      feeGmxTracker.address, // _pairToken
      gmx.address, // _claimableToken
      stakedGmxTracker.address, // _rewardTracker
    ],
    "GmxVester"
  )

  const glpVester = await deployContract(
    "Vester",
    [
      "Vested SLP", // _name
      "vsLP", // _symbol
      vestingDuration, // _vestingDuration
      esGmx.address, // _esToken
      stakedGlpTracker.address, // _pairToken
      gmx.address, // _claimableToken
      stakedGlpTracker.address, // _rewardTracker
    ],
    "GlpVester"
  )

 
  await sendTxn(rewardRouter.initialize(
    bnb,
    gmx.address,
    esGmx.address,
    bnGmx.address,
    glp.address,
    stakedGmxTracker.address,
    bonusGmxTracker.address,
    feeGmxTracker.address,
    feeGlpTracker.address,
    stakedGlpTracker.address,
    glpManager.address
  ))

  await sendTxn(feeGlpTracker.setHandler(rewardRouter.address, true))
  await sendTxn(stakedGlpTracker.setHandler(rewardRouter.address, true))

  await sendTxn(glpManager.setHandler(rewardRouter.address, true))

  {
    // check some status
    // expect(await positionRouter.vault()).eq(vault.address)
    // expect(await positionRouter.router()).eq(router.address)
    // expect(await positionRouter.weth()).eq(bnb.address)
    // expect(await positionRouter.depositFee()).eq(depositFee)
    // expect(await positionRouter.minExecutionFee()).eq(minExecutionFee)
    // expect(await positionRouter.admin()).eq(signer.address)
    // expect(await positionRouter.gov()).eq(signer.address)
    // error mock
    // expect(await positionRouter.gov()).eq(signer1.address);
  }

  // mock create position in s 300s 500s
  await sendTxn(positionRouter.setDelayValues(0, 180, 30 * 60), "positionRouter.setDelayValues")
  // await bnb.mint(vault.address, parseUnits("30"));
  // await vault.buyUSDG(bnb.address, user1.address);

  await sendTxn(timelock.setContractHandler(positionRouter.address, true), "timelock.setContractHandler(positionRouter)")
  await sendTxn(timelock.setShouldToggleIsLeverageEnabled(true), "deployedTimelock.setShouldToggleIsLeverageEnabled(true)")
  const esGmxBatchSender = await deployContract("EsGmxBatchSender", [
    esGmx.address,
  ])
  const stakedGlp = await deployContract("StakedGlp", [
    glp.address,
    glpManager.address,
    stakedGlpTracker.address,
    feeGlpTracker.address,
  ])
  const glpBalance = await deployContract("GlpBalance", [
    glpManager.address,
    stakedGlpTracker.address,
  ])

  await sendTxn(timelock.setHandler(esGmx.address, esGmxBatchSender.address, true));
  await sendTxn(timelock.setHandler(gmxVester.address, esGmxBatchSender.address, true));
  await sendTxn(timelock.setHandler(glpVester.address, esGmxBatchSender.address, true));
  await sendTxn(timelock.setHandler(stakedGlpTracker.address, stakedGlp.address, true));
  await sendTxn(timelock.setHandler(feeGlpTracker.address, stakedGlp.address, true));
  await sendTxn(timelock.setHandler(stakedGlpTracker.address, glpBalance.address, true));

  await sendTxn(router.addPlugin(positionRouter.address))

  const rewardReader = await deployContract("RewardReader",[])
  await verifyContract("RewardReader",rewardReader.address,"contracts/peripherals/RewardReader.sol:RewardReader",[]) 

  // order book
  const orderBook = await deployContract("OrderBook",[])
  
  // start order book
  await sendTxn(orderBook.initialize(
    router.address,
    vault.address,
    bnb,
    usdg.address,
    minExecutionFee,
    // expandDecimals(5, 30) // minPurchaseTokenAmountUsd
    parseUnits("5", 30)
  ))

  positionManager = await deployContract("PositionManager", [
    vault.address,
    router.address,
    bnb,
    50, // deposit fee
    orderBook.address,
  ])

  await sendTxn(positionManager.setLiquidator(signer.address, true))
  await sendTxn(timelock.setContractHandler(positionManager.address, true))

  await sendTxn(router.addPlugin(orderBook.address))

  const orderBookReader = await deployContract("OrderBookReader",[])

  // await verifyContract("OrderBookReader",orderBookReader.address,"contracts/peripherals/OrderBookReader.sol:OrderBookReader",[]) 
  const referralReader = await deployContract("ReferralReader",[])
  // await verifyContract("ReferralReader",referralReader.address,"contracts/peripherals/ReferralReader.sol:ReferralReader",[]) 

  await mockInitLP(rewardRouter, glpManager, btc, eth, busd)
  console.log("deploy phase 1 done...")

  await mockExecutePosition(
    busd,
    bnb,
    bnbPriceFeed,
    eth,
    btc,
    positionRouter,
    router,
    vault
  )

  const mockOracleParams = [
    {
      priceFeed: btcPriceFeed,
      baseLine: 20000,
      priceDecimals: priceDecimals,
    },
    {
      priceFeed: bnbPriceFeed,
      baseLine: 300,
      priceDecimals: priceDecimals,
    },
    {
      priceFeed: ethPriceFeed,
      baseLine: 2000,
      priceDecimals: priceDecimals,
    },
    {
      priceFeed: busdPriceFeed,
      baseLine: 1,
      priceDecimals: priceDecimals,
      stable: true,
    },
  ]
  await mockExecutePositionsBot(positionRouter, mockOracleParams)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })