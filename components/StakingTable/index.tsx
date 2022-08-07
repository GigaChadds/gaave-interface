import CountUp from "react-countup";
import styles from "./index.module.scss";
import USDCLogo from "../../public/assets/coins/usdc.svg";
import WETHLogo from "../../public/assets/coins/weth.svg";
import USDTLogo from "../../public/assets/coins/usdt.svg";
import WMaticLogo from "../../public/assets/coins/wmatic.svg";
import DaiLogo from "../../public/assets/coins/dai.svg";
import WBTCLogo from "../../public/assets/coins/wbtc.svg";
import AaveLogo from "../../public/assets/coins/aave.svg";
import Image from "next/image";
import { useQuery } from '@apollo/client';
import QUERY_RESERVES from './reserves.graphql';

const coinMap: {[key: string]: any} = {
  "DAI": DaiLogo,
  "USDC": USDCLogo,
  'USDT': USDTLogo,
  'WBTC': WBTCLogo,
  'AAVE': AaveLogo,
  'WETH': WETHLogo,
  'Wrapped Matic': WMaticLogo
}

const StakingTable = () => {
  const { data } = useQuery(QUERY_RESERVES);
  return (
    <table className={styles.container}>
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
                {coinMap[crypto.name] && <Image
                  src={coinMap[crypto.name]}
                  alt={crypto.name}
                  layout="fill"
                />}
              </div>
              {crypto.name}
            </div>
          </td>
          <td>
            <CountUp start={0} end={crypto.balance} decimals={4} duration={2} />
          </td>
          <td>
            <CountUp start={0} end={crypto.liquidityRate/Math.pow(10,27)} decimals={2} duration={2} />%
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
