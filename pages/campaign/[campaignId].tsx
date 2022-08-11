import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Meta from "../../components/Meta";
import ProgressBar from "../../components/ProgressBar";
import StakingTable from "../../components/StakingTable";
import useMintBadge from "../../hooks/useMintBadge";
import styles from "../../styles/Campaign.module.scss";
import { useRouter } from "next/router";
import useClaimYield from "../../hooks/useClaimYield";
import useFetchCampaign from "../../hooks/useFetchCampaign";

const mockCampaignData = {
  organization: "GEN3 Studios",
  contactPersonEmail: "contact.gen3.pro",
  title: "Raise $100 funds for drought in XXX city",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

const CampaignPage = () => {
  const [campaignData, setCampaignData] = useState<any>(mockCampaignData);
  const { address } = useAccount();
  const router = useRouter();
  const { campaignId } = router.query;

  const {
    write,
    prepareOverridesArgs,
  } = useMintBadge();

  const claimBadge = async () => {
    const overridesArgs = await prepareOverridesArgs(
      campaignId as unknown as number,
      address!!
    );
    if (write) {
      write({
        recklesslySetUnpreparedArgs: campaignId,
        recklesslySetUnpreparedOverrides: overridesArgs,
      });
    }
  };
  const { fetchData } = useFetchCampaign(typeof campaignId === 'string' || campaignId instanceof String ?campaignId as string:'0xc693b9ec6aaeed78a793024c4b6ffa1ffc470bf2');
  const [campaignYield, setCampaignYield] = useState(0)
  const fetchCampaigns = async () => {
    const output = await fetchData()
    setCampaignYield(output.data as any)
  };

  useEffect(() => {
    fetchCampaigns()
  }, [campaignId]);

  return (
    <div className={styles.container}>
      <Meta />
      <div className={styles.main}>
        <h2>{campaignData.title}</h2>
        <ProgressBar
          maxValue={campaignData.targetAmount?campaignData.targetAmount:100}
          currentValue={campaignYield?+campaignYield.toString(): 0}
        />
        <p>{campaignData.description}</p>
        <p className={styles.main_poc}>
          Created by {campaignData.organization}. Contact via{" "}
          {campaignData.contactPersonEmail}
        </p>

        <div className={styles.others}>
          <div>
            <p>You are eligible to claim for your milestone NFT!</p>
            <button onClick={claimBadge}>Claim</button>
          </div>
          <div>
            <p>You have outstanding yield to claim</p>
            {/* <button>Claim</button> */}
          </div>
        </div>
        <StakingTable campaignId={campaignId as unknown as number} />
      </div>
    </div>
  );
};

export default CampaignPage;
