import Head from "next/head"
import Link from "next/link"
import styles from "./index.module.css"

export default function Index({ session }) {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <main className={styles.index}>
        <h1>Index</h1>
        {session && <Link href="/dashboard">Dashboard</Link>}
      </main>
    </>
  )
}