import envConfig from "../utils/envConfig";
import { ethers } from "ethers";
import { getWagmiContractParams } from "../utils/contracts";

import { useContract, useContractWrite, useProvider } from "wagmi";
import { useEffect, useState } from "react";

const INSUFFICIENT_FUNDS_ERROR_CODE = "INSUFFICIENT_FUNDS";

const useMintBadge = () => {
  const contractParams = getWagmiContractParams();
  const provider = useProvider();
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const contract = useContract({
    ...contractParams,
    signerOrProvider: provider,
  });

  const prepareOverridesArgs = async (campaignId: number, account: string) => {
    let estimatedGas = 200000;
    try {
      const estimatedGasFromContract = await contract.estimateGas.claimBadge(
        campaignId,
        {
          from: account,
        }
      );
      estimatedGas = estimatedGasFromContract.mul(11).div(10).toNumber();
      console.log("estimatedGas for Sale", estimatedGas);
    } catch (error: any) {
      console.log("[Estimating Gas Error: ", error);
      console.log(error.code);
      if (error.code !== INSUFFICIENT_FUNDS_ERROR_CODE) {
        return {
          from: account,
        };
      }
    }

    return {
      from: account,
      gasLimit: estimatedGas,
    };
  };

  const { data, isLoading, error, write, reset } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...contractParams,
    functionName: "claimBadge",
    chainId: envConfig.MAINNET ? 1 : 80001,
  });

  const processTransaction = async () => {
    if (data) {
      const txnReceipt = await data.wait();
      setTransactionHash(txnReceipt.transactionHash);
      setIsMinting(false);
    }
  };

  useEffect(() => {
    if (data) {
      processTransaction();
    } else {
      setTransactionHash("");
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setIsMinting(true);
    } else {
      if (transactionHash) {
        setIsMinting(false);
      } else if (error) {
        setIsMinting(false);
      }
    }
  }, [isLoading]);

  return {
    transactionHash,
    isMinting,
    error,
    write,
    reset,
    prepareOverridesArgs,
  };
};

export default useMintBadge;
