import type { NextPage } from "next";

import Meta from "../components/Meta";
import styles from "../styles/Main.module.scss";

import { useAccount } from "wagmi";
import useCheckNetwork from "../hooks/useCheckNetwork";
import AvailableCampaigns from "../components/AvailableCampaigns";
import CurrentBadges from "../components/CurrentBadges";
import UnclaimedYield from "../components/UnclaimedYield";

const Index: NextPage = () => {
  const { address } = useAccount();
  const { rightNetwork, error: networkError } = useCheckNetwork();

  return (
    <div className={styles.container}>
      <Meta />
      <div className={styles.main}>
        <div className={styles.main_left}>
          <div className={styles.main_left_sub}>
            <CurrentBadges />
          </div>
          <div className={styles.main_left_sub}>
            <UnclaimedYield />
          </div>
        </div>

        <div className={styles.avail_campaign}>
          <AvailableCampaigns />
        </div>
      </div>
    </div>
  );
};

export default Index;
