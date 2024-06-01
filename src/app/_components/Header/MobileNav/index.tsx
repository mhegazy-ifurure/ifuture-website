/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
'use client'

import React, { SetStateAction } from 'react'

import { Header as HeaderType, Page } from '../../../../payload/payload-types'
import { CMSLink } from '../../Link'
import Image from 'next/image'
import ToggleButton from '../../ToggleButton'

// import classes from './index.module.scss'

export const MobileNav: React.FC<{
  textColor:string
  header: HeaderType
  toggle: boolean
  setToggle: React.Dispatch<SetStateAction<boolean>>
  active: string |Page
  setActive: React.Dispatch<SetStateAction<string|Page>>
}> = ({ header, setToggle, toggle, active, setActive  ,textColor}) => {
  const navItems = header?.navItems || []

  return (
    <div className="lg:hidden flex flex-1 justify-end items-center ">
      <Image
        loading="lazy"
        src={toggle ? '/assets/xmark-solid.svg' : '/assets/bars-solid.svg'}
        alt="menu"
        width={24}
        height={24}
        className=" object-contain cursor-pointer "
        onClick={() => setToggle(!toggle)}
      />

      <nav
        className={`${
          !toggle ? 'hidden' : 'flex'
        } p-6 bg-white-100 absolute top-10 right-2  min-w-[140px] z-10 rounded  shadow-xl`}
      >
        <div className="list-none flex justify-end items-center flex-col gap-5 ">
          {navItems.map(({ link }, i) => (
            <>
              <CMSLink
                {...link}
                key={`${i}`}
                className=
                 'text-secondray hover:text-primary font-medium   cursor-pointer text-[14px] no-underline'
                onClick={(): any => {
                  setToggle(!toggle)
                  setActive(link.reference.value)
                }}
              />
            </>
          ))}
                <ToggleButton textColor={textColor} />

        </div>
      </nav>
    </div>
  )
}
