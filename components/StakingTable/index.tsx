import CountUp from "react-countup";
import styles from "./index.module.scss";
import USDCLogo from "../../public/assets/coins/usdc.svg";
import WETHLogo from "../../public/assets/coins/weth.svg";
import USDTLogo from "../../public/assets/coins/usdt.svg";
import WMaticLogo from "../../public/assets/coins/wmatic.svg";
import DaiLogo from "../../public/assets/coins/dai.svg";
import Image from "next/image";

const cryptoCurrencies = [
  {
    tokenId: 1,
    tokenName: "WMATIC",
    balance: 0,
    apy: 17.8,
    tokenImage: WMaticLogo,
  },
  {
    tokenId: 2,
    tokenName: "WETH",
    balance: 0,
    apy: 2.8,
    tokenImage: WETHLogo,
  },
  {
    tokenId: 3,
    tokenName: "USDT",
    balance: 0,
    apy: 12.8,
    tokenImage: USDTLogo,
  },
  {
    tokenId: 4,
    tokenName: "USDC",
    balance: 0,
    apy: 30.8,
    tokenImage: USDCLogo,
  },
  {
    tokenId: 5,
    tokenName: "DAI",
    balance: 0,
    apy: 9.8,
    tokenImage: DaiLogo,
  },
];

const StakingTable = () => {
  return (
    <table className={styles.container}>
      <tr className={styles.container_header}>
        <th>Assets</th>
        <th>Balance</th>
        <th>APY</th>
        <th></th>
      </tr>
      {cryptoCurrencies.map((crypto) => (
        <tr
          key={`${crypto.tokenName}_${crypto.tokenId}`}
          className={styles.container_data}
        >
          <td>
            <div className={styles.row}>
              <div className={styles.container_data_image}>
                <Image
                  src={crypto.tokenImage}
                  alt={crypto.tokenName}
                  layout="fill"
                />
              </div>
              {crypto.tokenName}
            </div>
          </td>
          <td>
            <CountUp start={0} end={crypto.balance} decimals={4} duration={2} />
          </td>
          <td>
            <CountUp start={0} end={crypto.apy} decimals={1} duration={2} />%
          </td>
          <td className={styles.container_actionables}>
            <button type="button" onClick={() => {}}>
              Withdraw
            </button>
            <button type="button" onClick={() => {}}>
              Deposit
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default StakingTable;
