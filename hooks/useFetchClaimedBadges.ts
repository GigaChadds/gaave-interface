import { useState } from "react";
import { getBadgeContractParams, getWagmiContractParams } from "../utils/contracts";
import { useAccount, useContract } from "wagmi";

const useFetchClaimedBadges = () => {
  const contractParams = getBadgeContractParams();
  const badgeContract = useContract(contractParams);

  const [loading, setLoading] = useState<boolean>(true);

  const { address } = useAccount();

  const fetchClaimedBadges = async () => {
    setLoading(true);

    try {
      if (!badgeContract) {
        return { data: null, error: "Contract does not exist" };
      }
      // const badges:any[] = []
      const totalBadges = await badgeContract.balanceOf(address);
      // //   TODO use new claimedBadges for ids
      // for (let i = 1; i <= totalBadges; i++){
      //   const uri  = await badgeContract.uri(i);
      //   // const data = await fetc h(uri)
      //   console.log(uri)
      // }
      setLoading(false);
      return { data: totalBadges, error: null };
    } catch (error) {
      console.log("Error from useFetchClaimedBadges", error);
      setLoading(false);
      return {
        data: null,
        error:
          "Something went wrong with fetching claimed badges. Please refresh the page.",
      };
    }
  };

  return { loading, fetchClaimedBadges };
};

export default useFetchClaimedBadges;
