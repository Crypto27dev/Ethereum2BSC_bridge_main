import { ConnectWalletButton } from './ConnectButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CliamTape from '@/assets/images/CollectWalletButton.svg';
export const ConnectWalletBtn = ({ disabled, onClick, title }) => {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        className="w-full max-h-[90px] relative h-full flex flex-col justify-center items-center pink-tape"
      >
        <span className=" !font-medium text-lg md:text-2xl z-30 w-full">
          {title}
        </span>
      </button>
    </div>
  );
};

import Image from 'next/image';

export const NavButton = ({ isActive }) => {
  return (
    <div className="relative flex flex-col justify-center items-center h-full w-full pink-tape">
      <div className="!font-medium text-lg md:text-xl">
        <ConnectWalletButton isActive={isActive} />
      </div>
    </div>
  );
};
export const NavigationBarBtn = ({ isActive }) => {
  return <ConnectButton />;
};
export const ClaimBtn = () => {
  return (
    <button className="   relative flex flex-col justify-center items-center  h-full w-full ">
      <Image
        src={CliamTape}
        className=" relative max-h-[58px] z-20 w-full h-full  "
        alt="connectWalletBtn"
      />
      <span className="  !font-medium text-lg md:text-xl  absolute  z-50 ">
        Claim
      </span>
    </button>
  );
};

// import React from 'react';

// import connectWalletBtn from '../assets/images/CollectWalletButton.svg';
// import navButton from '../assets/images/navButton.svg';
// import Image from 'next/image';
// export const ConnectWalletBtn = () => {
//   return (
//     <div>
//       <button className="w-full relative h-full flex flex-col justify-center items-center">
//         <Image
//           src={connectWalletBtn}
//           className="relative z-20 w-full h-full"
//           alt="connectWalletBtn"
//         />
//         <span className="absolute !font-medium text-lg md:text-2xl z-30 w-full">
//           Connect Wallet
//         </span>
//       </button>
//     </div>
//   );
// };

// export const NavButton = () => {
//   return (
//     <button className="  relative flex flex-col justify-center items-center  h-full w-full ">
//       <Image
//         src={navButton}
//         className=" relative z-20 w-full h-full  "
//         alt="connectWalletBtn"
//       />
//       <span className="  !font-medium text-lg md:text-xl  absolute  z-50 ">
//         Launch Dapp
//       </span>
//     </button>
//   );
// };
