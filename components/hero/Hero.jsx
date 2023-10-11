"use client";
import React, { useRef } from "react";
import Container from "../Container";
import ConnectWallect from "../ConnectWallect";
import Image from "next/image";
import heroImage from "../../assets/images/hero.png";

import Footer from "./Footer";
const Hero = () => {
  const bannerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      bannerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (clientX - centerX) / width;
    const moveY = (clientY - centerY) / height;

    const rotateX = moveY * 40;
    const rotateY = -moveX * 40;
    const translateZ = Math.min(Math.max(-50, Math.abs(moveX * 100)), 0); // Limit translateZ between -50 and 0

    bannerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  const handleMouseLeave = () => {
    bannerRef.current.style.transform = "";
  };
  return (
    <Container>
      <div className=" pt-10 lg:pt-16  flex flex-col gap-5 lg:gap-24 justify-between lg:flex-row ">
        {/* Connect Wallet */}
        <div className=" basis-1/2">
          <ConnectWallect />
        </div>
        {/*  hero content for Desktop*/}

        <div className=" basis-1/2 hidden md:block">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={bannerRef}
          >
            <Image className=" block mx-auto" src={heroImage} alt="heroImage" />
          </div>
          <ul className="list-disc pt-10 space-y-2	">
            <li className=" text-base">
              Crosschain Fee is 0.1 %, Minimum Crosschain Fee is
              482,765,279.521097 SquidGrow on ETH and 3,862,122,236 SquidGrow on
              BSC, Maximum Crosschain Fee is 96,553,055,904.21938 SquidGrow
            </li>
            <li className=" text-base">
              Minimum crosschain amount is 965,530,559.042194 SquidGrow
            </li>
            <li className=" text-base">
              Maximum crosschain amount is 482,765,279,521,096.8 SquidGrow
            </li>
            <li className=" text-base">
              Estimated time of crosschain arrival is 10-30 minutes
            </li>
            <li className=" text-base">
              Crosschain amount larger than 96,553,055,904,219.38 SquidGrow
              could take up to 12 hours
            </li>
            <li className=" text-base">
              Amount recieved may slightly differ from the amount sent depending
              on network congestion
            </li>
          </ul>

          {/* <div className=" mt-auto pt-4">
            <div className=" font-normal text-muted  text-right text-[20px]">
              All rights reserved. © 2022, SquidGrow{' '}
            </div>
          </div> */}
        </div>

        {/* footer content for mobile */}
        <Footer />
      </div>
    </Container>
  );
};

export default Hero;
