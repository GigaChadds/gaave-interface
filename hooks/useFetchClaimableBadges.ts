import { useState } from "react";
import { getWagmiContractParams } from "../utils/contracts";
import { useAccount, useContract } from "wagmi";

const useFetchClaimableBadges = () => {
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

      const listOfBadges = await NFTContract.canClaim(campaignId, address);
      setLoading(false);
      return { data: listOfBadges, error: null };
    } catch (error) {
      console.log("Error from fetchTokenBalance", error);
      setLoading(false);
      return {
        data: null,
        error:
          "Something went wrong with fetching claimable badges. Please refresh the page.",
      };
    }
  };

  return { loading, fetchData };
};

export default useFetchClaimableBadges;
