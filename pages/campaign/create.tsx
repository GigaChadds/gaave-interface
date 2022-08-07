import { useContext, useState } from "react";
import Button from "../../components/Button";
import CampaignForm from "../../components/CampaignForm";
import { CampaignContext } from "../../context/campaignContext";
import styles from "../../styles/Campaign.module.scss";
import { uploadToIpfs } from "../../utils/api";

const CreateCampaignPage = () => {
  const { appState: CampaignFormState } = useContext(CampaignContext);
  const [error, setError] = useState<string>("");

  const uploadBadgeToIPFS = async (file: File) => {
    return await uploadToIpfs(file);
  };

  const handleSubmit = async () => {
    if (!CampaignFormState.tnc) {
      setError("Please check to agree Gaave's Terms and Conditions.");
    }

    console.log(CampaignFormState);
    if (CampaignFormState.badge1) {
      await uploadBadgeToIPFS(CampaignFormState.badge1);
    }

    if (CampaignFormState.badge2) {
      await uploadBadgeToIPFS(CampaignFormState.badge2);
    }

    if (CampaignFormState.badge3) {
      await uploadBadgeToIPFS(CampaignFormState.badge3);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Create Campaign</h2>
        <CampaignForm />
        {error && <span className={styles.error}>{error}</span>}
        <div className={styles.submit}>
          <Button
            text="Submit"
            handleClick={() => handleSubmit()}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignPage;
