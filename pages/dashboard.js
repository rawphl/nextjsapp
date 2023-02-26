import Head from "next/head"
import styles from "./dashboard.module.css"

export default function Dashboard({ posts }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main className={styles.dashboard}>
        <div>
          <h1>Dashboard</h1>
          <h2>nextjsapp</h2>
        </div>

        {
          posts.map(post => (
            <article key={post.id} className={styles.post}>
              <h2>{post.title}</h2>
              <img src="https://via.placeholder.com/398x250" width={398} height={250} />
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
