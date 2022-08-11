import { useState } from "react";
import { getWagmiContractParams } from "../utils/contracts";
import { useAccount, useContract } from "wagmi";

const useFetchCampaign = () => {
  const contractParams = getWagmiContractParams();
  const NFTContract = useContract(contractParams);

  const [loading, setLoading] = useState<boolean>(true);

  const { address } = useAccount();

  const fetchData = async (campaignId: number) => {
    setLoading(true);

    try {
      if (!NFTContract) {
        return { data: null, error: "Contract does not exist" };
      }

      const campaignInfo = await NFTContract.campaigns(campaignId);
      setLoading(false);
      return { data: campaignInfo, error: null };
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
