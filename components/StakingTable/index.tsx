import CountUp from "react-countup";
import styles from "./index.module.scss";

import Image from "next/image";
import { useQuery } from "@apollo/client";
import QUERY_RESERVES from "./reserves.graphql";
import { useState } from "react";
import Modal from "../Modal";
import { coinMap } from "../../utils/constants/token";
import { MoonLoader } from "react-spinners";

export enum ActionType {
  WITHDRAWAL = "Withdrawal",
  DEPOSIT = "Deposit",
}

const StakingTable = () => {
  const { data, loading } = useQuery(QUERY_RESERVES, {
    context: { clientName: "aave" },
  });

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  // This one can be a object of the token type, like tokenId, tokenName, currentAmount that the person has
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [type, setType] = useState<ActionType>(ActionType.DEPOSIT);

  return (
    <>
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
              <th>APR</th>
              <th></th>
            </tr>

            {data?.reserves.map((crypto: any) => (
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
                    end={crypto.liquidityRate / Math.pow(10, 27)}
                    decimals={2}
                    duration={2}
                  />
                  %
                </td>
                <td className={styles.container_actionables}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedToken(crypto.name);
                      setDisplayModal(true);
                      setType(ActionType.WITHDRAWAL);
                    }}
                  >
                    Withdraw
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedToken(crypto.name);
                      setDisplayModal(true);
                      setType(ActionType.DEPOSIT);
                    }}
                  >
                    Deposit
                  </button>
                </td>
              </tr>
            ))}
          </>
        )}
      </table>

      {displayModal && (
        <Modal
          selectedToken={selectedToken}
          closeModal={() => setDisplayModal(false)}
          actionType={type}
        />
      )}
    </>
  );
};

export default StakingTable;
