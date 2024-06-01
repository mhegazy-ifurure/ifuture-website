/* eslint-disable @next/next/no-img-element */
/* eslint-disable simple-import-sort/imports */
"use client";
import React, { Fragment, useEffect } from "react";

import { Page } from "../../../payload/payload-types";
import { Gutter } from "../../_components/Gutter";
import { CMSLink } from "../../_components/Link";
import { Media } from "../../_components/Media";
import RichText from "../../_components/RichText";
import Link from "next/link";
import { motion } from "framer-motion";

import classes from "./index.module.scss";
import Image from "next/image";
import { Video } from "../../_components/Media/Video";
export const HomeHero: React.FC<Page["hero"]> = ({
  richText,
  media,
  links,
}) => {
  const mediaUrl =
    media &&
    typeof media !== "string" &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${media.filename}`;

  // useEffect(() => {
  //   if (document.dir === "rtl") {
  //     document
  //       .querySelector(".bg-home-hero")
  //       .classList.add("transform scale-y-[-1]");
  //   }
  // }, []);
console.log(mediaUrl);

  return (
    <>
      <section
        className={" w-full min-h-screen   relative flex flex-col justify-end "}
      >
        {typeof media === "object" && (
          <div className={classes.backgroundImage + " bg-home-hero "}>
            <Video resource={media} />
          </div>
        )}

        <Gutter className="z-10 ">
          <div className="  mb-20">
            <RichText className={" text-white md:w-2/3"} content={richText} />

            <div className="my-5 flex  gap-3">
              {links.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className={`${
                    i % 2
                      ? "text-white border border-solid"
                      : "bg-white-100 border-0"
                  }  px-5 py-3 rounded-2xl capitalize font-medium  no-underline  text-nowrap  cursor-pointer transform ease-in-out duration-300 transition hover:scale-110
                  `}
                />
              ))}
            </div>
          </div>
        </Gutter>
      </section>
    </>
  );
};
