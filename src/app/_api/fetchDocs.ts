import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import type { Config } from '../../payload/payload-types'
import { SERVICES } from '../_graphql/_services'
import { PAGES } from '../_graphql/pages'
import { POSTS } from '../_graphql/posts'
import { PROJECTS } from '../_graphql/projects'
import { GRAPHQL_API_URL } from './shared'
import { payloadToken } from './token'
import Cookies from 'js-cookie'

const queryMap = {
  pages: {
    query: PAGES,
    key: 'Pages',
  },
  posts: {
    query: POSTS,
    key: 'Posts',
  },
  projects: {
    query: PROJECTS,
    key: 'Projects',
  },
  services: {
    query: SERVICES,
    key: 'Services',
  },
}

export const fetchDocs = async <T>(
  collection: keyof Config['collections'],
  draft?: boolean,
  variables?: Record<string, unknown>
): Promise<T[]> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  let token: RequestCookie | undefined

let locale:string
  let lng: RequestCookie  | undefined;

  if (!lng) {
    const { cookies } = await import("next/headers");
    lng = cookies().get("lng");
    locale = lng.value
  }

  if (draft) {
    const { cookies } = await import('next/headers')
    token = cookies().get(payloadToken)
  }

  const docs: T[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
    },
    cache: 'no-store',
    next: { tags: [collection] },
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables:{locale}
    }),
  })
    ?.then(res => {

      console.log(res.json());

      return res.json()})
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs')
      return res?.data?.[queryMap[collection].key]?.docs
    })
console.log({docs});

  return docs
}
