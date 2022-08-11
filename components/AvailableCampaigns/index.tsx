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
  const { data } = {
    data: {
      campaigns: [
        {
          id:'0x2b29be18131941c2a1e1aba072f917e30d7b45ecc937f22d2249ee32e2f74632',
          _campaignAddress: '0xc693b9ec6aaeed78a793024c4b6ffa1ffc470bf2',
          _campaignId:1
        }
      ]
    }
  }

  // useEffect(
  //   () => {
  //     if( data ){
  //       const campaignIds = data.campaigns.map((campaign:any) => campaign._campaignId)
  //       console.log(campaignIds)
  //       if (campaignIds.length) {
  //         fetchCampaigns(campaignIds);
  //       }
  //     }
  //   }, [data])

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
          {data.campaigns.map((campaign) => (
            <li key={campaign._campaignId}>
              <CampaignCard data={campaign} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailableCampaigns;
