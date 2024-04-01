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

interface BatchSenderInterface extends ethers.utils.Interface {
  functions: {
    "gov()": FunctionFragment;
    "isHandler(address)": FunctionFragment;
    "send(address,address[],uint256[])": FunctionFragment;
    "sendAndEmit(address,address[],uint256[],uint256)": FunctionFragment;
    "setGov(address)": FunctionFragment;
    "setHandler(address,bool)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "gov", values?: undefined): string;
  encodeFunctionData(functionFragment: "isHandler", values: [string]): string;
  encodeFunctionData(
    functionFragment: "send",
    values: [string, string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "sendAndEmit",
    values: [string, string[], BigNumberish[], BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setGov", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setHandler",
    values: [string, boolean]
  ): string;

  decodeFunctionResult(functionFragment: "gov", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isHandler", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "send", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendAndEmit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setGov", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setHandler", data: BytesLike): Result;

  events: {
    "BatchSend(uint256,address,address[],uint256[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BatchSend"): EventFragment;
}

export type BatchSendEvent = TypedEvent<
  [BigNumber, string, string[], BigNumber[]] & {
    typeId: BigNumber;
    token: string;
    accounts: string[];
    amounts: BigNumber[];
  }
>;

export class BatchSender extends BaseContract {
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

  interface: BatchSenderInterface;

  functions: {
    gov(overrides?: CallOverrides): Promise<[string]>;

    isHandler(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    send(
      _token: string,
      _accounts: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sendAndEmit(
      _token: string,
      _accounts: string[],
      _amounts: BigNumberish[],
      _typeId: BigNumberish,
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
  };

  gov(overrides?: CallOverrides): Promise<string>;

  isHandler(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  send(
    _token: string,
    _accounts: string[],
    _amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sendAndEmit(
    _token: string,
    _accounts: string[],
    _amounts: BigNumberish[],
    _typeId: BigNumberish,
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

  callStatic: {
    gov(overrides?: CallOverrides): Promise<string>;

    isHandler(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    send(
      _token: string,
      _accounts: string[],
      _amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    sendAndEmit(
      _token: string,
      _accounts: string[],
      _amounts: BigNumberish[],
      _typeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setGov(_gov: string, overrides?: CallOverrides): Promise<void>;

    setHandler(
      _handler: string,
      _isActive: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BatchSend(uint256,address,address[],uint256[])"(
      typeId?: BigNumberish | null,
      token?: string | null,
      accounts?: null,
      amounts?: null
    ): TypedEventFilter<
      [BigNumber, string, string[], BigNumber[]],
      {
        typeId: BigNumber;
        token: string;
        accounts: string[];
        amounts: BigNumber[];
      }
    >;

    BatchSend(
      typeId?: BigNumberish | null,
      token?: string | null,
      accounts?: null,
      amounts?: null
    ): TypedEventFilter<
      [BigNumber, string, string[], BigNumber[]],
      {
        typeId: BigNumber;
        token: string;
        accounts: string[];
        amounts: BigNumber[];
      }
    >;
  };

  estimateGas: {
    gov(overrides?: CallOverrides): Promise<BigNumber>;

    isHandler(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    send(
      _token: string,
      _accounts: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sendAndEmit(
      _token: string,
      _accounts: string[],
      _amounts: BigNumberish[],
      _typeId: BigNumberish,
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
  };

  populateTransaction: {
    gov(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isHandler(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    send(
      _token: string,
      _accounts: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sendAndEmit(
      _token: string,
      _accounts: string[],
      _amounts: BigNumberish[],
      _typeId: BigNumberish,
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
  };
}