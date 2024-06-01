import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      localized:true,
      name: 'slogan',
      label: 'Slogan',
      type: 'text',
      required: true,
    },
    {
      name: 'copyright',
      localized:true,
      label: 'Copyright',
      type: 'text',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
