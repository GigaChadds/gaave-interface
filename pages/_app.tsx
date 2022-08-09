import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import envConfig from "../utils/envConfig";
import CampaignContextProvider from "../context/campaignContext";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const aave = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-polygon-mumbai'
});

const gaave = new HttpLink({
  uri: ''
});

const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "aave",
    aave,
    gaave
  ),
  cache: new InMemoryCache(),
});

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
      <ApolloProvider client={client}>
        <CampaignContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CampaignContextProvider>
      </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
