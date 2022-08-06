import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import envConfig from "../utils/envConfig";

const useCheckNetwork = () => {
  const { chain } = useNetwork();
  const [rightNetwork, setRightNetwork] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const supposedNetworkId = () => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname &&
      window.location.hostname === "localhost"
    ) {
      return 80001;
    } else if (envConfig.MAINNET) {
      return 137;
    } else {
      return 80001;
    }
  };

  const errorMessage = () => {
    const baseString = "Please connect to ";
    switch (Number(supposedNetworkId())) {
      case 1:
        return baseString + "Ethereum mainnet";
      case 25:
        return baseString + "Cronos network";
      case 4:
        return baseString + "Rinkeby testnet";
      case 5:
        return baseString + "Goerli testnet";
      case 137:
        return baseString + "Polygon mainnet";
      case 338:
        return baseString + "Cronos testnet";
      case 31337:
        return baseString + "Localhost testnet";
      case 80001:
        return baseString + "Mumbai testnet";
      default:
        return baseString + "Ethereum mainnet";
    }
  };

  const checkRightNetwork = () => {
    const networkIdSupposedToConnect = supposedNetworkId();

    if (!chain) return;

    if (chain.id !== networkIdSupposedToConnect) {
      setRightNetwork(false);
      setError(errorMessage());
    } else {
      setRightNetwork(true);
      setError("");
    }
  };

  useEffect(() => {
    if (chain) {
      checkRightNetwork();
    }
  }, [chain]);

  return { rightNetwork, error, supposedNetworkId };
};

export default useCheckNetwork;
