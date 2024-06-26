/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Multicall3, Multicall3Interface } from "../Multicall3";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes[]",
        name: "returnData",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bool",
            name: "allowFailure",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call3[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bool",
            name: "allowFailure",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call3Value[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate3Value",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "blockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBasefee",
    outputs: [
      {
        internalType: "uint256",
        name: "basefee",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [
      {
        internalType: "address",
        name: "coinbase",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [
      {
        internalType: "uint256",
        name: "difficulty",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "gaslimit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getEthBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c98806100206000396000f3fe6080604052600436106100c35760003560e01c80630f28c97d146100c8578063174dea71146100f3578063252dba421461011357806327e86d6e146101345780633408e47014610149578063399542e91461015e5780633e64a6961461018057806342cbb15c146101955780634d2301cc146101aa57806372425d9d146101ca57806382ad56cb146101df57806386d516e8146101f2578063a8b0574e14610207578063bce38bd714610229578063c3077fa91461023c578063ee82ac5e1461024f575b600080fd5b3480156100d457600080fd5b506100dd61026f565b6040516100ea9190610ad7565b60405180910390f35b610106610101366004610918565b610273565b6040516100ea9190610ac4565b610126610121366004610957565b610420565b6040516100ea929190610b45565b34801561014057600080fd5b506100dd61055c565b34801561015557600080fd5b506100dd610565565b61017161016c36600461097e565b610569565b6040516100ea93929190610bad565b34801561018c57600080fd5b506100dd610584565b3480156101a157600080fd5b506100dd610589565b3480156101b657600080fd5b506100dd6101c53660046108ea565b61058d565b3480156101d657600080fd5b506100dd61059a565b6101066101ed366004610957565b61059e565b3480156101fe57600080fd5b506100dd61070b565b34801561021357600080fd5b5061021c61070f565b6040516100ea9190610ab0565b61010661023736600461097e565b610713565b61017161024a366004610957565b610867565b34801561025b57600080fd5b506100dd61026a3660046109d4565b610886565b4290565b6060600082806001600160401b038111801561028e57600080fd5b506040519080825280602002602001820160405280156102c857816020015b6102b561088a565b8152602001906001900390816102ad5790505b5092503660005b828110156103ee576102df61088a565b8582815181106102eb57fe5b6020026020010151905087878381811061030157fe5b90506020028101906103139190610c19565b60408101359586019590935061032c60208501856108ea565b6001600160a01b0316816103436060870187610bd5565b604051610351929190610aa0565b60006040518083038185875af1925050503d806000811461038e576040519150601f19603f3d011682016040523d82523d6000602084013e610393565b606091505b5060208085019190915290151580845290850135176103e45762461bcd60e51b6000526020600452601760245276135d5b1d1a58d85b1b0cce8818d85b1b0819985a5b1959604a1b60445260846000fd5b50506001016102cf565b508234146104175760405162461bcd60e51b815260040161040e90610b11565b60405180910390fd5b50505092915050565b43606082806001600160401b038111801561043a57600080fd5b5060405190808252806020026020018201604052801561046e57816020015b60608152602001906001900390816104595790505b5091503660005b8281101561055257600087878381811061048b57fe5b905060200281019061049d9190610c4d565b92506104ac60208401846108ea565b6001600160a01b03166104c26020850185610bd5565b6040516104d0929190610aa0565b6000604051808303816000865af19150503d806000811461050d576040519150601f19603f3d011682016040523d82523d6000602084013e610512565b606091505b5086848151811061051f57fe5b60209081029190910101529050806105495760405162461bcd60e51b815260040161040e90610ae0565b50600101610475565b5050509250929050565b60001943014090565b4690565b4380406060610579868686610713565b905093509350939050565b600090565b4390565b6001600160a01b03163190565b4490565b606081806001600160401b03811180156105b757600080fd5b506040519080825280602002602001820160405280156105f157816020015b6105de61088a565b8152602001906001900390816105d65790505b5091503660005b828110156104175761060861088a565b84828151811061061457fe5b6020026020010151905086868381811061062a57fe5b905060200281019061063c9190610c38565b925061064b60208401846108ea565b6001600160a01b03166106616040850185610bd5565b60405161066f929190610aa0565b6000604051808303816000865af19150503d80600081146106ac576040519150601f19603f3d011682016040523d82523d6000602084013e6106b1565b606091505b5060208084019190915290151580835290840135176107025762461bcd60e51b6000526020600452601760245276135d5b1d1a58d85b1b0cce8818d85b1b0819985a5b1959604a1b60445260646000fd5b506001016105f8565b4590565b4190565b606081806001600160401b038111801561072c57600080fd5b5060405190808252806020026020018201604052801561076657816020015b61075361088a565b81526020019060019003908161074b5790505b5091503660005b8281101561085d5761077d61088a565b84828151811061078957fe5b6020026020010151905086868381811061079f57fe5b90506020028101906107b19190610c4d565b92506107c060208401846108ea565b6001600160a01b03166107d66020850185610bd5565b6040516107e4929190610aa0565b6000604051808303816000865af19150503d8060008114610821576040519150601f19603f3d011682016040523d82523d6000602084013e610826565b606091505b5060208301521515815287156108545780516108545760405162461bcd60e51b815260040161040e90610ae0565b5060010161076d565b5050509392505050565b600080606061087860018686610569565b919790965090945092505050565b4090565b60408051808201909152600081526060602082015290565b60008083601f8401126108b3578182fd5b5081356001600160401b038111156108c9578182fd5b60208301915083602080830285010111156108e357600080fd5b9250929050565b6000602082840312156108fb578081fd5b81356001600160a01b0381168114610911578182fd5b9392505050565b6000806020838503121561092a578081fd5b82356001600160401b0381111561093f578182fd5b61094b858286016108a2565b90969095509350505050565b60008060208385031215610969578182fd5b82356001600160401b0381111561093f578283fd5b600080600060408486031215610992578081fd5b833580151581146109a1578182fd5b925060208401356001600160401b038111156109bb578182fd5b6109c7868287016108a2565b9497909650939450505050565b6000602082840312156109e5578081fd5b5035919050565b6000815180845260208085018081965082840281019150828601855b85811015610a4857828403895281518051151585528501516040868601819052610a3481870183610a55565b9a87019a9550505090840190600101610a08565b5091979650505050505050565b60008151808452815b81811015610a7a57602081850181015186830182015201610a5e565b81811115610a8b5782602083870101525b50601f01601f19169290920160200192915050565b6000828483379101908152919050565b6001600160a01b0391909116815260200190565b60006020825261091160208301846109ec565b90815260200190565b602080825260179082015276135d5b1d1a58d85b1b0cce8818d85b1b0819985a5b1959604a1b604082015260600190565b6020808252601a908201527909aead8e8d2c6c2d8d8667440ecc2d8eaca40dad2e6dac2e8c6d60331b604082015260600190565b600060408201848352602060408185015281855180845260608601915060608382028701019350828701855b82811015610b9f57605f19888703018452610b8d868351610a55565b95509284019290840190600101610b71565b509398975050505050505050565b600084825283602083015260606040830152610bcc60608301846109ec565b95945050505050565b6000808335601e19843603018112610beb578283fd5b8301803591506001600160401b03821115610c04578283fd5b6020019150368190038213156108e357600080fd5b60008235607e19833603018112610c2e578182fd5b9190910192915050565b60008235605e19833603018112610c2e578182fd5b60008235603e19833603018112610c2e578182fdfea26469706673582212209cadfca18c437b2d699ef724abfd06307756c044c5e06e08ae6e50a269e059b664736f6c634300060c0033";

export class Multicall3__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Multicall3> {
    return super.deploy(overrides || {}) as Promise<Multicall3>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Multicall3 {
    return super.attach(address) as Multicall3;
  }
  connect(signer: Signer): Multicall3__factory {
    return super.connect(signer) as Multicall3__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Multicall3Interface {
    return new utils.Interface(_abi) as Multicall3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Multicall3 {
    return new Contract(address, _abi, signerOrProvider) as Multicall3;
  }
}
