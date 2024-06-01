import { Block, Field } from "payload/types";
import { invertBackground } from "../../fields/invertBackground";
import richText from "../../fields/richText";
import link from "../../fields/link";

const contentFields: Field[] = [
  {
    name: "size",
    type: "select",
    defaultValue: "oneThird",
    options: [
      {
        value: "oneThird",
        label: "One Third",
      },

      {
        value: "twoThirds",
        label: "Two Thirds",
      },
      {
        value: "full",
        label: "Full",
      },
    ],
  },
  richText(),
  {
    name: "enableLink",
    type: "checkbox",
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
];

export const MediaContent: Block = {
  slug: "mediaContent",
  fields: [
    invertBackground,
    {
      name: "content",
      type: "array",
      fields: contentFields,
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
