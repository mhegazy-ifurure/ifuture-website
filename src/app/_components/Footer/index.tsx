/* eslint-disable no-console */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable prettier/prettier */
import React from "react";

import type { Footer } from "../../../payload/payload-types";
import { fetchFooter } from "../../_api/fetchGlobals";

import FooterComponent from "./FooterComponent";
import Cookies from "js-cookie";
import { useLocale } from "../../_providers/Locale";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function Footer() {

  let footer: Footer | null = null;
  // const {locale} =useLocale()
  // console.log({locale});
  try {
    footer = await fetchFooter();
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the footer without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    console.error(error);
  }

  // const navItems = footer?.navItems || []
  // const pathname = usePathname()

  return (
    <>
      <FooterComponent footer={footer} />
    </>
  );
}
