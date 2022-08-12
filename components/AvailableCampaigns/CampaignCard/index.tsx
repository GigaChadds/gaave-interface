import styles from "./index.module.scss";
import Link from "next/link";
import CountUp from "react-countup";
import useFetchCampaign from "../../../hooks/useFetchCampaign";
import { useEffect, useState } from "react";

const CampaignCard = ({ data }: { data: any }) => {
  const { loading: fetchingCampaigns, fetchData } = useFetchCampaign(
    data.campaignId
      ? data.campaignId
      : "0xc693b9ec6aaeed78a793024c4b6ffa1ffc470bf2"
  );
  const [campaignYield, setCampaignYield] = useState(0);
  const fetchCampaigns = async () => {
    const output = await fetchData();
    if (output && output.data) {
      setCampaignYield(output.data as any);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>{data.title ? data.title : "Test Campaign"}</h3>
        <div className={styles.main_info}>
          <p>
            Backers:
            <CountUp start={0} end={data.backers} decimals={0} duration={2} />
          </p>
          <span></span>
          <p>
            {/* 1 */}
            Target Amount:
            <CountUp
              start={0}
              end={data.targetAmount ? data.targetAmount : 100}
              decimals={0}
              duration={2}
            />
          </p>
          <span></span>
          <p>
            {/* calculateYield */}
            Raised Amount:
            <CountUp
              start={0}
              end={+campaignYield.toString()}
              decimals={0}
              duration={2}
            />
          </p>
        </div>
      </div>
      <Link href={`/campaign/${data._campaignId}`} passHref>
        <button type="button" className={styles.button}>
          Donate
        </button>
      </Link>
    </div>
  );
};

export default CampaignCard;
