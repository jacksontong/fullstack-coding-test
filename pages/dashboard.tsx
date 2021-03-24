import { Heading, HStack } from "@chakra-ui/layout";
import { deletePost, fetchPosts, Post } from "api";
import useRequireAuth from "hooks/useRequireAuth";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import styles from "../styles/Home.module.css";
import { Table, Thead, Tbody, Tr, Th, Td, Button, useToast, Spinner } from "@chakra-ui/react";

const Dashboard = () => {
  const auth = useRequireAuth();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useImmer({
    allIds: [] as string[],
    byId: {} as { [k: string]: Post },
  });

  useEffect(() => {
    setIsLoading(true);
    // fetch post on mounted
    fetchPosts()
      .then(({ data }) => {
        setPosts((draft) => {
          draft.allIds = data.map((d) => d.id);
          draft.byId = _.keyBy(data, "id");
        });
      })
      .finally(() => {
        setIsLoading(false);
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

        {isLoading && <Spinner />}

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Image</Th>
              <Th></Th>
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
                  <Td>
                    <HStack>
                      <Button colorScheme="teal">Edit</Button>
                      <Button
                        colorScheme="red"
                        onClick={async () => {
                          if (window.confirm("Are you sure to delete this post?")) {
                            await deletePost(post.id);
                            setPosts((draft) => {
                              delete draft.byId[id];
                              draft.allIds = posts.allIds.filter((curId) => curId !== id);
                            });

                            toast({
                              status: "success",
                              title: "Post deleted.",
                            });
                          }
                        }}>
                        Delete
                      </Button>
                    </HStack>
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
