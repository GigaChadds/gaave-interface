import { useState } from "react";
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

        <StakingTable />
      </div>
    </div>
  );
};

export default CampaignPage;
