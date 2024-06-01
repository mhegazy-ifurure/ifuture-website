import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const SERVICES = `
  query Services($locale:LocaleInputType) {
    Services(limit: 300,locale:$locale) {
      docs {
        slug
      }
    }
  }
`

export const SERVICE = `
  query Service($slug: String, $draft: Boolean,$locale:LocaleInputType) {
    Services(where: { slug: { equals: $slug }}, limit: 1, draft: $draft,locale:$locale) {
      docs {
        id
        title
        categories {
          title
        }
        createdAt
        publishedAt
        populatedAuthors {
          id
          name
        }
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }

        relatedServices {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`

// export const SERVICE_PREMIUM_CONTENT = `
//   query Service($slug: String, $draft: Boolean) {
//     Services(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
//       docs {
//         premiumContent {
//           ${CALL_TO_ACTION}
//           ${CONTENT}
//           ${MEDIA_BLOCK}
//           ${ARCHIVE_BLOCK}
//         }
//       }
//     }
//   }
// `
