import axios from "axios";
import envConfig from "./envConfig";

let apiUrl = "https://api.web3.storage/upload";

const config = {
  headers: {
    Authorization: `Bearer ${envConfig.WEB3_STORAGE_TOKEN}`,
    "Content-Type": "application/json",
  },
};

export const uploadToIpfs = async (file: File): Promise<string> => {
  try {
    const response = await axios.post(`${apiUrl}`, file, config);
    return response.data.cid;
  } catch (error) {
    return "";
  }
};

// const ipfsCid = await uploadToIpfs(
//   new File(
//     [Buffer.from(MarkdownState.markdown)],
//     `${randomstring.generate(5)}.json`
//   )
// );
