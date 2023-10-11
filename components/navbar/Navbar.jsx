"use client";

import React from "react";
import Container from "../Container";

import Logo from "../../assets/images/SRLOGO.svg";
import Dropdown from "../../assets/images/Dropdown.svg";

import Link from "next/link";
import Image from "next/image";
import { NavButton, NavigationBarBtn } from "../Button";

const Navbar = () => {
  return (
    <nav className="navbar hidden lg:block">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="logo">
              <Link href={"/"}>
                <Image src={Logo} alt="SRLOGO" />
              </Link>
            </div>
            <ul className=" flex items-center gap-6">
              <li className="flex cursor-pointer nav-link items-center gap-3">
                <Link href={"/"}>Bridge</Link>
              </li>

              <li className="flex cursor-pointer nav-link items-center gap-3">
                <Link href={"/support"}>Support</Link>
              </li>
              <li className="flex cursor-pointer nav-link  items-center gap-3">
                <Link href={"https://squidgrow.wtf/"}>Squidgrow</Link>
              </li>
              {/* <li className="flex cursor-pointer nav-link  items-center gap-3">
                <Link href={"#Governance"}>Governance</Link>
                <Image src={Dropdown} alt="dropdown" />
              </li>
              <li className="flex cursor-pointer nav-link  items-center gap-3">
                <Link href={"#Developers"}>Developers</Link>
                <Image src={Dropdown} alt="dropdown" />
              </li>
              <li className=" cursor-pointer nav-link  items-center">
                <Link href={"#Blog"}>Blog</Link>
              </li>
              <li className=" cursor-pointer nav-link  items-center">
                <Link href={"#Blog"}>Whitepaper</Link>
              </li> */}
            </ul>
          </div>
          <div>
            <NavigationBarBtn isActive={false} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
