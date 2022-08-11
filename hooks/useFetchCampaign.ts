import { useState } from "react";
import { getPoolContract, getWagmiContractParams } from "../utils/contracts";
import { useContract, useProvider } from "wagmi";

const useFetchCampaign = (pool: string) => {
  const contractParams = getPoolContract(pool);
  const account = useProvider()
  const poolContract = useContract({...contractParams, signerOrProvider:account});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      if (!poolContract) {
        return { data: null, error: "Contract does not exist" };
      }
      const res = await poolContract.calculateYield();
      setLoading(false);
      return { data: res, error: null };
    } catch (error) {
      console.log("Error from fetchCampaign", error);
      setLoading(false);
      return {
        data: null,
        error:
          "Something went wrong with fetching campaigns. Please refresh the page.",
      };
    }
  };

  return { loading, fetchData };
};

export default useFetchCampaign;
