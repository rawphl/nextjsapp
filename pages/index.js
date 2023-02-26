import Head from "next/head"
import styles from "./index.module.css"

export default function Index() {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <main className={styles.index}>
        <h1>Index</h1>
      </main>
    </>
  )
}