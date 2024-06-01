import React, { Fragment } from "react";
import Link from "next/link";

import { Post } from "../../../payload/payload-types";
import { Gutter } from "../../_components/Gutter";
import { Media } from "../../_components/Media";
import RichText from "../../_components/RichText";
import { formatDateTime } from "../../_utilities/formatDateTime";

import classes from "./index.module.scss";
import { Hero } from "../../_components/Hero";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const {
    id,
    title,
    hero: { type: heroType, richText, links, media } = {},
    categories,
    meta: { image: metaImage, description } = {},
    publishedAt,
    populatedAuthors,
  } = post;

  return (
    <Fragment>
      <Gutter className={classes.postHero}>
        <div className={classes.content}>
          <div className={classes.leader}>
            <div className={classes.categories}>
              {categories?.map((category, index) => {
                if (typeof category === "object" && category !== null) {
                  const { title: categoryTitle } = category;

                  const titleToUse = categoryTitle || "Untitled category";

                  const isLast = index === categories.length - 1;

                  return (
                    <Fragment key={index}>
                      {titleToUse}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <h1 className={classes.title}>{title}</h1>

          <RichText content={richText} />
        </div>
        <div className={classes.media}>
          <div className={classes.mediaWrapper}>
            {!media && <div className={classes.placeholder}>No image</div>}
            {typeof media === "object" && (
              <Fragment>
                <Media
                  resource={media}
                  // fill
                  imgClassName={"w-full"}
                  priority
                />
                {media?.caption && (
                  <RichText
                    content={media.caption}
                    className={classes.caption}
                  />
                )}
              </Fragment>
            )}
          </div>
          {media && typeof media !== "string" && media?.caption && (
            <RichText content={media.caption} className={classes.caption} />
          )}
        </div>
      </Gutter>
    </Fragment>
  );
};
