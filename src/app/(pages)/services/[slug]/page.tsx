import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { Service } from '../../../../payload/payload-types'
import { fetchComments } from '../../../_api/fetchComments'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { PremiumContent } from '../../../_components/PremiumContent'
import { ServiceHero } from '../../../_heros/ServiceHero'
import { generateMeta } from '../../../_utilities/generateMeta'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Service({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let service: Service | null = null

  try {
    service = await fetchDoc<Service>({
      collection: 'services',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!service) {
    notFound()
  }

  const comments = await fetchComments({
    doc: service?.id,
  })

  const { layout, relatedServices } = service

  return (
    <React.Fragment>
      <ServiceHero service={service} />
      <Blocks blocks={layout} />
      <Blocks
        disableTopPadding
        blocks={[
          {
            blockType: 'relatedProjects',
            blockName: 'Projects',
            relationTo: 'services',
            introContent: [
              {
                type: 'h4',
                children: [
                  {
                    text: 'Projects',
                  },
                ],
              },
              {
                type: 'p',
                children: [
                  {
                    text: 'Authenticated users can leave projects on this post. All new projects are given the status "draft" until they are approved by an admin. Draft projects are not accessible to the public and will not show up on this page until it is marked as "published". To manage all projects, ',
                  },
                  {
                    type: 'link',
                    url: '/admin/collections/projects',
                    children: [
                      {
                        text: 'navigate to the admin dashboard',
                      },
                    ],
                  },
                  {
                    text: '.',
                  },
                ],
              },
            ],
            doc: service,
          },
          {
            blockType: 'relatedServices',
            blockName: 'Related Services',
            relationTo: 'services',
            introContent: [
              {
                type: 'h4',
                children: [
                  {
                    text: 'Related services',
                  },
                ],
              },
              {
                type: 'p',
                children: [
                  {
                    text: 'The services displayed here are individually selected for this page. Admins can select any number of related services to display here and the layout will adjust accordingly. Alternatively, you could swap this out for the "Archive" block to automatically populate services by category complete with pagination. To manage related services, ',
                  },
                  {
                    type: 'link',
                    url: `/admin/collections/services/${service.id}`,
                    children: [
                      {
                        text: 'navigate to the admin dashboard',
                      },
                    ],
                  },
                  {
                    text: '.',
                  },
                ],
              },
            ],
            docs: relatedServices,
          },
        ]}
      />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const services = await fetchDocs<Service>('services')
    return services?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let service: Service | null = null

  try {
    service = await fetchDoc<Service>({
      collection: 'services',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: service })
}
