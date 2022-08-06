import { useState, useEffect } from "react";
import { getWagmiContractParams } from "../utils/contracts";
import { useContractReads } from "wagmi";
import { utils } from "ethers";

interface IData {
  totalSupply: number;
  price: string;
  maxMintPerWallet: number;
}

const defaultData = {
  totalSupply: 0,
  price: "0",
  maxMintPerWallet: 0,
};

const useFetchNFTData = () => {
  const [data, setData] = useState<IData>(defaultData);
  const contractParams = getWagmiContractParams();

  const {
    data: rawData,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...contractParams,
        functionName: "totalMaxSupply",
      },
      {
        ...contractParams,
        functionName: "publicMintPrice",
      },
      {
        ...contractParams,
        functionName: "publicMintMaxPerWallet",
      },
    ],
  });

  useEffect(() => {
    if (rawData) {
      setData({
        totalSupply: Number(rawData[0]),
        price: utils.formatEther(String(rawData[1])),
        maxMintPerWallet: Number(rawData[2]),
      });
    }
  }, [rawData]);

  return { data, isLoading, isError };
};

export default useFetchNFTData;
