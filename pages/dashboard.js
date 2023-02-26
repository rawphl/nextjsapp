import { fetchPosts } from "@/lib/services/posts"
import Head from "next/head"
import { useQuery } from '@tanstack/react-query'
import styles from "./dashboard.module.css"
import Image from "next/image"

function usePosts({ initialData }) {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts, initialData, cacheTime: 10000})
}

export default function Dashboard({ posts }) {
  const { data, error } = usePosts({ initialData: posts })
  if (!data) return <div>Loading</div>
  if (error) return <div>{`An error has occurred: ${error.message}`}</div>
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
          data?.map(post => (
            <article key={post.id} className={styles.post}>
              <h2>{post.title}</h2>
              <Image src="https://via.placeholder.com/398x250" width={398} height={250} priority alt={post.id + "-img"}/>
              <p>{post.body}</p>
            </article>
          ))
        }
      </main>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      privatePage: true,
      posts: await fetchPosts()
    }
  }
}
