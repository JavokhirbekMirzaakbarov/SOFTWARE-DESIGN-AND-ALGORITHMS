import React from "react";
import DocLink from "@docusaurus/Link";

import styles from "./Link.module.css";

export function Link(props) {
  const { url, title, children } = props;
  return (
    <DocLink className="button-link button--lg" to={url}>
      <div className={styles.link}>
        <span>{title}</span>
        {children}
      </div>
    </DocLink>
  );
}
