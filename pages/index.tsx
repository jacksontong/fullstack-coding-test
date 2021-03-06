import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import useRequireAuth from "hooks/useRequireAuth";
import Nav from "components/Nav";

const Home = () => {
  const auth = useRequireAuth();

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

      <Nav />

      <main className={styles.main}>
        <DynamicText ref={ref} />
        <Input onChange={onChange} />
      </main>
    </div>
  );
};

export default Home;
