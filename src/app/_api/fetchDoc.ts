import { lng } from "./lng";
/* eslint-disable simple-import-sort/imports */
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import type { Config } from "../../payload/payload-types";
import { PAGE } from "../_graphql/pages";
import { POST } from "../_graphql/posts";
import { SERVICE } from "../_graphql/_services";
import { PROJECT } from "../_graphql/projects";
import { GRAPHQL_API_URL } from "./shared";
import { payloadToken } from "./token";
import Cookies from "js-cookie";

const queryMap = {
  pages: {
    query: PAGE,
    key: "Pages",
  },
  posts: {
    query: POST,
    key: "Posts",
  },
  projects: {
    query: PROJECT,
    key: "Projects",
  },
  services: {
    query: SERVICE,
    key: "Services",
  },
};

export const fetchDoc = async <T>(args: {
  collection: keyof Config["collections"];
  slug?: string;
  id?: string;
  draft?: boolean;
  locale?: string;
}): Promise<T> => {
  let { collection, slug, draft, locale } = args || {};

  let lng: RequestCookie  | undefined;

  if (!locale) {
    const { cookies } = await import("next/headers");
    lng = cookies().get("lng");
    locale =lng.value
  }

  if (!queryMap[collection])
    throw new Error(`Collection ${collection} not found`);

  let token: RequestCookie | undefined;

  if (draft) {
    const { cookies } = await import("next/headers");

    token = cookies().get(payloadToken);
  }

  const doc: T = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    cache: "no-store",
    next: { tags: [`${collection}_${slug}`] },
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables: {
        slug,
        draft,
        locale,
      },
    }),
  })
    ?.then((res) => {


    return  res.json()})
    ?.then((res) => {
      if (res.errors)
        throw new Error(res?.errors?.[0]?.message ?? "Error fetching doc");
      return res?.data?.[queryMap[collection].key]?.docs?.[0];
    });

  return doc;
};
