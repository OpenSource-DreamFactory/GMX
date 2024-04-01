const { deployContract, contractAt , sendTxn, getFrameSigner, verifyContract } = require("../shared/helpers")
const { getDeployFilteredInfo, getNetwork } = require("../shared/syncParams");
const { testnet } = require("./tokens");
const tokenList = require('./tokens')[testnet]

async function deployPositionRouter() {
  const signer = await getFrameSigner()
  const capKeeperWallet = signer
  const vaultAddr =  "0x6119d2EC36Cd00E6C11182aC9518BC3d0a3FB388"
  const timelockAddr =  "0xc11BD084a65bf7426d011cbF8735dA4655A56e6C"
  const routerAddr = "0x729E3eD537499DB055c2704665171897DAF53fE4"
  const weth = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF"
  const shortsTrackerAddr = "0x8661800d73B4680B000c3aC6e894FB49584a52bA"
  const shortsTrackerTimelockAddr = "0xf4C62d82174225f75F9fAA61806500639fDACF29"
  const depositFee = "30" // 0.3%
  const minExecutionFee = "10000000000000000" // 0.01 ETH
  const referralStorageAddr = "0xA445b0D22944cD1A969337cb65CC96D00751B8A1"
  // const  = "0xA445b0D22944cD1A969337cb65CC96D00751B8A1"

  // const referralStorageDeployment = await deployContract("ReferralStorage", [])

  const positionUtilsDeployment = await deployContract("PositionUtils", [])
  await verifyContract("PositionUtils",positionUtilsDeployment.address,"contracts/core/PositionUtils.sol:PositionUtils",[]) 
  const vault = await contractAt("Vault", vaultAddr)
  const positionUtils = await contractAt("PositionUtils", positionUtilsDeployment.address)

  const referralStorage = await contractAt("ReferralStorage", referralStorageAddr)

  const referralStorageGov = await contractAt("Timelock", referralStorage.gov())

  const positionRouterArgs = [vault.address, routerAddr, weth, shortsTrackerAddr, depositFee, minExecutionFee]
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


  await sendTxn(positionRouter.setReferralStorage(referralStorage.address), "positionRouter.setReferralStorage")
  await sendTxn(referralStorageGov.signalSetHandler(referralStorage.address, positionRouter.address, true), "referralStorage.signalSetHandler(positionRouter)")

  const shortsTrackerTimelock = await contractAt("ShortsTrackerTimelock", shortsTrackerTimelockAddr)
  await sendTxn(shortsTrackerTimelock.signalSetHandler(referralStorage.address, positionRouter.address, true), "shortsTrackerTimelock.signalSetHandler(positionRouter)")

  const router = await contractAt("Router", routerAddr)
  await sendTxn(router.addPlugin(positionRouter.address), "router.addPlugin")

  await sendTxn(positionRouter.setDelayValues(0, 180, 30 * 60), "positionRouter.setDelayValues")
  const timelock = await contractAt("Timelock", timelockAddr)
  await sendTxn(timelock.setContractHandler(positionRouter.address, true), "timelock.setContractHandler(positionRouter)")

  await sendTxn(
    vault.setGov(timelock.address),
    "vault.setGov(timelock)"
  );

  await sendTxn(positionRouter.setAdmin(capKeeperWallet.address), "positionRouter.setAdmin")
  await sendTxn(positionRouter.setGov(await vault.gov()), "positionRouter.setGov") 

  // const network = getNetwork()
  // const tokens = tokenList;

  // let tokenArr = []
  // for (const coin in tokens) {
  //   tokenArr = [...tokenArr, tokens[coin]]
  // }

  // for (const token of tokenList) {
  //   if (token === undefined) continue
    
    // await sendTxn(
    //   vault.setTokenConfig(
    //     token.address, // _token
    //     token.decimals,
    //     token.tokenWeight ?? 10000,
    //     token.minProfitBps ?? 0,
    //     token.maxUsdgAmount ?? 50 * 1000 * 1000,
    //     token.stable === true? true: false,
    //     token.stable === true? false: true
    //   ),
    //   `vault.setTokenConfig(${token.name}) ${token.address} ${token.priceFeed}`
    // );
  



  const shortsTracker = await contractAt("ShortsTracker", shortsTrackerAddr)

  if (!(await shortsTracker.isHandler(positionRouter.address))) {
    await sendTxn(
      shortsTracker.setHandler(positionRouter.address, true),
      "shortsTracker.setContractHandler(positionRouter.address, true)"
    );
  }
}

deployPositionRouter()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })