import { useContext, useState } from "react";
import { useContract, useProvider } from "wagmi";
import Button from "../../components/Button";
import CampaignForm from "../../components/CampaignForm";
import Meta from "../../components/Meta";
import { CampaignContext } from "../../context/campaignContext";
import styles from "../../styles/Campaign.module.scss";
import { uploadToIpfs } from "../../utils/api";
import { getWagmiContractParams } from "../../utils/contracts";

const CreateCampaignPage = () => {
  const { appState: CampaignFormState } = useContext(CampaignContext);
  const [error, setError] = useState<string>("");

  const contractParams = getWagmiContractParams();
  const provider = useProvider();
  const contract = useContract({
    ...contractParams,
    signerOrProvider: provider,
  });


  const uploadBadgeToIPFS = async (file: File) => {
    return await uploadToIpfs(file);
  };

  const handleSubmit = async () => {
    contract.deployPool("0x1694339b9E81287f8E9B65dAD6c38Eb707dc2070")
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
      <Meta />
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
