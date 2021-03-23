import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";

const Blog = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Blog title</h3>
            <img src="https://via.placeholder.com/300" alt="placeholder" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
