/* eslint-disable simple-import-sort/imports */
/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Header } from "../../../../payload/payload-types";
// import { styles } from '../../../../style'
// import { Gutter } from '../../Gutter'
import classes from "./index.module.scss";
import Image from "next/image";
import { HeaderNav } from "../Nav";
import { MobileNav } from "../MobileNav";
import { usePathname } from "next/navigation";
import { Gutter } from "../../Gutter";
const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [toggle, setToggle] = useState(false);
  const [textColor, setTextColor] = useState("text-white");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setTextColor("text-primary");
      } else {
        setTextColor("text-white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav className={"w-full py-5 fixed z-10"}>
        <Gutter className=" flex items-center justify-between relative">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              className={textColor == 'text-white' ? classes.icon: ''}
              alt="logo"
              width={170}
              height={50}
              onClick={() => {
                setActive("/");
                setToggle(false);
              }}
            />
          </Link>
          <HeaderNav textColor={textColor} header={header} />
          <MobileNav
          textColor={textColor}
            header={header}
            setToggle={setToggle}
            toggle={toggle}
            active={active}
            setActive={setActive}
          />
        </Gutter>
      </nav>
    </>
  );
};

export default HeaderComponent;
