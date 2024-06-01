/* eslint-disable simple-import-sort/imports */
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import redirects from "@payloadcms/plugin-redirects";
import seo from "@payloadcms/plugin-seo";
import type { GenerateTitle } from "@payloadcms/plugin-seo/types";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";

import Categories from "./collections/Categories";
import Comments from "./collections/Comments";
import { Media } from "./collections/Media";
import { Services } from "./collections/_Services";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Projects } from "./collections/Projects";
import Users from "./collections/Users";
import BeforeDashboard from "./components/BeforeDashboard";
import BeforeLogin from "./components/BeforeLogin";
import { seed } from "./endpoints/seed";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { Settings } from "./globals/Settings";
import { defaultLocale } from "yup";

const generateTitle: GenerateTitle = () => {
  return "I Future";
};

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: [BeforeLogin],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: [BeforeDashboard],
    },
    webpack: (config) => ({
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\tailwind.css$/i,
            use: ["css-loader", "postcss-loader"],
          },
        ],
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, "./dotenv.js"),
          [path.resolve(__dirname, "./endpoints/seed")]: path.resolve(
            __dirname,
            "./emptyModuleMock.js"
          ),
        },
      },
    }),
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Pages,
    Posts,
    Projects,
    Media,
    Categories,
    Services,
    Users,
    Comments,
  ],

  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Arabic",
        code: "ar",
        // opt-in to setting default text-alignment on Input fields to rtl (right-to-left)
        // when current locale is rtl
        rtl: true,
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },

  globals: [Settings, Header, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      path: "/seed",
      method: "get",
      handler: seed,
    },
  ],
  plugins: [
    redirects({
      collections: ["pages", "posts", "services"],
    }),
    nestedDocs({
      collections: ["categories"],
    }),
    seo({
      collections: ["pages", "posts", "services", "projects"],
      generateTitle,

      uploadsCollection: "media",
    }),
    payloadCloud(),
  ],
  
});
