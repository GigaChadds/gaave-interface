import { useState } from "react";
import { getWagmiContractParams } from "../utils/contracts";
import { useAccount, useContract, useProvider } from "wagmi";

const useFetchStakedTokenBalance = () => {
  const contractParams = getWagmiContractParams();
  const provider = useProvider();
  const NFTContract = useContract({
    ...contractParams,
    signerOrProvider: provider,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const { address } = useAccount();

  const fetchData = async (tokenAddress: string) => {
    setLoading(true);

    try {
      if (!NFTContract) {
        return { data: null, error: "Contract does not exist" };
      }

      const tokenAmount = await NFTContract.getSupporterTokenBalance(
        address,
        tokenAddress
      );
      setLoading(false);
      return { data: Number(tokenAmount), error: null };
    } catch (error) {
      console.log("Error from fetchTokenBalance", error);
      setLoading(false);
      return {
        data: null,
        error:
          "Something went wrong with fetching token balance. Please refresh the page.",
      };
    }
  };

  return { loading, fetchData };
};

export default useFetchStakedTokenBalance;
