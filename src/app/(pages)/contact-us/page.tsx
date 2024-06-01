import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import ContactInfo from '../../_heros/ContactInfoHero'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import ContactForm from './ContactForm'

const ContactUs: React.FC = () => {
  // console.log('contact us')

  return (
    <>
      <Gutter>
        <div className="bg-hero-pattern  lg:w-1/2 text-primary bg-center bg-cover p-3 mx-auto text-center">
          <h1>{'Contact Us'}</h1>
        </div>
        <RenderParams />
        <ContactInfo />
        <ContactForm />
      </Gutter>
    </>
  )
}

export default ContactUs

export const metadata: Metadata = {
  title: 'Contact Us ',
  description: 'contact us for more info',
  openGraph: mergeOpenGraph({
    title: 'Contact Us ',
    url: '/contact-us',
  }),
}
