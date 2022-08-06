import styles from "./index.module.scss";
import Link from "next/link";
import CountUp from "react-countup";

const CampaignCard = ({ data }: { data: any }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>{data.title}</h3>
        <div className={styles.main_info}>
          <p>
            Backers:
            <CountUp start={0} end={data.backers} decimals={0} duration={2} />
          </p>
          <span></span>
          <p>
            Target Amount:
            <CountUp
              start={0}
              end={data.targetAmount}
              decimals={0}
              duration={2}
            />
          </p>
          <span></span>
          <p>
            Raised Amount:
            <CountUp
              start={0}
              end={data.raisedAmount}
              decimals={0}
              duration={2}
            />
          </p>
        </div>
      </div>
      <Link href={`/campaign/${data.campaignId}`} passHref>
        <button type="button" className={styles.button}>
          Donate
        </button>
      </Link>
    </div>
  );
};

export default CampaignCard;
