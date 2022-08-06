import styles from "./index.module.scss";
import { useState } from "react";

import useFetchNFTData from "../../hooks/useFetchNFTData";
import useFetchUserNFTLimit from "../../hooks/useFetchUserNFTLimit";
import useFetchSalesTime from "../../hooks/useFetchSalesTime";
import useFetchCurrentSupply from "../../hooks/useFetchCurrentSupply";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import useMint from "../../hooks/useMint";
import { useAccount } from "wagmi";
import { MoonLoader } from "react-spinners";
import envConfig from "../../utils/envConfig";

const MintContainer = () => {
  const { address } = useAccount();
  const [mintQuantity, setMintQuantity] = useState<number>(1);

  const {
    data: CurrentNFTSupply,
    isLoading: fetchingCurrentNFTSupply,
    isError: errorFromCurrentNFTSupply,
    RefetchData: fetchCurrentNFTSupply,
  } = useFetchCurrentSupply();

  const {
    data: CurrentNFTData,
    isLoading: fetchingCurrentNFTData,
    isError: errorFromCurrentNFTData,
  } = useFetchNFTData();

  const {
    data: WalletLimit,
    isLoading: fetchingWalletLimit,
    isError: errorFromWalletLimit,
    RefetchData: fetchWalletLimit,
  } = useFetchUserNFTLimit();

  const {
    data: SalesTime,
    isLoading: fetchingSalesTime,
    isError: errorFromSalesTime,
  } = useFetchSalesTime();

  const {
    transactionHash,
    isMinting,
    error: errorFromMinting,
    write,
    reset,
    prepareOverridesArgs,
  } = useMint();

  const handleMintCount = (add: boolean) => {
    const maxMintableAmount =
      CurrentNFTData.maxMintPerWallet - WalletLimit.mintedAmount;

    if (add && mintQuantity < maxMintableAmount) {
      setMintQuantity(mintQuantity + 1);
    } else if (!add) {
      if (mintQuantity === 1) return;
      setMintQuantity(mintQuantity - 1);
    }
  };

  const handleMint = async () => {
    const overridesArgs = await prepareOverridesArgs(
      CurrentNFTData.price,
      mintQuantity,
      address!!
    );
    if (write) {
      write({
        recklesslySetUnpreparedArgs: mintQuantity,
        recklesslySetUnpreparedOverrides: overridesArgs,
      });
    }
  };

  const processHashToUrl = (transactionHash: string) => {
    switch (envConfig.MAINNET) {
      case true:
        return `https://etherscan.io/tx/${transactionHash}`;
      case false:
        return `https://rinkeby.etherscan.io/tx/${transactionHash}`;
      default:
        return `https://etherscan.io/tx/${transactionHash}`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>🚀 Mint is open! 🚀</h2>

        {!isMinting && transactionHash && !errorFromMinting ? (
          <>
            <button className={styles.standardButton}>
              <a
                href={processHashToUrl(transactionHash)}
                target="_blank"
                rel="noreferrer"
              >
                View Transaction
              </a>
            </button>
            <button
              className={styles.standardButton}
              type="button"
              onClick={async () => {
                await fetchCurrentNFTSupply();
                await fetchWalletLimit();
                reset();
              }}
            >
              Mint More
            </button>
          </>
        ) : (
          <>
            <div className={styles.details}>
              <div>
                <label>Total Supply:</label>
                <span>{CurrentNFTData.totalSupply || <Skeleton />}</span>
              </div>

              <div>
                <label>Current Supply:</label>
                <span>{CurrentNFTSupply || <Skeleton />}</span>
              </div>

              <div>
                <label>Max Mint Per Wallet:</label>
                <span>{CurrentNFTData.maxMintPerWallet || <Skeleton />}</span>
              </div>

              <div>
                <label>Price:</label>
                <span>{CurrentNFTData.price + " ETH" || <Skeleton />}</span>
              </div>
            </div>

            {CurrentNFTSupply >= CurrentNFTData.totalSupply ? (
              <button className={styles.standardButton} type="button" disabled>
                Sold out
              </button>
            ) : (
              <>
                {WalletLimit.mintedAmount >= CurrentNFTData.maxMintPerWallet ? (
                  <button
                    className={styles.standardButton}
                    type="button"
                    disabled
                  >
                    User minted max
                  </button>
                ) : (
                  <>
                    <div className={styles.counter}>
                      <button
                        type="button"
                        onClick={() => handleMintCount(false)}
                      >
                        <AiOutlineMinus size={30} color="#1b1b1b" />
                      </button>
                      <label>{mintQuantity}</label>
                      <button
                        type="button"
                        onClick={() => handleMintCount(true)}
                      >
                        <AiOutlinePlus size={30} color="#1b1b1b" />
                      </button>
                    </div>

                    <button
                      className={styles.mint}
                      type="button"
                      disabled={!write || isMinting}
                      onClick={handleMint}
                    >
                      {isMinting ? (
                        <MoonLoader size={30} color="black" />
                      ) : (
                        "MINT"
                      )}
                    </button>
                  </>
                )}

                {errorFromMinting && (
                  <p className={styles.error}>
                    Error: {errorFromMinting.message}{" "}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MintContainer;
