import { useState, useEffect } from "react";
import { getWagmiContractParams } from "../utils/contracts";
import { useAccount, useContractReads } from "wagmi";

interface IData {
  mintedAmount: number;
}

const defaultData = { mintedAmount: 0 };

const useFetchUserNFTLimit = () => {
  const [data, setData] = useState<IData>(defaultData);
  const contractParams = getWagmiContractParams();

  const { address } = useAccount();

  const {
    data: rawData,
    isError,
    isLoading,
    refetch,
  } = useContractReads({
    contracts: [
      {
        ...contractParams,
        functionName: "publicMintCount",
        args: [address],
      },
    ],
  });

  const RefetchData = async () => {
    const response = await refetch();

    if (!response.error && response.data) {
      setData({
        mintedAmount: Number(response.data[0]),
      });
    }
  };

  useEffect(() => {
    if (rawData) {
      setData({
        mintedAmount: Number(rawData[0]),
      });
    }
  }, [rawData]);

  return { data, isLoading, isError, RefetchData };
};

export default useFetchUserNFTLimit;
