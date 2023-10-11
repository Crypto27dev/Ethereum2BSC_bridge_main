"use client";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import MobileMenu from "@/components/navbar/MobileMenu";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import TrustIcon from "../assets/images/trust1.png";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  okxWallet,
  metaMaskWallet,
  walletConnectWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";

//testing
import { goerli, bscTestnet } from "wagmi/chains";
//end

import { mainnet, bsc } from "wagmi/chains";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Montserrat({
  weight: ["400", "500", "600", "700", "800", "900"],
  preload: false,
});

export default function RootLayout({ children }) {
  const { chains, publicClient } = configureChains(
    [goerli, bscTestnet],
    [
      alchemyProvider({ apiKey: "v37oDada1f3KfgDuTCcd4wJ_NpiUNdbp" }),
      publicProvider(),
    ]
  );

  const projectId = "3c06aa3fd27e31c9215e734ce4ec719c";
  const trustWallet = injectedWallet({ chains });
  trustWallet.iconUrl = `/trust.svg`;
  trustWallet.name = "Trust Wallet";
  trustWallet.shortName = "Trust Wallet";
  trustWallet.id = "trust";
  //deploy
  const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains }),
        trustWallet,
        okxWallet({
          projectId,
          chains,
        }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            theme={darkTheme()}
            modalSize="compact"
            chains={chains}
          >
            <Navbar />
            <MobileMenu />
            {children}
          </RainbowKitProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick={false}
            pauseOnHover={false}
            limit={3}
          />
        </WagmiConfig>
      </body>
    </html>
  );
}
