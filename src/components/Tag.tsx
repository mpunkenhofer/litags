import * as React from "react";
import { Tag } from "../types";
import { i18n } from "../constants/i18n";
import { browser } from "webextension-polyfill-ts";

interface TagProps {
  tag: Tag;
}

const Tag: React.FunctionComponent<TagProps> = ({ tag }: TagProps) => {
  return !tag.uri ? (
    <img
      className={"lt-tag"}
      src={browser.runtime.getURL("assets/images/tag-solid.svg")}
      alt={i18n.defaultTag}
    />
  ) : tag.font !== undefined ? (
    tag.color && tag.color.length > 0 ? (
      <span
        className={"lt-tag"}
        // Fix for incorrect font family residing in user storages of prev. versions
        style={{
          fontFamily:
            tag.font.fontFamily == "lichess"
              ? "lichess-tags"
              : tag.font.fontFamily,
          color: tag.color,
        }}
      >
        {tag.uri}
      </span>
    ) : (
      <span
        className={"lt-tag"}
        // Fix for incorrect font family residing in user storages of prev. versions
        style={{
          fontFamily:
            tag.font.fontFamily == "lichess"
              ? "lichess-tags"
              : tag.font.fontFamily,
        }}
      >
        {tag.uri}
      </span>
    )
  ) : (
    <img className={"lt-tag"} src={tag.uri} alt={tag.name} />
  );
};

export default Tag;
