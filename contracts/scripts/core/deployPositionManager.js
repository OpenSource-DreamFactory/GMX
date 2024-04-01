const { deployContract, contractAt, sendTxn, verifyContract } = require("../shared/helpers");
const { getDeployFilteredInfo } = require("../shared/syncParams");

const depositFee = 30; // 0.3%

async function deployPositionManager() {
  const vaultAddr  = "0x6119d2EC36Cd00E6C11182aC9518BC3d0a3FB388"
  const timelockAddr =  "0xc11BD084a65bf7426d011cbF8735dA4655A56e6C"
  const routerAddr = "0x01A334521a620E4D3e9d69b55A8dcDAdACE26600"
  const shortsTrackerAddr = "0x382aba02A3D58EB9EB71DD3242d080eC2e416453"
  const wethAddr = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF"
  const orderBookAddr  = "0xE2647903998de2b00250C1C07fac9988c83af07f"
  const referralStorageAddr = "0xA445b0D22944cD1A969337cb65CC96D00751B8A1"
  const positionUtilsAddr = "0xA445b0D22944cD1A969337cb65CC96D00751B8A1"

  const orderKeepers = [
    "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
  ];

  const liquidators = [
    "0xD2F3c942Bc1AaEaD58C38801B46535fc7Bd3aA0c"
  ];

  const partnerContracts = [];

  const positionManagerArgs = [
    vaultAddr,
    routerAddr,
    shortsTrackerAddr,
    wethAddr,
    depositFee,
    orderBookAddr,
  ]

  const positionManagerAddress = await deployContract(
    "PositionManager",
    positionManagerArgs,
    "PositionManager",
    {
      libraries: {
        PositionUtils: positionUtilsAddr,
      },
    }
  )

  // await verifyContract("PositionManager",positionManagerAddress.address,"contracts/core/PositionManager.sol:PositionManager",positionManagerArgs) 

  const positionManager = await contractAt("PositionManager", positionManagerAddress.address, undefined, {
    libraries: {
      PositionUtils: positionUtilsAddr,
    },
  })

  if (
    (await positionManager.referralStorage()).toLowerCase() !=
    referralStorageAddr.toLowerCase()
  ) {
    await sendTxn(
      positionManager.setReferralStorage(referralStorageAddr),
      "positionManager.setReferralStorage"
    );
  }

  if (await positionManager.shouldValidateIncreaseOrder()) {
    await sendTxn(
      positionManager.setShouldValidateIncreaseOrder(false),
      "positionManager.setShouldValidateIncreaseOrder(false)"
    );
  }

  // for (let i = 0; i < orderKeepers.length; i++) {
  //   const orderKeeper = orderKeepers[i];
  //   if (!(await positionManager.isOrderKeeper(orderKeeper))) {
  //     await sendTxn(
  //       positionManager.setOrderKeeper(orderKeeper, true),
  //       "positionManager.setOrderKeeper(orderKeeper)"
  //     );
  //   }
  // }

  // for (let i = 0; i < liquidators.length; i++) {
  //   const liquidator = liquidators[i];
  //   if (!(await positionManager.isLiquidator(liquidator))) {
  //     await sendTxn(
  //       positionManager.setLiquidator(liquidator, true),
  //       "positionManager.setLiquidator(liquidator)"
  //     );
  //   }
  // }

  const timelock = await contractAt("Timelock", timelockAddr)

  // if (!(await timelock.isHandler(positionManager.address))) {
  //   await sendTxn(
  //     timelock.setContractHandler(positionManager.address, true),
  //     "timelock.setContractHandler(positionManager)"
  //   );
  // }

  // const vault = await contractAt("Vault", vaultAddr);

  // if (!(await vault.isLiquidator(positionManager.address))) {
  //   await sendTxn(
  //     timelock.setLiquidator(vault.address, positionManager.address, true),
  //     "timelock.setLiquidator(vault, positionManager, true)"
  //   );
  // }
  
  // const shortsTracker = await contractAt("ShortsTracker", shortsTrackerAddr)

  // if (!(await shortsTracker.isHandler(positionManager.address))) {
  //   await sendTxn(
  //     shortsTracker.setHandler(positionManager.address, true),
  //     "shortsTracker.setContractHandler(positionManager.address, true)"
  //   );
  // }

  // const router = await contractAt("Router", routerAddr)

  // if (!(await router.plugins(positionManager.address))) {
  //   await sendTxn(
  //     router.addPlugin(positionManager.address),
  //     "router.addPlugin(positionManager)"
  //   );
  // }

  // for (let i = 0; i < partnerContracts.length; i++) {
  //   const partnerContract = partnerContracts[i];
  //   if (!(await positionManager.isPartner(partnerContract))) {
  //     await sendTxn(
  //       positionManager.setPartner(partnerContract, true),
  //       "positionManager.setPartner(partnerContract)"
  //     );
  //   }
  // }

  // if ((await positionManager.gov()) != (await vault.gov())) {
  //   await sendTxn(
  //     positionManager.setGov(await vault.gov()),
  //     "positionManager.setGov"
  //   );
  // }

  console.log("done.");
}

deployPositionManager()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
