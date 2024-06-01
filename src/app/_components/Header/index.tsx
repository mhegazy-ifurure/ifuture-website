/* eslint-disable no-console */
/* eslint-disable simple-import-sort/imports */
{
  /* eslint-disable @next/next/no-img-element */
}

import React from "react";
// import Link from 'next/link'

// import { Header } from '../../../payload/payload-types'
import { fetchHeader } from "../../_api/fetchGlobals";
import HeaderComponent from "./HeaderCompnent";
import type { Header } from "../../../payload/payload-types";
// import HeaderComponent from './HeaderComponent'

export async function Header() {
  let header: Header | null = null;

  try {
    header = await fetchHeader();
    // console.log([...header]);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <HeaderComponent header={header} />
    </>
  );
}
