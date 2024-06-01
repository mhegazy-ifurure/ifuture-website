import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK, MEDIA_CONTENT } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const PAGES = `
  query Pages ($locale:LocaleInputType){
    Pages(limit: 300,locale:$locale)  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean,$locale:LocaleInputType) {
    Pages(where: { slug: { equals: $slug }}, limit: 1, draft: $draft,locale:$locale) {
      docs {
        id
        title
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
          ${MEDIA_CONTENT}
        }
        ${META}
      }
    }
  }
`
