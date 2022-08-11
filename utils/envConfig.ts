const envConfig = {
  MAINNET: process.env.NEXT_PUBLIC_MAINNET === "true" ? true : false,
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
  BADGE_ADDRESS: process.env.BADGE_PUBLIC_CONTRACT_ADDRESS || "",
  BADGE_NAME: process.env.BADGE_PUBLIC_CONTRACT_NAME || "",
  CONTRACT_ADDRESS_BADGES:
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BADGES || "",
  CONTRACT_DEPLOYED:
    process.env.NEXT_PUBLIC_CONTRACT_DEPLOYED === "true" ? true : false,
  CONTRACT_NAME: process.env.NEXT_PUBLIC_CONTRACT_NAME || "",
  ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID || "",
  WEB3_STORAGE_TOKEN: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || "",
};

export default envConfig;
