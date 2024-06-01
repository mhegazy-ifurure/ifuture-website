/* eslint-disable simple-import-sort/imports */
'use client'

import React, { useRef, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
interface MyFormValues {
  name: string
  email: string
  message: string
}
const ContactForm: React.FC = () => {
  const initialValues: MyFormValues = { name: '', email: '', message: '' }
  return (
    <>
      <div className="rounded-2xl border border-gray-300 border-solid shadow-xl p-5 mb-20">
        <h3 className="text-center">Leave us a Message</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            message: Yup.string().required('Message is required'),
          })}
          onSubmit={(values, { resetForm }) => {
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

            <div className="col-span-0 lg:col-span-2 text-center">
              <button
                type="submit"
                className={
                  'px-5 py-3 rounded-md  capitalize font-medium  text-white no-underline bg-gradient-to-r from-blue-400 to-violet-500 text-nowrap border-0 cursor-pointer transform ease-in-out duration-300 transition hover:scale-110 '
                }
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

export default ContactForm
