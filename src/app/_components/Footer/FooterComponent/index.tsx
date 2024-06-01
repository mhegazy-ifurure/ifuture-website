"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Footer, Media } from "../../../../payload/payload-types";
import { Gutter } from "../../Gutter";

import classes from "./index.module.scss";

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const navItems = footer?.navItems || [];
  // console.log(footer)

  return (
    <footer className={"  pt-5  bg-primary text-white"}>
      <div className={"container  mx-auto w-full "}>

          <div
            className={
              "flex flex-col   gap-5 lg:gap-3"
            }
          >
            <Link href="/">
              <Image
                src="/assets/Logo2.svg"
                alt="logo"
                width={250}
                height={150}
              />
            </Link>

            <p className="text-[14px] my-1">{footer?.slogan}</p>

            <div className={"flex gap-3 "}>
              {navItems.map((item, i) => {
                const icon = item?.link?.icon as Media;

                return (
                  <Link
                    className="rounded-full  no no-underline  text-nowrap transform ease-in-out duration-300 transition hover:scale-110 "
                    key={i}
                    href={item.link.url}
                    target="_blank"
                  >
                    {item.link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div
            className={
              "flex items-center justify-between  mt-5 py-2  " + classes.copyright
            }
          >
            <div className=" flex gap-4 justify-between ">

            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Cookies Settings</a>

            </div>
            <div><p className="my-1">{footer?.copyright}</p></div>
          </div>

      </div>
    </footer>
  );
};

export default FooterComponent;
