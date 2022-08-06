import styles from "./index.module.scss";
import Link from "next/link";

const BadgeRow = ({ data }: { data: any }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <p>{data.title}</p>
        <Link href={`/campaign/${data.campaignId}`} passHref>
          <button type="button" className={styles.button}>
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BadgeRow;
