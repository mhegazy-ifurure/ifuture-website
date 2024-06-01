import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import ContactInfo from '../../_heros/ContactInfoHero'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import RequestServiceForm from './RequestServiceForm'

const RequestService = () => {
  return (
    <>
      <Gutter>
        <div className="bg-hero-pattern  lg:w-1/2 text-primary bg-center bg-cover p-3 mx-auto text-center">
          <h1>{'Contact Us'}</h1>
        </div>
        <RenderParams />
        <ContactInfo />
        <RequestServiceForm />
      </Gutter>
    </>
  )
}

export default RequestService
export const metadata: Metadata = {
  title: 'Request Service ',
  description: 'contact us for a service',
  openGraph: mergeOpenGraph({
    title: 'Request Service ',
    url: '/request-service',
  }),
}
