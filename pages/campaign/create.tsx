import CampaignForm from "../../components/CampaignForm";
import styles from "../../styles/Campaign.module.scss";

const CreateCampaignPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Create Campaign</h2>
        <CampaignForm />
      </div>
    </div>
  );
};

export default CreateCampaignPage;
