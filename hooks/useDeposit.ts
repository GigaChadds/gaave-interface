import envConfig from "../utils/envConfig";
import { BigNumber, ethers } from "ethers";
import { getWagmiContractParams } from "../utils/contracts";

import { useContract, useContractWrite, useProvider } from "wagmi";
import { useEffect, useState } from "react";

const INSUFFICIENT_FUNDS_ERROR_CODE = "INSUFFICIENT_FUNDS";

const useDeposit = () => {
  const contractParams = getWagmiContractParams();
  const provider = useProvider();
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [isDepositing, setIsDepositing] = useState<boolean>(false);

  const contract = useContract({
    ...contractParams,
    signerOrProvider: provider,
  });

  const prepareOverridesArgs = async (
    campaignId: number,
    tokenAddress: string,
    amount: string,
    account: string
  ) => {
    let estimatedGas = 200000;
    console.log(ethers.utils.parseEther(amount));

    try {
      const estimatedGasFromContract = await contract.estimateGas.deposit(
        campaignId,
        tokenAddress,
        ethers.utils.parseEther(amount),
        {
          from: account,
          // value: ethers.utils.parseEther(amount),
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
    functionName: "deposit",
    chainId: envConfig.MAINNET ? 1 : 80001,
  });

  const processTransaction = async () => {
    if (data) {
      const txnReceipt = await data.wait();
      setTransactionHash(txnReceipt.transactionHash);
      setIsDepositing(false);
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
      setIsDepositing(true);
    } else {
      if (transactionHash) {
        setIsDepositing(false);
      } else if (error) {
        setIsDepositing(false);
      }
    }
  }, [isLoading]);

  return {
    transactionHash,
    isDepositing,
    error,
    write,
    reset,
    prepareOverridesArgs,
  };
};

export default useDeposit;
