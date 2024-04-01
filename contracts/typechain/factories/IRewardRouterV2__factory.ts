/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IRewardRouterV2,
  IRewardRouterV2Interface,
} from "../IRewardRouterV2";

const _abi = [
  {
    inputs: [],
    name: "feeGlpTracker",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakedGlpTracker",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IRewardRouterV2__factory {
  static readonly abi = _abi;
  static createInterface(): IRewardRouterV2Interface {
    return new utils.Interface(_abi) as IRewardRouterV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRewardRouterV2 {
    return new Contract(address, _abi, signerOrProvider) as IRewardRouterV2;
  }
}