import Link from "next/link";
import React from "react";
import Image from "next/image";
import SquidGrow from "../../assets/images/SquidGrow.svg";
import {
  FaTelegramPlane,
  FaDiscord,
  FaYoutube,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  const links = [
    {
      href: "https://t.me/squidgrowportalentry",
      label: <FaTelegramPlane size={25} />,
    },
    {
      href: "https://discord.gg/HgsgryRpwB",
      label: <FaDiscord size={25} />,
    },
    {
      href: "https://www.youtube.com/channel/UCh-gkjDnFRjX1wMFUpzKdUw",
      label: <FaYoutube size={25} />,
    },
    {
      href: "https://www.tiktok.com/@squidgrow",
      label: <FaTiktok size={25} />,
    },
    {
      href: "https://twitter.com/Squid_Grow",
      label: <FaTwitter size={25} />,
    },
  ];

  return (
    <div className="basis-1/2 md:hidden">
      <div>
        <Image className=" block mx-auto" src={SquidGrow} alt="squidGrow" />
        <p className=" text-base text-muted text-center w-[80%] mx-auto">
          SquidGrow aspires to be the top utility meme coin on Binance Smart
          Chain and Ethereum.
        </p>
        <footer className="">
          <div className="py-12">
            <div className=" flex items-center justify-center gap-7">
              {links.map((link, key) => (
                <div
                  key={key}
                  className=" w-[40px] h-[40px] bg-white flex justify-center items-center rounded-full text-black "
                >
                  <Link href={link.href}>{link.label}</Link>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="grid px-2 gap-4 grid-rows-2 grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold">About</h2>
              <ul className=" space-y-2">
                <li className=" text-base text-muted">Home</li>
                <li className=" text-base text-muted">What is SquidGrow</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Product</h2>
              <ul className=" space-y-2">
                <li className=" text-base text-muted">SGS</li>
                <li className=" text-base text-muted">Staking</li>
                <li className=" text-base text-muted">Farming</li>
                <li className=" text-base text-muted">Bridge</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Governance</h2>
              <ul>
                <li className=" text-base text-muted">Tokenomics</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Other Links</h2>
              <ul className=" space-y-2">
                <li className=" text-base text-muted">Blog</li>
                <li className=" text-base text-muted">White Paper</li>
                <li className=" text-base text-muted">
                  <Link
                    href={'https://skynet.certik.com/projects/squidgrow'}
                    target="_blank"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}
        </footer>
      </div>
    </div>
  );
};

export default Footer;
