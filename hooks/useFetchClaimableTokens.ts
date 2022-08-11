import { useState } from "react";
import { getWagmiContractParams } from "../utils/contracts";
import { useAccount, useContract } from "wagmi";

enum ERC20CA {
  DAI = "0x001b3b4d0f3714ca98ba10f6042daebf0b1b7b6f",
  WBTC = "0x0d787a4a1548f673ed375445535a6c7a1ee56180",
  USDC = "0x2058a9d7613eee744279e3856ef0eada5fcbaa7e",
  AAVE = "0x341d1f30e77d3fbfbd43d17183e2acb9df25574e",
  WETH = "0x3c68ce8504087f89c640d02d133646d98e64ddd9",
  WMATIC = "0x9c3c9283d3e44854697cd22d3faa240cfb032889",
  USDT = "0xbd21a10f619be90d6066c941b04e340841f1f989",
}

const useFetchClaimableTokens = () => {
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

      const dai = await NFTContract.claimableToken(campaignId, ERC20CA.DAI);
      const wbtc = await NFTContract.claimableToken(campaignId, ERC20CA.WBTC);
      const usdc = await NFTContract.claimableToken(campaignId, ERC20CA.USDC);
      const aave = await NFTContract.claimableToken(campaignId, ERC20CA.AAVE);
      const weth = await NFTContract.claimableToken(campaignId, ERC20CA.WETH);
      const wmatic = await NFTContract.claimableToken(
        campaignId,
        ERC20CA.WMATIC
      );
      const usdt = await NFTContract.claimableToken(campaignId, ERC20CA.USDT);
      setLoading(false);
      return {
        data: {
          [ERC20CA.DAI]: dai,
          [ERC20CA.WBTC]: wbtc,
          [ERC20CA.USDC]: usdc,
          [ERC20CA.AAVE]: aave,
          [ERC20CA.WETH]: weth,
          [ERC20CA.WMATIC]: wmatic,
          [ERC20CA.USDT]: usdt,
        },
        error: null,
      };
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

export default useFetchClaimableTokens;
