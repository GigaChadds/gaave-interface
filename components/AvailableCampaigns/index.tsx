import styles from "./index.module.scss";
import Link from "next/link";
import CampaignCard from "./CampaignCard";
import { useQuery } from "@apollo/client";
import QUERY_CAMPAIGNS from "./campaign.graphql";
import { useEffect, useState } from "react";
import useFetchCampaign from "../../hooks/useFetchCampaign";

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
  const { data, loading } = useQuery(QUERY_CAMPAIGNS, {
    context: { clientName: "gaave" },
  });
  const [campaigns, setCampaigns] = useState<any[]>([])
  const { loading: fetchingCampaigns, fetchData } = useFetchCampaign();
  const fetchCampaigns = async (campaignId: number[]) => {
    const output = campaignId.map(async (id) => await fetchData(id));
    const awaited_output = await Promise.all(output);
    setCampaigns(awaited_output)
    // TODO: format data further
  };

  useEffect(
    () => {
      if( data ){
        const campaignIds = data.campaigns.map((campaign:any) => campaign._campaignId)
        if (campaignIds.length) {
          fetchCampaigns(campaignIds);
        }
      }
    }, [data])

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
          {campaigns.map((campaign) => (
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
