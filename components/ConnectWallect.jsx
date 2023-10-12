"use client";
import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import briogeLogo from "../assets/images/brioge.png";
import logo from "../assets/images/SRLOGO.svg";
import eth2 from "../assets/images/eth.svg";
import ehtIcon from "../assets/images/etherium.svg";
import multiChain from "../assets/images/multichain.svg";
import ILOABI from "../utils/ILO.json";
import erc20ABI from "../utils/erc20.json";
import AnySwapRouter from "../utils/AnyswapV6Router.json";
import OFTABI from "../utils/OFT.json";
import { useEthersSigner } from "./wagmi/provider";

import { ethers } from "ethers";
import Image from "next/image";
import { ConnectWalletBtn, NavButton } from "./Button";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { customToastMessage, customWiteToast } from "@/utils/whitelist";
//deploy
const commaNumber = require("comma-number");
// const bridgeABI = [
//   "function anySwapOutUnderlying(address token, address to, uint amount, uint toChainID) external",
// ];

const ConnectWallect = () => {
  const [isBSC, setIsBSC] = useState(false);
  const [chainId, setChainID] = useState(false);
  const [currentFee, setCurrentFee] = useState(0);
  const [currentMin, setCurrentMin] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState("0");
  const [bridgeBalance, setBridgeBalance] = useState("0");

  const [calculatedFee, setCalculatedFee] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const [allowance, setAllowance] = useState(0);
  const { chain } = useNetwork();

  // const providerEth = new ethers.providers.JsonRpcProvider(
  //   "https://billowing-billowing-wind.quiknode.pro/2232643a6f244d96227b6987ab833ecd1ed7ce2a/"
  // );
  // const providerBSC = new ethers.providers.JsonRpcProvider(
  //   "https://rough-neat-resonance.bsc.quiknode.pro/14efd2ee86a7d13a8e706c752209c51749a14165/"
  // );

  const providerEth = new ethers.providers.JsonRpcProvider(
    "https://ethereum-goerli.publicnode.com"
  );
  const providerBSC = new ethers.providers.JsonRpcProvider(
    "https://bsc-testnet.publicnode.com"
  );

  // const anySquidGrowETH = "0xAf5e31e1E4e1004722c63e61C2e477C148C229B1"; //token
  // const anySquidGrowBSC = "0x0a81d2E65acEb02f36FA6CD68DCd25fb786273c9"; //token
  // const bscTokenAddress = "0x88479186BAC914E4313389a64881F5ed0153C765"; //SquidGrow token contract address on BSC
  // const ethTokenAddress = "0xd8Fa690304D2B2824D918C0c7376e2823704557A"; //SquidGrow token contract address on ETH
  const bscSquidTokenAddress = "0xf76CDF61E4845C2f7A45d50722684E08E6976806"; //SquidGrow token contract address on BSC
  const ethSquidTokenAddress = "0x159c4D116C1FFC7DdB5b293d33Bb0561eA26F77F"; //SquidGrow token contract address on ETH
  const bscDecimals = 9;
  const ethDecimals = 19;
  // const anyswapETH = "0xf0457c4c99732b716e40d456acb3fc83c699b8ba";
  // const anyswapBSC = "0x58892974758A4013377A45fad698D2FF1F08d98E";
  const minAmountBSC = 99;
  const minAmountETH = 99;
  const feeBSC = 10;
  const feeETH = 10;
  // const minAmountBSC = 4827652795;
  // const minAmountETH = 965530559;
  // const feeBSC = 3862122236;
  // const feeETH = 482765279;
  // const bscChainId = 56;
  // const ethChainId = 1;
  const bscChainId = 97;
  const ethChainId = 5;
  // const bridgeStdAmount = 1000000000000;
  const bridgeStdAmount = 0;

  // Layerzero OFT contract.
  const oftWrapSquidGrowETH = "0xeF9D26B10df9cFBE0dd6b113f69ADEe7ef4c1542"; // wrap token on ETH
  const oftWrapSquidGrowBSC = "0x10a8827634Bea7d38A5a673d1819DBc82f3C2dF5"; // wrao token on BSC

  const { data } = useBalance({
    address: isConnected ? address : null,
  });

  useEffect(() => {
    getBridgeBalance();
  }, []);

  useEffect(() => {
    setIsWalletConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    setChainID(chain?.id);
    console.log('Bridge Balance is:', getBridgeBalance());
    getBridgeBalance();

    if (chain?.id == bscChainId) {
      setCurrentFee(feeBSC);
      setCurrentMin(minAmountBSC);
    } else {
      setCurrentFee(feeETH);
      setCurrentMin(minAmountETH);
    }
  }, [chain?.id]);

  const signer = useEthersSigner();

  const handleApprove = async (inputValue) => {
    try {
      if (chain.id == bscChainId || chainId == bscChainId) {
        const squidgrow = new ethers.Contract(
          bscSquidTokenAddress,
          erc20ABI,
          signer
        );
        const tx = await squidgrow.approve(
          oftWrapSquidGrowBSC,
          ethers.utils.parseUnits(inputValue.toString(), bscDecimals) 
        );
        customWiteToast(tx, "Approving", bscChainId);
        await tx.wait();
        fetchApproval();
        return tx;
      } else {
        const squidgrow = new ethers.Contract(
          ethSquidTokenAddress,
          erc20ABI,
          signer
        );
        const tx = await squidgrow.approve(
          oftWrapSquidGrowETH,
          ethers.utils.parseUnits(inputValue.toString(), ethDecimals)
        );
        customWiteToast(tx, "Approving", ethChainId);
        await tx.wait();
        fetchApproval();
        return tx;
      }
    } catch (err) {
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
  };

  const handleSwitchChain = async () => {
    try {
      if (window.ethereum) {
        const newChainId = chainId == bscChainId ? ethChainId : bscChainId;
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${newChainId.toString(16)}` }],
        });

        setChainID(newChainId);
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to switch chain:", error);
    }
  };

  const fetchApproval = async () => {
    if (!address) {
      setAllowance("0");
      return;
    }
    if (chain.id == bscChainId) {
      const squidgrow = new ethers.Contract(
        bscSquidTokenAddress,
        erc20ABI,
        providerBSC
      );
      const allowance = await squidgrow.allowance(address, oftWrapSquidGrowBSC);
      const allowanceFormatted = parseFloat(
        ethers.utils.formatUnits(allowance, bscDecimals)
      );

      setAllowance(parseFloat(allowanceFormatted));
    } else {
      const squidgrow = new ethers.Contract(
        ethSquidTokenAddress,
        erc20ABI,
        providerEth
      );
      const allowance = await squidgrow.allowance(address, oftWrapSquidGrowETH);
      const allowanceFormatted = parseFloat(
        ethers.utils.formatUnits(allowance, ethDecimals)
      );

      setAllowance(parseFloat(allowanceFormatted));
    }
  };

  // const handlePercent = (percent) => {
  //   const newAmount = (balance * percent) / 100;
  //   setInputValue(commaNumber(newAmount));
  //   fetchApproval();
  // };

  const handleBridge = async (input) => {
    try {
      if (chain?.id == bscChainId) {
        const inputedAdjusted = parseFloat(input) - 1;
        // const ethRemoteChainId = 101;  //Ethereum chainId
        const ethRemoteChainId = 10121; // goerli chainId
        const oftWrapContract = new ethers.Contract(
          oftWrapSquidGrowBSC,
          OFTABI,
          signer
        );
        const amount = ethers.utils.parseUnits(
          inputedAdjusted.toString(),
          bscDecimals
          );  
        const adapterParams = ethers.utils.solidityPack([], []);

        // const estimatedGasLimit = await oftWrapContract.estimateGas.sendFrom(
        //   address,
        //   ethRemoteChainId,
        //   address,
        //   amount,
        //   address,
        //   "0x0000000000000000000000000000000000000000",
        //   adapterParams,
        //   {value: nativeFee}
        // );
        // const sendFromTxUnsigned = await oftWrapContract.populateTransaction.sendFrom(
        //   address,
        //   ethRemoteChainId,
        //   address,
        //   amount,
        //   address,
        //   "0x0000000000000000000000000000000000000000",
        //   adapterParams,
        //   {value: nativeFee}
        // );
        // sendFromTxUnsigned.chainId = ethChainId
        // sendFromTxUnsigned.gasLimit = estimatedGasLimit
        // sendFromTxUnsigned.gasPrice = await providerEth.getGasPrice()

        // const sendFromTxSigned = await signer.signTransaction(sendFromTxUnsigned)
        // const submittedTx = await providerEth.sendTransaction (sendFromTxSigned)
        // const tx = await submittedTx.wait ()
        
        const fees = await oftWrapContract.estimateSendFee(ethRemoteChainId, address, amount, false, adapterParams);
		    const nativeFee = Number(fees[0]);
        const tx = await oftWrapContract.sendFrom(
          address,
          ethRemoteChainId,
          address,
          amount,
          address,
          "0x0000000000000000000000000000000000000000",
          adapterParams,
          {value: nativeFee}
        );
        await tx.wait();

        // await fetch(
        //   `https://scanapi.multichain.org/v2/reswaptxns?hash=${tx.hash}&srcChainID=1&destChainID=56`
        // )
        //   .then((res) => res.json())
        //   .then(async (res) => {
        //     console.log(res);
        //   });
        customWiteToast(tx, "Bridging to ETH", ethChainId);
        setInputValue(0);
        getTokenBalance();
        return tx;
      } else {
        const inputedAdjusted = parseFloat(input) - 1;
        // const bscRemoteChainId = 102;
        const bscRemoteChainId = 10102;

        const oftWrapContract = new ethers.Contract(
          oftWrapSquidGrowETH,
          OFTABI,
          signer
        );
        const amount = ethers.utils.parseUnits(
          inputedAdjusted.toString(),
          ethDecimals
        );
        // const adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]);
        const adapterParams = ethers.utils.solidityPack([], []);
        
        const fees = await oftWrapContract.estimateSendFee(bscRemoteChainId, address, amount, false, adapterParams);
		    const nativeFee = Number(fees[0]);
        const tx = await oftWrapContract.sendFrom(
          address,
          bscRemoteChainId,
          address,
          amount,
          address,
          "0x0000000000000000000000000000000000000000",
          adapterParams,
          {value: nativeFee}
        );
        await tx.wait()

        // await fetch(
        //   `https://scanapi.multichain.org/v2/reswaptxns?hash=${tx.hash}&srcChainID=56&destChainID=1`
        // )
        //   .then((res) => res.json())
        //   .then(async (res) => {
        //     console.log(res);
        //   });

        customWiteToast(tx, "Bridging to BSC", bscChainId);
        setInputValue(0);
        getTokenBalance();
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

  const getBridgeBalance = async () => {
    if (chain?.id == bscChainId) {
      const squidgrow = new ethers.Contract(
        ethSquidTokenAddress,
        erc20ABI,
        providerEth
      );
      const balance = await squidgrow.balanceOf(oftWrapSquidGrowETH);
      const formatted = parseFloat(
        ethers.utils.formatUnits(balance, ethDecimals)
      ).toFixed(0);

      console.log("formatted", formatted);
      setBridgeBalance(formatted);
    } else {
      const squidgrow = new ethers.Contract(
        bscSquidTokenAddress,
        erc20ABI,
        providerBSC
      );
      const balance = await squidgrow.balanceOf(oftWrapSquidGrowBSC);
      const formatted = parseFloat(
        ethers.utils.formatUnits(balance, bscDecimals)
      ).toFixed(0);
      console.log("formatted bridge amount", formatted);

      setBridgeBalance(formatted);
    }
  };

  const getTokenBalance = async () => {
    if (!address) {
      setBalance("0");
      return;
    }
    if (chain.id == bscChainId) {
      const squidgrow = new ethers.Contract(
        bscSquidTokenAddress,
        erc20ABI,
        providerBSC
      );
      const balance = await squidgrow.balanceOf(address);
      const formatted = parseFloat(
        ethers.utils.formatUnits(balance, bscDecimals)
      ).toFixed(0);
      setBalance(formatted);
    } else {
      const squidgrow = new ethers.Contract(
        ethSquidTokenAddress,
        erc20ABI,
        providerEth
      );
      const balance = await squidgrow.balanceOf(address);
      const formatted = parseFloat(
        ethers.utils.formatUnits(balance, ethDecimals)
      ).toFixed(0);
      setBalance(formatted);
    }
  };
  //refactor
  useEffect(() => {
    if (isConnected) {
      if (data && data.formatted) {
        getTokenBalance();
        fetchApproval();
      }
    }
  }, [data]);

  const isValidInput = () => {
    if (!inputValue) return false;
    console.log('inputValue is:', inputValue);
    if (Number(inputValue) > balance || Number(inputValue) < 0) {
      return true;
    }

    if (inputValue > bridgeBalance - bridgeStdAmount) {
      return true;
    }

    if (chain?.id == bscChainId) {
      if (inputValue > minAmountBSC) {
        return false;
      }
      return true;
    } else {
      if (inputValue > minAmountETH) {
        return false;
      }
    }

    return true;
  };
  const isInvalidInput = isValidInput();

  return (
    <div className=" bg-secondary space-y-5 border px-6 py-6 border-[#D9D9D9] rounded-[16px]">
      <div className=" max-w-[160px] md:max-w-[270px]">
        <Image src={briogeLogo} alt="briogeLogo" />
      </div>
      <p className=" text-sm lg:text-lg ">
        Transfer SquidGrow Tokens between <br /> Ethereum and Binance Smart
        Chain.
      </p>
      <div>
        <div className="flex justify-between items-center ">
          <h3 className="text-lg pb-2">Token Balance:</h3>
          <p
            className="cursor-pointer lg:text-xl mr-3"
            onClick={() => {
              setInputValue(parseFloat(Math.floor(balance)?.toString()));
              let balanceFinal = 0;
              const current = balance - 0.01 * balance;

              if (current - currentFee > 0) {
                setCalculatedFee(current - currentFee);
              } else {
                setCalculatedFee(0);
              }
            }}
          >
            {commaNumber(balance)}
          </p>
        </div>

        <div className=" space-y-4 relative">
          {/* From */}
          <div className=" bg-extraDark rounded px-4 py-3">
            <h2 className=" text-xs lg:text-sm text-muted">From</h2>
            <div className="flex flex-col md:flex-row md:items-center py-1">
              <TransitionGroup component="div" transitionName="token-balance">
                {chainId == bscChainId ? (
                  <div className="flex items-center gap-2  lg:gap-3">
                    <Image src={eth2} className="w-[40px]" alt="" />
                    <Image
                      alt="logo"
                      className="w-[40px] object-cover"
                      src={logo}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 lg:gap-3">
                    <Image
                      alt="logo"
                      className="w-[40px] object-cover"
                      src={ehtIcon}
                    />
                    <Image
                      alt="logo"
                      className="w-[40px] object-cover"
                      src={logo}
                    />
                  </div>
                )}
              </TransitionGroup>
              <div className="w-full">
                <div className="w-full mt-0 ">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => {
                      const input = Math.floor(event.target.value);
                      console.log("input", input);
                      const calculateFee = input - 0.01 * input;
                      console.log("calculateFee", calculateFee);
                      console.log("currentFee", currentFee);
                      if (calculateFee - currentFee > 0) {
                        setCalculatedFee(calculateFee - currentFee);
                      } else {
                        setCalculatedFee(0);
                      }

                      const regex = /^[0-9.]*$/;
                      if (regex.test(input) || input == "") {
                        setInputValue(Math.floor(input));
                        fetchApproval();
                      }
                    }}
                    className="text-xl bg-transparent text-white text-right focus:outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {isInvalidInput ? (
                  <p className="text-[#FF0606]  text-end text-xs md:text-sm py-0.5 w-full">
                    You can't trade in that much
                  </p>
                ) : (
                  <p className="text-[#FF0606] text-xs md:text-sm py-0.5 opacity-0">
                    Error
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=" text-xs lg:text-sm text-muted">
                {chainId == bscChainId ? "Binance Smart Chain" : "Ethereum"}
              </h2>
              {/* <h2 className=" text-xs lg:text-sm text-muted">~$1,835.37</h2> */}
            </div>
          </div>
          <div
            onClick={() => handleSwitchChain()}
            className="w-[44px] cursor-pointer h-[44px] absolute left-[46%] top-[48%] lg:top-[39%]  rounded-full border-muted border-[3px] bg-extraDark flex justify-center items-center"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7857 8.08333L9.36903 3.66666C9.28569 3.58333 9.17855 3.5119 9.0595 3.46428C9.0476 3.46428 9.03569 3.46428 9.02379 3.45238C8.92855 3.41666 8.83331 3.39285 8.72617 3.39285C8.48807 3.39285 8.26188 3.48809 8.09522 3.65476L3.65474 8.08333C3.3095 8.42857 3.3095 9 3.65474 9.34523C3.99998 9.69047 4.57141 9.69047 4.91665 9.34523L7.83331 6.42857V25.7143C7.83331 26.2024 8.23807 26.6071 8.72617 26.6071C9.21427 26.6071 9.61903 26.2024 9.61903 25.7143V6.44047L12.5238 9.34523C12.7024 9.52381 12.9286 9.60714 13.1547 9.60714C13.3809 9.60714 13.6071 9.52381 13.7857 9.34523C14.1309 9 14.1309 8.44047 13.7857 8.08333Z"
                fill="white"
              />
              <path
                d="M26.3452 20.6548C26 20.3095 25.4285 20.3095 25.0833 20.6548L22.1666 23.5714V4.28571C22.1666 3.79761 21.7619 3.39285 21.2738 3.39285C20.7857 3.39285 20.3809 3.79761 20.3809 4.28571V23.5595L17.4762 20.6548C17.1309 20.3095 16.5595 20.3095 16.2143 20.6548C15.869 21 15.869 21.5714 16.2143 21.9167L20.6309 26.3333C20.7142 26.4167 20.8214 26.4881 20.9404 26.5357C20.9523 26.5357 20.9643 26.5357 20.9762 26.5476C21.0714 26.5833 21.1785 26.6071 21.2857 26.6071C21.5238 26.6071 21.75 26.5119 21.9166 26.3452L26.3452 21.9167C26.6904 21.5595 26.6904 21 26.3452 20.6548Z"
                fill="white"
              />
            </svg>
          </div>
          {/* To */}
          <div className="  bg-extraDark rounded px-4 py-3">
            <h2 className=" text-xs lg:text-sm text-muted">To</h2>
            <div className=" py-1 flex items-center justify-between">
              <TransitionGroup component="div" transitionName="token-balance">
                {isWalletConnected && chainId == bscChainId ? (
                  <div className="flex items-center gap-2 lg:gap-3">
                    <Image
                      alt="logo"
                      className="w-[40px] object-cover"
                      src={ehtIcon}
                    />
                    <Image
                      alt="logo"
                      className="w-[40px] object-cover"
                      src={logo}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2  lg:gap-3">
                    <Image src={eth2} className="w-[40px]" alt="" />
                    <Image
                      alt="logo"
                      className="w-[40px] object-cover"
                      src={logo}
                    />
                  </div>
                )}
              </TransitionGroup>
              <h2 className=" text-base lg:text-xl">
                {commaNumber(calculatedFee.toFixed(0))}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=" text-xs lg:text-sm text-muted">
                {isWalletConnected && chainId == bscChainId
                  ? "Ethereum"
                  : "Binance Smart Chain"}
              </h2>
              {/* <h2 className=" text-xs lg:text-sm text-muted">
                ~$1 831.44 (-0.21%)
              </h2> */}
            </div>
          </div>
        </div>
      </div>

      {/* Percent fee:  */}

      <div className=" border space-y-2 border-[#2A2A2A] px-5 py-3">
        {/* <div className=" flex justify-between items-center">
          <p className=" text-xs lg:text-sm">Percent fee: </p>
          <p className=" text-xs lg:text-sm">0.1%</p>
        </div> */}
        <div className=" flex justify-between items-center">
          <p className="text-xs lg:text-sm">Minimum Fee: </p>
          <p className="text-xs lg:text-sm">
            {commaNumber(currentFee)} SquidGrow
          </p>
        </div>

        <div className=" flex justify-between items-center">
          <p className="text-xs lg:text-sm">Minimum Amount: </p>
          <p className="text-xs lg:text-sm">
            {commaNumber(currentMin)} SquidGrow
          </p>
        </div>
        <div className=" flex justify-between items-center">
          <p className="text-xs lg:text-sm">Available to Bridge: </p>
          <p className="text-xs lg:text-sm">
            {commaNumber(bridgeBalance - bridgeStdAmount)} SquidGrow
          </p>
        </div>
      </div>
      {/* button collect wallet */}

      <div className=" flex justify-center">
        <div className="-mt-3">
          {isConnected && signer ? (
            <ConnectWalletBtn
              disabled={isInvalidInput || !inputValue}
              onClick={
                parseFloat(allowance) < parseFloat(inputValue)
                  ? async () => await handleApprove(inputValue)
                  : async () => await handleBridge(inputValue)
              }
              title={
                isInvalidInput
                  ? "Bridge Unavailable"
                  : parseFloat(allowance) < parseFloat(inputValue)
                  ? "Approve"
                  : "Bridge"
              }
              // disabled={true}
              // title={"Bridge Paused"}
            />
          ) : (
            <NavButton isActive={true} />
          )}
          {/* <ConnectWalletBtn title={"Trade in"}  /> */}
        </div>
        {/* <ConnectWalletBtn title={"Connect Wallet"} /> */}
      </div>
      {/* footer */}
      <div className="flex items-center gap-3">
        <div className=" text-muted">Powered By Layerzero</div>
        <Image src={multiChain} alt="multiChain" />
      </div>
    </div>
  );
};

export default ConnectWallect;
