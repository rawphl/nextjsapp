import Head from "next/head"
import styles from "./dashboard.module.css"

export default function Dashboard({ posts }) {
  console.log({ posts })
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={styles.dashboard}>
        <h1>Dashboard</h1>
        {
          posts.map(post => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))
        }
      </main>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts = await response.json()
  return {
    props: {
      privatePage: true,
      posts
    }
  }
}
