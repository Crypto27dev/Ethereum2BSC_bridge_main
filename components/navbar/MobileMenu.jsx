"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/images/SRLOGO.svg";
import menu from "../../assets/images/menu.svg";
import { RxCross2 } from "react-icons/rx";
import { NavButton, NavigationBarBtn } from "../Button";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNavbar = () => {
    setIsOpen(!isOpen);
  };
  const Links = [
    {
      label: "Bridge",
      href: "/",
    },
    {
      label: "Squidgrow",
      href: "https://www.squidgrow.wtf/",
    },
    {
      label: "Support",
      href: "/support",
    },
    // {
    //   label: 'Developers',
    //   href: '#Developers',
    // },
    // {
    //   label: 'Blog',
    //   href: '#Blog',
    // },
    // {
    //   label: 'Whitepaper',
    //   href: '#Whitepaper',
    // },
  ];
  return (
    <nav className="navbar lg:hidden px-4">
      <div className="flex justify-between">
        <Image src={Logo} alt="SRLOGO" />
        <Image
          onClick={() => openNavbar()}
          className="w-[40px]"
          src={menu}
          alt="menu"
        />
      </div>
      <div
        className={` fixed bg-primary  mobile_navbar 2xl:px-0 px-4 pt-6 w-full h-full   ${
          isOpen ? "right-0" : "right-full"
        }  z-[9999] top-0 `}
      >
        <div className=" flex  items-center justify-between">
          <Image src={Logo} className=" " alt="" />
          <RxCross2
            onClick={() => openNavbar()}
            className="text-white "
            size={36}
          />
        </div>
        <ul className="flex flex-col md:items-center pt-7 lg:flex-row gap-6">
          {Links.map((link) => (
            <li key={link.href} onClick={openNavbar}>
              <Link
                href={link.href}
                className="block py-2 pl-3 pr-4 text-white text-base leading-[19px] font-bold font-segoe"
                aria-current="page"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-3 w-fit mx-auto">
          <NavigationBarBtn />
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;
