import React from "react";

import { Page } from "../../../payload/payload-types";
import { Gutter } from "../../_components/Gutter";
import { CMSLink } from "../../_components/Link";
import RichText from "../../_components/RichText";

import classes from "./index.module.scss";
import { Media } from "../../_components/Media";

type Props = Extract<Page["layout"][0], { blockType: "mediaContent" }>;

export const MediaContent: React.FC<
  Props & {
    id?: string;
  }
> = (props) => {
  const { media, content } = props;

  let caption: any;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <Gutter className={classes.content}>
      <div className={classes.gridContainer}>
        <div className={classes.grid}>
          {content &&
            content.length > 0 &&
            content.map((col, index) => {
              const { enableLink, richText, link, size } = col;

              return (
                <div
                  key={index}
                  className={[classes.column, classes[`column--${size}`]].join(
                    " "
                  )}
                >
                  <RichText content={richText} className="my-5" />
                  {enableLink && (
                    <CMSLink
                      className={
                        classes.contentBtn +
                        " px-5 py-3 rounded-2xl capitalize font-medium  no-underline  text-nowrap  cursor-pointer transform ease-in-out duration-300 transition hover:scale-110"
                      }
                      {...link}
                    />
                  )}
                </div>
              );
            })}
        </div>

        <div className={classes.mediaBlock}>
          <div>
            <Media resource={media} className={classes.media} />
          </div>

          {caption && (
            <Gutter className={classes.caption}>
              <RichText content={caption} />
            </Gutter>
          )}
        </div>
      </div>
    </Gutter>
  );
};
