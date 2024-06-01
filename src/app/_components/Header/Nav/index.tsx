/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
"use client";

import React, { useEffect, useState } from "react";

import { Header as HeaderType } from "../../../../payload/payload-types";
import { CMSLink } from "../../Link";
import ToggleButton from "../../ToggleButton";

// import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType; textColor: string }> = ({
  header,
  textColor,
}) => {
  const navItems = header?.navItems || [];

  return (
    <nav className="hidden lg:flex  gap-10">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            className={textColor + " font-bold no-underline text-nowrap"}
          />
        );
      })}
      <ToggleButton textColor={textColor} />
    </nav>
  );
};
