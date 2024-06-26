/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface EsGSXInterface extends ethers.utils.Interface {
  functions: {
    "addAdmin(address)": FunctionFragment;
    "addNonStakingAccount(address)": FunctionFragment;
    "admins(address)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "allowances(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "balances(address)": FunctionFragment;
    "burn(address,uint256)": FunctionFragment;
    "claim(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "gov()": FunctionFragment;
    "id()": FunctionFragment;
    "inPrivateTransferMode()": FunctionFragment;
    "isBlacklisted(address)": FunctionFragment;
    "isHandler(address)": FunctionFragment;
    "isMinter(address)": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "nonStakingAccounts(address)": FunctionFragment;
    "nonStakingSupply()": FunctionFragment;
    "recoverClaim(address,address)": FunctionFragment;
    "removeAdmin(address)": FunctionFragment;
    "removeNonStakingAccount(address)": FunctionFragment;
    "setBlacklisted(address,bool)": FunctionFragment;
    "setGov(address)": FunctionFragment;
    "setHandler(address,bool)": FunctionFragment;
    "setInPrivateTransferMode(bool)": FunctionFragment;
    "setInfo(string,string)": FunctionFragment;
    "setMinter(address,bool)": FunctionFragment;
    "setYieldTrackers(address[])": FunctionFragment;
    "stakedBalance(address)": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalStaked()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "withdrawToken(address,address,uint256)": FunctionFragment;
    "yieldTrackers(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "addNonStakingAccount",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "admins", values: [string]): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "allowances",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "balances", values: [string]): string;
  encodeFunctionData(
    functionFragment: "burn",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "claim", values: [string]): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "gov", values?: undefined): string;
  encodeFunctionData(functionFragment: "id", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "inPrivateTransferMode",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isBlacklisted",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "isHandler", values: [string]): string;
  encodeFunctionData(functionFragment: "isMinter", values: [string]): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nonStakingAccounts",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "nonStakingSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "recoverClaim",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "removeAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "removeNonStakingAccount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setBlacklisted",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setGov", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setHandler",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setInPrivateTransferMode",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setInfo",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setMinter",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setYieldTrackers",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "stakedBalance",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalStaked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "yieldTrackers",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addNonStakingAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "admins", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowances", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balances", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gov", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "id", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "inPrivateTransferMode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isBlacklisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isHandler", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isMinter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nonStakingAccounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nonStakingSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverClaim",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeNonStakingAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBlacklisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setGov", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setHandler", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setInPrivateTransferMode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setMinter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setYieldTrackers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakedBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalStaked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "yieldTrackers",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; value: BigNumber }
>;

export class EsGSX extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: EsGSXInterface;

  functions: {
    addAdmin(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addNonStakingAccount(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    admins(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    allowances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      _spender: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    balances(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    burn(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claim(
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    gov(overrides?: CallOverrides): Promise<[string]>;

    id(overrides?: CallOverrides): Promise<[string] & { _name: string }>;

    inPrivateTransferMode(overrides?: CallOverrides): Promise<[boolean]>;

    isBlacklisted(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    isHandler(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    isMinter(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    mint(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nonStakingAccounts(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    nonStakingSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    recoverClaim(
      _account: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeAdmin(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeNonStakingAccount(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBlacklisted(
      _user: string,
      _isBlacklisted: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGov(
      _gov: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setHandler(
      _handler: string,
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setInPrivateTransferMode(
      _inPrivateTransferMode: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setInfo(
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMinter(
      _minter: string,
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setYieldTrackers(
      _yieldTrackers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakedBalance(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalStaked(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      _sender: string,
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawToken(
      _token: string,
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    yieldTrackers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  addAdmin(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addNonStakingAccount(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  admins(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  allowance(
    _owner: string,
    _spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  allowances(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    _spender: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

  balances(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  burn(
    _account: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claim(
    _receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  decimals(overrides?: CallOverrides): Promise<number>;

  gov(overrides?: CallOverrides): Promise<string>;

  id(overrides?: CallOverrides): Promise<string>;

  inPrivateTransferMode(overrides?: CallOverrides): Promise<boolean>;

  isBlacklisted(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  isHandler(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  isMinter(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  mint(
    _account: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  nonStakingAccounts(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  nonStakingSupply(overrides?: CallOverrides): Promise<BigNumber>;

  recoverClaim(
    _account: string,
    _receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeAdmin(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeNonStakingAccount(
    _account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBlacklisted(
    _user: string,
    _isBlacklisted: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGov(
    _gov: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setHandler(
    _handler: string,
    _isActive: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setInPrivateTransferMode(
    _inPrivateTransferMode: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setInfo(
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMinter(
    _minter: string,
    _isActive: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setYieldTrackers(
    _yieldTrackers: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakedBalance(
    _account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    _recipient: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    _sender: string,
    _recipient: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawToken(
    _token: string,
    _account: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  yieldTrackers(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addAdmin(_account: string, overrides?: CallOverrides): Promise<void>;

    addNonStakingAccount(
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    admins(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allowances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      _spender: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    balances(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      _account: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    claim(_receiver: string, overrides?: CallOverrides): Promise<void>;

    decimals(overrides?: CallOverrides): Promise<number>;

    gov(overrides?: CallOverrides): Promise<string>;

    id(overrides?: CallOverrides): Promise<string>;

    inPrivateTransferMode(overrides?: CallOverrides): Promise<boolean>;

    isBlacklisted(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    isHandler(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    isMinter(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    mint(
      _account: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    nonStakingAccounts(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    nonStakingSupply(overrides?: CallOverrides): Promise<BigNumber>;

    recoverClaim(
      _account: string,
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeAdmin(_account: string, overrides?: CallOverrides): Promise<void>;

    removeNonStakingAccount(
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setBlacklisted(
      _user: string,
      _isBlacklisted: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setGov(_gov: string, overrides?: CallOverrides): Promise<void>;

    setHandler(
      _handler: string,
      _isActive: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setInPrivateTransferMode(
      _inPrivateTransferMode: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setInfo(
      _name: string,
      _symbol: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setMinter(
      _minter: string,
      _isActive: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setYieldTrackers(
      _yieldTrackers: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    stakedBalance(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      _recipient: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      _sender: string,
      _recipient: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdrawToken(
      _token: string,
      _account: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    yieldTrackers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;
  };

  estimateGas: {
    addAdmin(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addNonStakingAccount(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    admins(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allowances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      _spender: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    balances(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claim(
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    gov(overrides?: CallOverrides): Promise<BigNumber>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    inPrivateTransferMode(overrides?: CallOverrides): Promise<BigNumber>;

    isBlacklisted(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    isHandler(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    isMinter(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nonStakingAccounts(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nonStakingSupply(overrides?: CallOverrides): Promise<BigNumber>;

    recoverClaim(
      _account: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeAdmin(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeNonStakingAccount(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBlacklisted(
      _user: string,
      _isBlacklisted: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGov(
      _gov: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setHandler(
      _handler: string,
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setInPrivateTransferMode(
      _inPrivateTransferMode: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setInfo(
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMinter(
      _minter: string,
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setYieldTrackers(
      _yieldTrackers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakedBalance(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      _sender: string,
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawToken(
      _token: string,
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    yieldTrackers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addAdmin(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addNonStakingAccount(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    admins(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allowances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      _spender: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claim(
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gov(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    id(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    inPrivateTransferMode(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isBlacklisted(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isHandler(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMinter(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mint(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonStakingAccounts(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nonStakingSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    recoverClaim(
      _account: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeAdmin(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeNonStakingAccount(
      _account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBlacklisted(
      _user: string,
      _isBlacklisted: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGov(
      _gov: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setHandler(
      _handler: string,
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setInPrivateTransferMode(
      _inPrivateTransferMode: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setInfo(
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMinter(
      _minter: string,
      _isActive: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setYieldTrackers(
      _yieldTrackers: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakedBalance(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalStaked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      _sender: string,
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      _token: string,
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    yieldTrackers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
