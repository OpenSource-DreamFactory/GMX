

## Install Dependencies
If npx is not installed yet:
`npm install -g npx`

Install packages:
`npm i`

## Compile Contracts
`npx hardhat compile`

## Run Tests
`npx hardhat test`

## deployment 
`npx hardhat run --network bscTestnet scripts/tokens/deployXGMT.js`

set parameters：
`npx hardhat run --network bscTestnet scripts/core/setFee.js`

all smartcontract deploy && verify:
`npx hardhat run --network bscTestnet scripts/deployment/deploy.js`


verify：
`npx hardhat verify --network bscTestnet 0xE53ddF969b36fbc1fe9C5dEd196483Cd34bE759F "SLP" "SLP" --contract contracts/gmx/SLP.sol:SLP`

-------------------------------------------------------------------------------
