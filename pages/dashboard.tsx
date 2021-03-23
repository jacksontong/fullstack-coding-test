import { Heading } from "@chakra-ui/layout";
import { fetchPosts, Post } from "api";
import useRequireAuth from "hooks/useRequireAuth";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import styles from "../styles/Home.module.css";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

const Dashboard = () => {
  const auth = useRequireAuth();
  const router = useRouter();
  const [posts, setPosts] = useImmer({
    allIds: [] as string[],
    byId: {} as { [k: string]: Post },
  });

  useEffect(() => {
    // fetch post on mounted
    fetchPosts().then(({ data }) => {
      setPosts((draft) => {
        draft.allIds = data.map((d) => d.id);
        draft.byId = _.keyBy(data, "id");
      });
    });
  }, []);

  useEffect(() => {
    // only allow admin to access this page
    if (auth.isAdmin === undefined) {
      router.push("/");
    }
  }, [auth, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h1">Posts</Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.allIds.map((id, i) => {
              const post = posts.byId[id];

              return (
                <Tr key={id}>
                  <Td>{i + 1}</Td>
                  <Td>{post.title}</Td>
                  <Td>
                    <img src="https://via.placeholder.com/100" alt="placeholder" />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </main>
    </div>
  );
};

export default Dashboard;
