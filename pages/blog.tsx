import Head from "next/head";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import firebase from "firebase";
import { useImmer } from "use-immer";
import _ from "lodash";
import { SimpleGrid, GridItem } from "@chakra-ui/react";

const Blog = () => {
  const [posts, setPosts] = useImmer({
    allIds: [] as string[],
    byId: {} as { [k: string]: any },
  });

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const allPosts = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));

        setPosts((draft) => {
          draft.byId = _.keyBy(allPosts, "id");
          draft.allIds = allPosts.map((p) => p.id);
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SimpleGrid columns={4}>
          {posts.allIds.map((id) => {
            const post = posts.byId[id];

            return (
              <GridItem key={id}>
                <div className={styles.grid}>
                  <div className={styles.card}>
                    <h3>{post.title}</h3>
                    <img src="https://via.placeholder.com/300" alt="placeholder" />
                  </div>
                </div>
              </GridItem>
            );
          })}
        </SimpleGrid>
      </main>
    </div>
  );
};

export default Blog;
