import chainMap from "./constants/chains";
import { ethers } from "ethers";
import envConfig from "./envConfig";

export const getWagmiContractParams = () => {
  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED)
    return {
      addressOrName: envConfig.CONTRACT_ADDRESS,
      contractInterface: [],
    };

  try {
    // const contract = require(`../contracts/${chain}/${envConfig.CONTRACT_NAME}.json`);
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

/**
 * Gets Deployed Contract from block chain folder
 * @param {*} contractName
 * @param {*} chainId
 * @returns Contract
 */
export const getContract = (contractName: string, chainId: number) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    const contract = require(`../contracts/${chain}/${contractName}.json`);
    /* eslint-enable global-require */
    return new ethers.Contract(
      envConfig.CONTRACT_ADDRESS,
      contract.abi,
      undefined
    );
  } catch (error) {
    console.error("[EtherJS] Contract does not exist!");
  }
};

export const getWsContract = (
  contractName: string,
  chainId: number,
  wsProvider: any
) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    const contract = require(`../contracts/${chain}/${contractName}.json`);
    /* eslint-enable global-require */
    return new ethers.Contract(
      envConfig.CONTRACT_ADDRESS,
      contract.abi,
      wsProvider
    );
  } catch (error) {
    console.error("[EtherJS] WsContract does not exist!");
  }
};
