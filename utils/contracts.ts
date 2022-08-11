import { ethers } from "ethers";
import envConfig from "./envConfig";

export const getWagmiContractParams = () => {
  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED)
    return {
      addressOrName: envConfig.CONTRACT_ADDRESS,
      contractInterface: [],
    };

  try {
    const contract = require(`../contracts/mumbai/${envConfig.CONTRACT_NAME}.json`);

    return {
      addressOrName: envConfig.CONTRACT_ADDRESS,
      contractInterface: contract.abi,
    };
  } catch (error) {
    console.log("[Wagmi] Contract does not exist!");
    return {
      addressOrName: envConfig.CONTRACT_ADDRESS,
      contractInterface: [],
    };
  }
};
export const getPoolContract = (tokenAddress: string) => {
  try {
    // const contract = require(`../contracts/${chain}/${envConfig.CONTRACT_NAME}.json`);
    const contract = require(`../contracts/mumbai/GAAVEPool.json`);
    return {
      addressOrName: tokenAddress,
      contractInterface: contract.abi,
    };
  } catch (error) {
    console.log("[Badge] Contract does not exist!");
    return {
      addressOrName: tokenAddress,
      contractInterface: [],
    };
  }
}

export const getBadgeContractParams = () => {
  try {
    // const contract = require(`../contracts/${chain}/${envConfig.CONTRACT_NAME}.json`);
    const contract = require(`../contracts/mumbai/GAAVEBadge.json`);
    return {
      addressOrName: "0x1E85B71b031Eb76BFE09b3551c09FDd2e8f20c90",
      contractInterface: contract.abi,
    };
  } catch (error) {
    console.log("[Badge] Contract does not exist!");
    return {
      addressOrName: envConfig.BADGE_ADDRESS,
      contractInterface: [],
    };
  }
};

export const getERC20TokenContract = (tokenAddress: string) => {
  // Strictly only pass in tokenAddress
  let tokenName = "";
  switch (tokenAddress) {
    case "0x001b3b4d0f3714ca98ba10f6042daebf0b1b7b6f":
      tokenName = "DAI";
      break;
    case "0x0d787a4a1548f673ed375445535a6c7a1ee56180":
      tokenName = "WBTC";
      break;
    case "0x2058a9d7613eee744279e3856ef0eada5fcbaa7e":
      tokenName = "USDC";
      break;
    case "0x341d1f30e77d3fbfbd43d17183e2acb9df25574e":
      tokenName = "AAVE";
      break;
    case "0x3c68ce8504087f89c640d02d133646d98e64ddd9":
      tokenName = "WETH";
      break;
    case "0x9c3c9283d3e44854697cd22d3faa240cfb032889":
      tokenName = "WMATIC";
      break;
    case "0xbd21a10f619be90d6066c941b04e340841f1f989":
      tokenName = "USDT";
      break;
    default:
      tokenName = "WMATIC";
  }
  try {
    const contract = require(`../contracts/mumbai/tokens/${tokenName}.json`);
    return new ethers.Contract(tokenAddress, contract.abi, undefined);
  } catch (error) {
    console.log("[ERC20] Contract does not exist!");
    return null;
  }
};

// /**
//  * Gets Deployed Contract from block chain folder
//  * @param {*} contractName
//  * @param {*} chainId
//  * @returns Contract
//  */
// export const getContract = (contractName: string, chainId: number) => {
//   let chain = chainMap[chainId];

//   if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

//   try {
//     /* eslint-disable global-require */
//     const contract = require(`../contracts/${chain}/${contractName}.json`);
//     /* eslint-enable global-require */
//     return new ethers.Contract(
//       envConfig.CONTRACT_ADDRESS,
//       contract.abi,
//       undefined
//     );
//   } catch (error) {
//     console.error("[EtherJS] Contract does not exist!");
//   }
// };

// export const getWsContract = (
//   contractName: string,
//   chainId: number,
//   wsProvider: any
// ) => {
//   let chain = chainMap[chainId];

//   if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

//   try {
//     /* eslint-disable global-require */
//     const contract = require(`../contracts/${chain}/${contractName}.json`);
//     /* eslint-enable global-require */
//     return new ethers.Contract(
//       envConfig.CONTRACT_ADDRESS,
//       contract.abi,
//       wsProvider
//     );
//   } catch (error) {
//     console.error("[EtherJS] WsContract does not exist!");
//   }
// };
