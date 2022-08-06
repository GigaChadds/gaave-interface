import { useState, useEffect } from "react";
import { getWagmiContractParams } from "../utils/contracts";
import { useContractReads } from "wagmi";

interface IData {
  isPresaleOpen: boolean;
  isPublicSaleOpen: boolean;
}

const defaultData = {
  isPresaleOpen: false,
  isPublicSaleOpen: false,
};

const useFetchSalesTime = () => {
  const [data, setData] = useState<IData>(defaultData);
  const contractParams = getWagmiContractParams();

  const {
    data: rawData,
    isError,
    isLoading,
    refetch,
  } = useContractReads({
    contracts: [
      {
        ...contractParams,
        functionName: "stage",
      },
    ],
  });

  const RefetchData = async () => {
    const response = await refetch();

    if (!response.error && response.data) {
      setData({
        isPresaleOpen: false,
        isPublicSaleOpen: Number(response.data[0]) === 6,
      });
    }
  };

  useEffect(() => {
    if (rawData) {
      setData({
        isPresaleOpen: false,
        isPublicSaleOpen: Number(rawData[0]) === 6,
      });
    }
  }, [rawData]);

  return { data, isLoading, isError, RefetchData };
};

export default useFetchSalesTime;
