/* eslint-disable simple-import-sort/imports */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Gutter } from '../../_components/Gutter'

const ContactInfo = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
        <div className="">
          <div className="flex shadow-lg border justify-start items-center flex-wrap  p-4 rounded-2xl  border-gray-300 border-solid">
            <div className="bg-gradient-to-r from-blue-400 to-violet-500 flex justify-center items-center w-[83px] h-[83px] rounded-2xl p-4">
              <Image src={'/assets/emailIcon.svg'} alt="email" width={83} height={83} />
            </div>
            <div className="flex items-center justify-between flex-1 flex-wrap ms-3 ">
              <h5 className=" font-bold my-0">Mail Us</h5>
              <Link href="info@ifuture.sa" className=" text-gray-400 ">
                {' '}
                info@ifuture.sa
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex shadow-lg border justify-start items-center flex-wrap  p-4 rounded-2xl  border-gray-300 border-solid">
            <div className="bg-teal-500 flex justify-center items-center w-[83px] h-[83px] rounded-2xl p-4">
              <Image src={'/assets/ringIocn.svg'} alt="ring" width={83} height={83} />
            </div>
            <div className="flex items-center justify-between flex-1 flex-wrap ms-3 ">
              <h5 className=" font-bold my-0">Contact Us</h5>
              <Link href="(+966)597455800" className=" text-gray-400 ">
                {' '}
                (+966)597455800
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactInfo
