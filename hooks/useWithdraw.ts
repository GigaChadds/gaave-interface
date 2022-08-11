import envConfig from "../utils/envConfig";
import { BigNumber, ethers } from "ethers";
import { getWagmiContractParams } from "../utils/contracts";

import { useContract, useContractWrite, useProvider } from "wagmi";
import { useEffect, useState } from "react";

const INSUFFICIENT_FUNDS_ERROR_CODE = "INSUFFICIENT_FUNDS";

const useWithdraw = () => {
  const contractParams = getWagmiContractParams();
  const provider = useProvider();
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);

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
    try {
      const estimatedGasFromContract = await contract.estimateGas.withdraw(
        campaignId,
        tokenAddress,
        ethers.utils.parseEther(amount),
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
    functionName: "withdraw",
    chainId: envConfig.MAINNET ? 1 : 80001,
  });

  const processTransaction = async () => {
    if (data) {
      const txnReceipt = await data.wait();
      setTransactionHash(txnReceipt.transactionHash);
      setIsWithdrawing(false);
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
      setIsWithdrawing(true);
    } else {
      if (transactionHash) {
        setIsWithdrawing(false);
      } else if (error) {
        setIsWithdrawing(false);
      }
    }
  }, [isLoading]);

  return {
    transactionHash,
    isWithdrawing,
    error,
    write,
    reset,
    prepareOverridesArgs,
  };
};

export default useWithdraw;
