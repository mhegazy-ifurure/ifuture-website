/* eslint-disable @next/next/no-async-client-component */
'use client'

import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Service } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

interface MyFormValues {
  name: string
  email: string
  message: string
  companyName: string
  serviceKind: string
}
const RequestServiceForm: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  let lng: RequestCookie | string | undefined;


  useEffect(() => {
    try {
      const fetchServices = async () => {
        
        const response = await fetchDocs<Service>('services')

        setServices(response)
      }
      fetchServices()
    } catch (error) {}
  }, [])

  const initialValues: MyFormValues = {
    name: '',
    email: '',
    message: '',
    companyName: '',
    serviceKind: '',
  }

  return (
    <>
      <div className="rounded-2xl border border-gray-300 border-solid  shadow-xl p-5 mb-20">
        <h3 className="text-center">Request a Service</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required('Name is required'),
            companyName: Yup.string().required('Company Name is required'),
            serviceKind: Yup.string().required('Service Kind is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            message: Yup.string().required('Message is required'),
          })}
          onSubmit={(_values, { resetForm }) => {
            resetForm()
          }}
        >
          <Form className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 p-10 ">
            <div className=" mb-4 ">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <Field
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 border-solid  rounded-md shadow focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="name"
                placeholder="your name"
                name="name"
              />
              <ErrorMessage className="text-red-500" name="name" component={'div'} />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email *
              </label>
              <Field
                name="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="email"
                placeholder="example@yourmail.com"
              />
              <ErrorMessage className="text-red-500" name="email" component={'div'} />
            </div>
            <div className="mb-4 ">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company *
              </label>
              <Field
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="companyName"
                name="companyName"
                placeholder="your company name here"
              />
              <ErrorMessage className="text-red-500" name="companyName" component={'div'} />
            </div>
            <div className="mb-4 relative inline-block text-left ">
              <label htmlFor="serviceKind" className="block text-sm font-medium text-gray-700">
                Service Kind *
              </label>
              <Field
                as="select"
                id="serviceKind"
                name="serviceKind"
                placeholder="service kind"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {services.length ? (
                  services.map(services => (
                    <>
                      <option key={services.id}>{services.slug}</option>
                    </>
                  ))
                ) : (
                  <>
                    <option>...Loading</option>
                  </>
                )}
              </Field>
              <ErrorMessage className="text-red-500" name="serviceKind" component={'div'} />
            </div>
            <div className="  col-span-0 lg:col-span-2 mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message *
              </label>
              <Field
                name="message"
                as="textarea"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
                id="message"
                placeholder="Hello there,I would like to talk about how to..."
              />
              <ErrorMessage className="text-red-500" name="message" component={'div'} />
            </div>

            <div className="col-span-0 lg:col-span-2 mb-4 text-center">
              <button
                type="submit"
                className="px-5 py-3 rounded-md  capitalize font-medium  text-white no-underline bg-gradient-to-r from-blue-400 to-violet-500 text-nowrap border-0 cursor-pointer transform ease-in-out duration-300 transition hover:scale-110 "
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default RequestServiceForm
async function generateStaticParams() {
  try {
    const services = await fetchDocs<Service>('services')
    return services
  } catch (error) {
    return []
  }
}
