import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import envConfig from "../utils/envConfig";
import CampaignContextProvider from "../context/campaignContext";

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Gaave",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        initialChain={envConfig.MAINNET ? chain.polygon : chain.polygonMumbai}
        coolMode
      >
        <CampaignContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CampaignContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
