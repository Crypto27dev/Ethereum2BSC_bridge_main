"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import erc20ABI from "../../utils/erc20.json";

import Container from "@/components/Container";
import Image from "next/image";
import SquideGrow from "@/assets/images/brioge.png";
import multiChain from "@/assets/images/multichain.svg";
import heroImg from "@/assets/images/hero.png";

import { customToastMessage, customWiteToast } from "@/utils/whitelist";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { ConnectWalletBtn, NavButton } from "components/Button.jsx";

import { useEthersSigner } from "../../components/wagmi/provider";

const Support = () => {
  const [balance, setBalance] = useState("0");
  const [hash, setHash] = useState("");
  const [success, setSuccess] = useState("");
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const providerEth = new ethers.providers.JsonRpcProvider(
    "https://billowing-billowing-wind.quiknode.pro/2232643a6f244d96227b6987ab833ecd1ed7ce2a/"
  );

  const providerBSC = new ethers.providers.JsonRpcProvider(
    "https://rough-neat-resonance.bsc.quiknode.pro/14efd2ee86a7d13a8e706c752209c51749a14165/"
  );

  const { data } = useBalance({
    address: isConnected ? address : null,
  });

  const signer = useEthersSigner();

  useEffect(() => {
    getTokenBalance();
  }, [isConnected, chain]);

  const anySquidGrowETH = "0xAf5e31e1E4e1004722c63e61C2e477C148C229B1"; //token
  const anySquidGrowBSC = "0x0a81d2E65acEb02f36FA6CD68DCd25fb786273c9"; //token

  const bscDecimals = 9;
  const ethDecimals = 9;

  const anyswapABI = ["function withdraw(uint amount) external returns (uint)"];
  const isInvalidInput = parseInt(balance.toString()) > 0 ? false : true;

  const handleWithdraw = async () => {
    try {
      if (chain?.id == 56) {
        const bridgeContract = new ethers.Contract(
          anySquidGrowBSC,
          anyswapABI,
          signer
        );
        const amount = balance;

        const tx = await bridgeContract.withdraw(amount);

        customWiteToast(tx, "Withdrawing", 56);
        setInputValue(0);
        getTokenBalance();
        return tx;
      } else {
        const bridgeContract = new ethers.Contract(
          anySquidGrowETH,
          anyswapABI,
          signer
        );
        const amount = balance;
        const tx = await bridgeContract.withdraw(amount);

        customWiteToast(tx, "Withdrawing", 1);

        return tx;
      }
    } catch (err) {
      console.log("ERROR:", err);

      if (err) {
        err = err.toString();
        console.log("ERROR:", err);
        if (err.includes("insufficient funds")) {
          customToastMessage("Error: Insufficient Funds");
        } else if (err.includes("user rejected transaction")) {
          customToastMessage("Error: User Rejected Transaction");
        } else if (err.includes("user rejected transaction")) {
          customToastMessage("Error: Check your Inputs");
        } else if (err.includes("Error: call revert exception")) {
          customToastMessage("Error: Something went wrong");
        }
      }
    }
  };

  // const formatted = parseFloat(
  //   ethers.utils.formatUnits(balance, bscDecimals)
  // ).toFixed(0);

  const getTokenBalance = async () => {
    if (!address) {
      setBalance("0");
      return;
    }

    if (chain.id == 56) {
      const squidgrow = new ethers.Contract(
        anySquidGrowBSC,
        erc20ABI,
        providerBSC
      );
      const balance = await squidgrow.balanceOf(address);

      setBalance(balance);
    } else {
      console.log("anySquidGrowETH");
      const squidgrow = new ethers.Contract(
        anySquidGrowETH,
        erc20ABI,
        providerEth
      );
      const balance = await squidgrow.balanceOf(address);
      setBalance(balance);
    }
  };

  const pushTransaction = async (hash) => {
    try {
      console.log("hash", hash);
      await fetch(
        `https://scanapi.multichain.org/v2/reswaptxns?hash=${hash}&srcChainID=56&destChainID=1`
      )
        .then((res) => res.json())
        .then(async (res) => {
          console.log(res);
        });
      await fetch(
        `https://scanapi.multichain.org/v2/reswaptxns?hash=${hash}&srcChainID=1&destChainID=56`
      )
        .then((res) => res.json())
        .then(async (res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log("invalid", isInvalidInput);
  console.log("balance", balance);
  return (
    <Container>
      <section className="  py-16 grid lg:grid-cols-12 gap-14" id="home">
        <div className=" overflow-hidden lg:col-span-5 h-[540px] md:h-[697px] border-[.5px] px-4 lg:px-6 py-5 lg:py-10  border-[#D9D9D9] relative rounded-2xl bg-extraDarkLight">
          <div className=" h-full space-y-4">
            <Image
              className=" w-full max-w-[270px]"
              src={SquideGrow}
              alt="squideGrow"
            />
            <p className=" text-lg">
              If you received anySquidGrow Tokens that may be caused by a glitch
              or not enough liquidity in the bridge. Don't worry, your squidgrow
              are safe.
            </p>
            <p className=" text-lg">
              Connect your wallet and press the button below to claim your
              squidgrow.
            </p>
            <div className="  absolute w-full top-[78%]   left-0 right-0 ">
              {isConnected && signer ? (
                <ConnectWalletBtn
                  disabled={isInvalidInput}
                  onClick={async () => {
                    await handleWithdraw();
                  }}
                  title={isInvalidInput ? "Nothing to Claim" : "Claim"}
                />
              ) : (
                <NavButton isActive={true} />
              )}

              <div className=" flex justify-center gap-2 pt-5 items-center">
                <span className=" text-lg text-[#57585A]">
                  Powered By Multichain
                </span>
                <Image src={multiChain} alt="multichain" />
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:col-span-6">
          <div>
            <Image
              className=" w-full max-w-xs block mx-auto"
              src={heroImg}
              alt="hero_iamge"
            />
          </div>
          <div className=" pt-14">
            <p className=" text-lg text-white">Didn’t receive your tokens?</p>
            <p className=" pt-6 text-base  lg:pl-4 pl-0">
              Don't worry, your squidgrow are safe. Just enter your transaction
              hash and it will manually push any stuck transactions
            </p>
            <div className=" lg:pl-4 pl-0 pt-5 flex flex-col lg:flex-row lg:items-center gap-4">
              <input
                value={hash}
                type="text"
                className=" w-full text-base text-[#746E6E] placeholder:text-[#746E6E] py-3 px-2 bg-transparent f focus:outline-none outline-none focus:border-[0.5px] border-[0.5px] border-[#2A2A2A] rounded"
                name=""
                placeholder="0x32432...."
                id=""
                onChange={(event) => {
                  const input = event.target.value;
                  setHash(input);
                }}
              />
              <button
                onClick={async () => {
                  if (hash.length > 65) {
                    await pushTransaction(hash);
                    setHash("");
                    setSuccess("Transaction Pushed Successfull");
                  }
                }}
                className="s w-full lg:w-auto bg-[#CF0046] font-normal py-2.5 px-5 text-lg rounded text-white "
              >
                Push
              </button>
            </div>
            <p className=" pt-10 text-base  lg:pl-4 pl-0">{success}</p>
            <p className=" pt-10 text-base  lg:pl-4 pl-0">
              Due to the unpredictable glitches on different blockchain networks
              and the decentralized nature of the bridge, you sometimes will
              need to manually push your transaction through.{" "}
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Support;
