import { Chain } from "wagmi";

type IChainMap = {
  [key: number]: string;
};

const chainMap: IChainMap = {
  1: "mainnet",
  4: "rinkeby",
  5: "goerli",
  31337: "localhost",
  137: "matic",
  80001: "mumbai",
};

export const cronosChain: Chain = {
  id: 25,
  name: "Cronos",
  network: "Cronos",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "CRO",
  },
  rpcUrls: {
    default: "https://evm.cronos.org",
  },
  blockExplorers: {
    default: { name: "Cronoscan", url: "https://cronoscan.com/" },
  },
  testnet: false,
};

export const tCronosChain: Chain = {
  id: 338,
  name: "TCronos",
  network: "TCronos",
  nativeCurrency: {
    decimals: 18,
    name: "TCronos",
    symbol: "TCRO",
  },
  rpcUrls: {
    default: "https://evm-t3.cronos.org",
  },
  blockExplorers: {
    default: { name: "TCronoscan", url: "https://testnet.cronoscan.com/" },
  },
  testnet: true,
};

export default chainMap;
