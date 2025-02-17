import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',

  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {

      name: 'title',

      type: 'text',
      localized:true
    },
  ],
}

export default Categories
