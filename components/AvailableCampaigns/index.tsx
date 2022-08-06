import styles from "./index.module.scss";
import Link from "next/link";
import CampaignCard from "./CampaignCard";

const listOfCampaigns = [
  {
    campaignId: 1,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
  {
    campaignId: 2,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
  {
    campaignId: 3,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
  {
    campaignId: 4,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
  {
    campaignId: 5,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
  {
    campaignId: 6,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
  {
    campaignId: 7,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
  {
    campaignId: 8,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
  {
    campaignId: 9,
    title: "Relief for Ukraine",
    backers: 100,
    targetAmount: 500_000,
    raisedAmount: 200_000,
  },
];

const AvailableCampaigns = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.main_header}>
          <h2>Available Campaigns</h2>
          <Link href={"/campaign/create"} passHref>
            <button type="button" className={styles.button}>
              Create
            </button>
          </Link>
        </div>

        <ul className={styles.content}>
          {listOfCampaigns.map((campaign) => (
            <li key={campaign.campaignId}>
              <CampaignCard data={campaign} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailableCampaigns;
