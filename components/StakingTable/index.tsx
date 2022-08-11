import CountUp from "react-countup";
import styles from "./index.module.scss";

import Image from "next/image";
import { useQuery } from "@apollo/client";
import QUERY_RESERVES from "./reserves.graphql";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { coinMap } from "../../utils/constants/token";
import { MoonLoader } from "react-spinners";
import useFetchTokenBalance from "../../hooks/useFetchTokenBalance";
import useClaimYield from "../../hooks/useClaimYield";
import { useAccount } from "wagmi";

export enum ActionType {
  WITHDRAWAL = "Withdrawal",
  DEPOSIT = "Deposit",
}

interface GraphQLAaveCrypto {
  aEmissionPerSecond: string;
  liquidityRate: string;
  name: string;
  sEmissionPerSecond: string;
  stableBorrowRate: string;
  totalATokenSupply: string;
  totalCurrentVariableDebt: string;
  underlyingAsset: string;
  vEmissionPerSecond: string;
  variableBorrowRate: string;
}

export interface GraphQLAaveCrypto_Balance extends GraphQLAaveCrypto {
  balance: number;
}

const StakingTable = ({ campaignId }: { campaignId: number }) => {
  const { data, loading } = useQuery(QUERY_RESERVES, {
    context: { clientName: "aave" },
  });

  const { address } = useAccount();

  const { loading: fetchingTokenBalance, fetchData } = useFetchTokenBalance();

  const [tokens, setTokens] = useState<any>([]);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  // This one can be a object of the token type, like tokenId, tokenName, currentAmount that the person has
  const [selectedToken, setSelectedToken] = useState<GraphQLAaveCrypto_Balance>(
    {
      aEmissionPerSecond: "",
      liquidityRate: "",
      name: "",
      sEmissionPerSecond: "",
      stableBorrowRate: "",
      totalATokenSupply: "",
      totalCurrentVariableDebt: "",
      underlyingAsset: "",
      vEmissionPerSecond: "",
      variableBorrowRate: "",
      balance: 0,
    }
  );
  const [type, setType] = useState<ActionType>(ActionType.DEPOSIT);

  const prepareCryptoData = async (data: any) => {
    const _data = data.reserves;

    const output = _data.map(async (crypto: GraphQLAaveCrypto) => {
      const tokenBal = await fetchData(crypto.underlyingAsset);
      return {
        ...crypto,
        balance: tokenBal.data ? tokenBal.data : 10, // Remember to replace dummy 10 into 0;
      };
    });
    const awaited_output = await Promise.all(output);
    setTokens(awaited_output);
  };

  const {
    transactionHash,
    isClaiming,
    error,
    write,
    reset,
    prepareOverridesArgs,
  } = useClaimYield();

  const claimYield = async (tokenAddress: string) => {
    const overridesArgs = await prepareOverridesArgs(
      campaignId as unknown as number,
      tokenAddress as unknown as string,
      address!!
    );
    if (write) {
      write({
        recklesslySetUnpreparedArgs: [campaignId, tokenAddress],
        recklesslySetUnpreparedOverrides: overridesArgs,
      });
    }
  };

  useEffect(() => {
    if (data) {
      prepareCryptoData(data);
    }
  }, [data]);

  return (
    <>
      {console.log(data)}
      <table className={styles.container}>
        {loading ? (
          <tr className={styles.container_loader}>
            <td>
              <MoonLoader size={40} color="black" loading={true} />
            </td>
          </tr>
        ) : (
          <>
            <tr className={styles.container_header}>
              <th>Assets</th>
              <th>Balance</th>
              <th>Vested</th>
              <th>APR</th>
              <th></th>
            </tr>

            {tokens.map((crypto: GraphQLAaveCrypto_Balance) => (
              <tr
                key={`${crypto.underlyingAsset}`}
                className={styles.container_data}
              >
                <td>
                  <div className={styles.row}>
                    <div className={styles.container_data_image}>
                      {coinMap[crypto.name] && (
                        <Image
                          src={coinMap[crypto.name]}
                          alt={crypto.name}
                          layout="fill"
                        />
                      )}
                    </div>
                    {crypto.name}
                  </div>
                </td>
                <td>
                  <CountUp
                    start={0}
                    end={crypto.balance}
                    decimals={4}
                    duration={2}
                  />
                </td>
                <td>
                  <CountUp
                    start={0}
                    end={crypto.balance}
                    decimals={4}
                    duration={2}
                  />
                </td>
                <td>
                  <CountUp
                    start={0}
                    end={Number(crypto.liquidityRate) / Math.pow(10, 27)}
                    decimals={2}
                    duration={2}
                  />
                  %
                </td>
                <td className={styles.container_actionables}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedToken(crypto);
                      setDisplayModal(true);
                      setType(ActionType.WITHDRAWAL);
                    }}
                  >
                    Withdraw
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedToken(crypto);
                      setDisplayModal(true);
                      setType(ActionType.DEPOSIT);
                    }}
                  >
                    Deposit
                  </button>
                  <button
                    type="button"
                    onClick={() => claimYield(crypto.underlyingAsset)}
                  >
                    Claim Yield
                  </button>
                </td>
              </tr>
            ))}
          </>
        )}
      </table>

      {displayModal && (
        <Modal
          selectedToken={selectedToken.name}
          selectedTokenBalance={selectedToken.balance}
          selectedTokenAddress={selectedToken.underlyingAsset}
          selectedTokenVestedAmount={100}
          closeModal={() => setDisplayModal(false)}
          actionType={type}
        />
      )}
    </>
  );
};

export default StakingTable;
