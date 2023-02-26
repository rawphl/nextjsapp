import Head from "next/head"
import styles from "./profile.module.css"

export default function Profile({ session }) {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className={styles.profile}>
        <pre>{JSON.stringify(session, null, 4)}</pre>
      </main>
    </>
  )
}

export async function getStaticProps() {
    return {
        props: {
            privatePage: true
        }
    }
}