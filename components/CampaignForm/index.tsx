import { useContext, useState } from "react";
import styles from "./index.module.scss";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { CampaignContext } from "../../context/campaignContext";
import {
  SET_CAMPAIGN_FORM_AMOUNT,
  SET_CAMPAIGN_FORM_DESCRIPTION,
  SET_CAMPAIGN_FORM_EMAIL,
  SET_CAMPAIGN_FORM_ORGRANIZATION,
  SET_CAMPAIGN_FORM_TITLE,
  SET_CAMPAIGN_FORM_TNC,
  SET_CAMPAIGN_FORM_BADGE1,
  SET_CAMPAIGN_FORM_BADGE2,
} from "../../context/actionType";
import { BiInfoCircle } from "react-icons/bi";
import ReactTooltip from "react-tooltip";

const CampaignForm = () => {
  const { appState: CampaignFormState, appDispatch: CampaignFormDispatch } =
    useContext(CampaignContext);
  const [badge1, setBadge1] = useState<any>();
  const [badge2, setBadge2] = useState<any>();

  const displayImageFromFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    return <Image src={objectUrl} alt={`${file.name}`} layout="fill" />;
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.container}>
        <label>Organization:</label>
        <input
          type="text"
          name="organization"
          value={CampaignFormState.organization}
          onChange={(e) =>
            CampaignFormDispatch({
              type: SET_CAMPAIGN_FORM_ORGRANIZATION,
              value: e.target.value,
            })
          }
        />

        <label>Contact Person Email:</label>
        <input
          type="email"
          name="contactPersonEmail"
          value={CampaignFormState.contactPersonEmail}
          onChange={(e) =>
            CampaignFormDispatch({
              type: SET_CAMPAIGN_FORM_EMAIL,
              value: e.target.value,
            })
          }
        />

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={CampaignFormState.title}
          onChange={(e) =>
            CampaignFormDispatch({
              type: SET_CAMPAIGN_FORM_TITLE,
              value: e.target.value,
            })
          }
        />

        <label>Description:</label>
        <textarea
          rows={10}
          name="description"
          value={CampaignFormState.description}
          onChange={(e) =>
            CampaignFormDispatch({
              type: SET_CAMPAIGN_FORM_DESCRIPTION,
              value: e.target.value,
            })
          }
        />

        <label>Requesting Amount (USD):</label>
        <input
          type="number"
          name="amount"
          value={CampaignFormState.amount}
          onChange={(e) =>
            CampaignFormDispatch({
              type: SET_CAMPAIGN_FORM_AMOUNT,
              value: e.target.value as unknown as number,
            })
          }
        />

        <div className={styles.tnc}>
          <input
            type="checkbox"
            value="agreed"
            checked={CampaignFormState.tnc}
            onChange={() =>
              CampaignFormDispatch({
                type: SET_CAMPAIGN_FORM_TNC,
                value: !CampaignFormState.tnc,
              })
            }
          />
          <label>
            (Mandatory) By checking this, you agree to Gaave&apos;s Terms and
            Conditions.
          </label>
        </div>
      </form>

      <form className={styles.container}>
        <label>
          Upload Badge 1 Image:{" "}
          <BiInfoCircle
            size={20}
            color="black"
            data-tip="1% of target amount X 2 days"
          />
        </label>
        <ReactTooltip place="top" type="light" effect="float" />
        {badge1 && (
          <div className={styles.previewImage}>
            {displayImageFromFile(badge1)}
          </div>
        )}
        <Dropzone
          onDrop={(acceptedFiles) => {
            setBadge1(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )[0]
            );
            CampaignFormDispatch({
              type: SET_CAMPAIGN_FORM_BADGE1,
              value: acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )[0],
            });
          }}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <span className={styles.dropzone_text}>
                Drop Badge 1 image here, or click to select file
              </span>
            </div>
          )}
        </Dropzone>
        <label>
          Upload Badge 2 Image:{" "}
          <BiInfoCircle
            size={20}
            color="black"
            data-tip="3% of target amount X 3 days"
          />
        </label>
        <ReactTooltip place="top" type="light" effect="float" />
        {badge2 && (
          <div className={styles.previewImage}>
            {displayImageFromFile(badge2)}
          </div>
        )}
        <Dropzone
          onDrop={(acceptedFiles) => {
            setBadge2(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )[0]
            );
            CampaignFormDispatch({
              type: SET_CAMPAIGN_FORM_BADGE2,
              value: acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )[0],
            });
          }}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <span className={styles.dropzone_text}>
                Drop Badge 2 image here, or click to select file
              </span>
            </div>
          )}
        </Dropzone>
      </form>
    </div>
  );
};

export default CampaignForm;
