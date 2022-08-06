const envConfig = {
  MAINNET: process.env.NEXT_PUBLIC_MAINNET === "true" ? true : false,
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
  CONTRACT_DEPLOYED:
    process.env.NEXT_PUBLIC_CONTRACT_DEPLOYED === "true" ? true : false,
  CONTRACT_NAME: process.env.NEXT_PUBLIC_CONTRACT_NAME || "",
  ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID || "",
  WEB3_STORAGE_TOKEN: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || "",
};

export default envConfig;
