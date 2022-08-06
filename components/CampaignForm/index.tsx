import { useEffect, useState } from "react";
import Button from "../Button";
import styles from "./index.module.scss";

interface ICampaign {
  organization: string;
  contactPersonEmail: string;
  title: string;
  description: string;
  amount: number;
}

const defaultCampaignData = {
  organization: "",
  contactPersonEmail: "",
  title: "",
  description: "",
  amount: 0,
};

const CampaignForm = () => {
  const [campaignDetails, setCampaignDetails] =
    useState<ICampaign>(defaultCampaignData);
  const [agreedToTnc, setAgreedToTnc] = useState<boolean>(false);

  const handleChange = (field: string, value: string | number) => {
    setCampaignDetails({
      ...campaignDetails,
      [field]: value,
    });
  };

  return (
    <form className={styles.container}>
      <label>Organization:</label>
      <input
        type="text"
        name="organization"
        value={campaignDetails.organization}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />

      <label>Contact Person Email:</label>
      <input
        type="email"
        name="contactPersonEmail"
        value={campaignDetails.contactPersonEmail}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />

      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={campaignDetails.title}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />

      <label>Description:</label>
      <textarea
        rows={10}
        name="description"
        value={campaignDetails.description}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />

      <label>Requesting Amount (USD):</label>
      <input
        type="number"
        name="amount"
        value={campaignDetails.amount}
        onChange={(e) =>
          handleChange(e.target.name, e.target.value as unknown as number)
        }
      />

      <div className={styles.tnc}>
        <input
          type="checkbox"
          value="agreed"
          checked={agreedToTnc}
          onChange={() => setAgreedToTnc((prevState) => !prevState)}
        />
        <label>
          (Mandatory) By checking this, you agree to Gaave&apos;s Terms and
          Conditions.
        </label>
      </div>

      <div className={styles.submit}>
        <Button
          text="Submit"
          handleClick={() => console.log({ ...campaignDetails, agreedToTnc })}
          loading={false}
        />
      </div>
    </form>
  );
};

export default CampaignForm;
