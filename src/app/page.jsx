import Head from "next/head";
import styles from "./page.module.scss";
import MainSection from "../components/mainsection/mainsection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ana Sayfa</title>
        <meta name="description" content="Ankara özel ders sayfamız." />
        <meta name="keywords" content="Matematik dersleri, Özel matematik dersi, Ankara özel ders" />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className={styles.main}>
        <MainSection />
      </main>
    </>
  );
}
