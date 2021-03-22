import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { useRouter } from "next/router";
import useRequireAuth from "hooks/useRequireAuth";

const Home = () => {
  const auth = useRequireAuth();
  const router = useRouter();
  const toast = useToast();

  // this will be inferred as `DynamicTextHandle`
  type DynamicTextHandle = React.ElementRef<typeof DynamicText>;
  const ref = useRef<DynamicTextHandle>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    ref.current.changeValue(e.target.value);
  };

  if (!auth) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicText ref={ref} />
        <Input onChange={onChange} />

        <Button
          onClick={async () => {
            await auth.signout();
            toast({
              status: "warning",
              title: "Goodbye.",
            });
            router.push("/signin");
          }}
          mt="3">
          Logout
        </Button>
      </main>
    </div>
  );
};

export default Home;
