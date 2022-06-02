import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useReconhece } from "./hooks/useReconhece";

const Home: NextPage = () => {
  const { loading, data } = useReconhece("Home/config");

  return (
    <div className={styles.container}>
      <Head>
        <title>teste</title>
      </Head>

      <main className={styles.main}>
        {loading ? <span>loading</span> : JSON.stringify(data)}
      </main>
    </div>
  );
};

export default Home;
