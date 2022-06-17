import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

import { Link } from "../components/Link/Link";

import { Puzzle } from "../components/icons/Puzzle";
import { Algorithm } from "../components/icons/Algorithm";
import { Fx } from "../components/icons/Fx";
import { Oop } from "../components/icons/OOP";
import { Columns } from "../components/icons/Columns";

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.linksContainer}>
          <Link
            url="/docs/building-blocks-of-oop-part-1/programming_paradigm"
            title="Building Blocks of OOP, Part 1, Part 2"
          >
            <Oop />
          </Link>
          <Link
            url="/docs/functional-programming/general_fp"
            title="Functional Programming"
          >
            <Fx />
          </Link>
          <Link
            url="/docs/design-patterns/design_patterns"
            title="Design Patterns"
          >
            <Puzzle />
          </Link>
          <Link
            url="/docs/solid-principles/introduction"
            title="SOLID Principles"
          >
            <Columns />
          </Link>
          <Link
            url="/docs/algorithms-and-data-structures-part-1/elementary_data_structures"
            title="Algorithms and Data Structures, Part 1, Part 2"
          >
            <Algorithm />
          </Link>
        </div>
      </main>
    </Layout>
  );
}
