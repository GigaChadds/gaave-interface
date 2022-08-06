import { useState, useEffect } from "react";
import { getWagmiContractParams } from "../utils/contracts";
import { useContractRead, useContractReads } from "wagmi";

interface IData {
  currentSupply: number;
}

const defaultData = 0;

const useFetchCurrentSupply = () => {
  const [data, setData] = useState<number>(defaultData);
  const contractParams = getWagmiContractParams();

  const {
    data: rawData,
    isError,
    isLoading,
    refetch,
  } = useContractRead({
    ...contractParams,
    functionName: "totalSupply",
  });

  const RefetchData = async () => {
    const response = await refetch();

    if (!response.error && response.data) {
      setData(Number(response.data));
    }
  };

  useEffect(() => {
    if (rawData) {
      setData(Number(rawData));
    }
  }, [rawData]);

  return { data, isLoading, isError, RefetchData };
};

export default useFetchCurrentSupply;
