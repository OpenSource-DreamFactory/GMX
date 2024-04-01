const { contractAt, sendTxn, getFrameSigner } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const { toUsd } = require("../../test/shared/units")

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

const { HashZero } = ethers.constants

async function createPosition() {
  const signer = await getFrameSigner()
  const Wallet = signer
  const executionFee = "13000000000000000";
  const positionUtilsAddr = "0x71A96AA4a4896c97AC98a8b3A1C43e08Ee36C593"
  const positionUtils = await contractAt("PositionUtils", positionUtilsAddr)
  const positionRouter = await contractAt("PositionRouter","0x79ab91C24263e4FA85D1451b308Fbb158EB1dDb4", undefined, {
    libraries: {
      PositionUtils: positionUtils.address
    }
  })

  const routerAddr = await contractAt("Router","0x729E3eD537499DB055c2704665171897DAF53fE4")
  const vault = await contractAt("Vault", "0x6119d2EC36Cd00E6C11182aC9518BC3d0a3FB388")
  const weth = "0xebf48Ec21A2aED0311CEf9A6e76A70dC176cF5FF";
  const usdt = "0x61969f38cC00284f798474f5d2f7d2063fB63884";
  const btc = "0xa55dc525780e5c40916dA3B9798EcbdC56e4878c"
    const maxPrice = await vault.getMaxPrice(weth);
    console.log("maxPrice: ", maxPrice.toString());
    const acceptablePrice = maxPrice;
 
  const callbackTarget = "0x0000000000000000000000000000000000000000";
  const referralCode = "0x0000000000000000000000000000000000000000000000000000000000000123";

     // const referralCode = "0x0000000000000000000000000000000000000000000000000000000000000000";
  const increaseLongPositionParams = [
    [weth], // _path
    weth, // _indexToken
    expandDecimals(1, 6), // _amountIn
    0, // _minOut
    toUsd(50), // _sizeDelta
    true, // _isLong
    acceptablePrice, // _acceptablePrice
    executionFee, // _executionFee
    HashZero, //referralCode
    callbackTarget //callbackTarget
  ]

  const decreaseLongPositionParams = [
    [weth], // _path
    weth, // _indexToken
    toUsd(20), // _collateralDelta
    toUsd(50), // _sizeDelta
    true, // _isLong
    signer.address,  // _receiver
    acceptablePrice,  // _acceptablePrice
    0, // _minOut
    executionFee, // _executionFee
    true, // _withdrawETH
    callbackTarget //callbackTarget
  ]

   
    // const collateral = usdt;
    // const indexToken = weth;
   
    const path = [ weth, usdt];
    const tx = await positionRouter.createIncreasePosition(
      ...increaseLongPositionParams,
      { value: executionFee }
    );
    console.log("createIncreasePositiontx: ", tx.hash);
    const index =  parseInt(await positionRouter.increasePositionsIndex(signer.address)) - 1
  console.log("increasePositionsIndex1", index)
  const key1 = await positionRouter.increasePositionRequestKeys(index)
  // const tx1 = await positionRouter.executeIncreasePosition(key1,signer.address) 
  const tx1 = await positionRouter.executeIncreasePositions(index, signer.address)
  console.log("executeIncreasePositiontx: ", tx1.hash);

  const position = await vault.getPosition(
    signer.address, // address _account,
    weth, // address _collateralToken,
    weth, // address _indexToken,
    true // bool _isLong
  )
  console.log("position:", position)

  const tx2 =  await positionRouter.createDecreasePosition(
    ...decreaseLongPositionParams,
    { value: executionFee } 
  );
  console.log("createDecreasePositiontx: ", tx2.hash);
  const index1 =parseInt(await positionRouter.decreasePositionsIndex(signer.address)) - 1;

  const key = await positionRouter.decreasePositionRequestKeys(index1)
  // console.log("increasePositionsIndex1", index1);
  console.log("decreasePositionsIndex1", index1)

  const tx3 = await positionRouter.executeDecreasePosition(key,signer.address)
  // const tx3 = await positionRouter.executeDecreasePositions(index1, signer.address)

  console.log("executeDecreasePositions: ", tx3.hash);


}
 
// }

createPosition()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
