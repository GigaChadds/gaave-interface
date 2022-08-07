import { useState } from "react";
import Meta from "../../components/Meta";
import ProgressBar from "../../components/ProgressBar";
import StakingTable from "../../components/StakingTable";
import styles from "../../styles/Campaign.module.scss";

const mockCampaignData = {
  organization: "GEN3 Studios",
  contactPersonEmail: "contact.gen3.pro",
  title: "Raise $500,000 funds for drought in XXX city",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  targetAmount: 500_000,
  raisedAmount: 210_098,
};

const CampaignPage = () => {
  const [campaignData, setCampaignData] = useState<any>(mockCampaignData);

  return (
    <div className={styles.container}>
      <Meta />
      <div className={styles.main}>
        <h2>{campaignData.title}</h2>
        <ProgressBar
          maxValue={campaignData.targetAmount}
          currentValue={campaignData.raisedAmount}
        />
        <p>{campaignData.description}</p>
        <p className={styles.main_poc}>
          Created by {campaignData.organization}. Contact via{" "}
          {campaignData.contactPersonEmail}
        </p>

        <div className={styles.others}>
          <div>
            <p>You are eligible to claim for your milestone NFT!</p>
            <button>Claim</button>
          </div>
          <div>
            <p>You have outstanding yield to claim</p>
            <button>Claim</button>
          </div>
        </div>
        <StakingTable />
      </div>
    </div>
  );
};

export default CampaignPage;
