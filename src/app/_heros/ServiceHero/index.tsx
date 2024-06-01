import React, { Fragment } from 'react'
import Link from 'next/link'

import { Service } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import { formatDateTime } from '../../_utilities/formatDateTime'

import classes from './index.module.scss'

export const ServiceHero: React.FC<{
  service: Service
}> = ({ service }) => {
  const {
    id,
    title,
    projects,
    meta: { image: metaImage, description } = {},
    publishedAt,
    populatedAuthors,
  } = service

  return (
    <Fragment>
      <Gutter className={classes.serviceHero}>
        <div className={classes.content}>
          <div className={classes.leader}>
            <div className={classes.projects}>
              {projects?.map((project, index) => {
                if (typeof project === 'object' && project !== null) {
                  const { title: projectTitle } = project

                  const titleToUse = projectTitle || 'Untitled project'

                  const isLast = index === projects.length - 1

                  return (
                    <Fragment key={index}>
                      {titleToUse}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }
                return null
              })}
            </div>
          </div>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.meta}>
            {populatedAuthors && (
              <Fragment>
                {'By '}
                {populatedAuthors.map((author, index) => {
                  const { name } = author

                  const isLast = index === populatedAuthors.length - 1
                  const secondToLast = index === populatedAuthors.length - 2

                  return (
                    <Fragment key={index}>
                      {name}
                      {secondToLast && populatedAuthors.length > 2 && <Fragment>, </Fragment>}
                      {secondToLast && populatedAuthors.length === 2 && <Fragment> </Fragment>}
                      {!isLast && populatedAuthors.length > 1 && <Fragment>and </Fragment>}
                    </Fragment>
                  )
                })}
              </Fragment>
            )}
            {publishedAt && (
              <Fragment>
                {' on '}
                {formatDateTime(publishedAt)}
              </Fragment>
            )}
          </p>
          <div>
            <p className={classes.description}>
              {`${description ? `${description} ` : ''}To edit this service, `}
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/services/${id}`}>
                navigate to the admin dashboard
              </Link>
              {'.'}
            </p>
          </div>
        </div>
        <div className={classes.media}>
          <div className={classes.mediaWrapper}>
            {!metaImage && <div className={classes.placeholder}>No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              <Media imgClassName={classes.image} resource={metaImage} fill />
            )}
          </div>
          {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
            <RichText content={metaImage.caption} className={classes.caption} />
          )}
        </div>
      </Gutter>
    </Fragment>
  )
}
