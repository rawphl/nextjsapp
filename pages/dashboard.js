import { fetchPosts } from "@/lib/services/posts"
import Head from "next/head"
import { useQuery } from "@tanstack/react-query"
import styles from "./dashboard.module.css"
import Image from "next/image"

function usePosts({ initialData }) {
  return useQuery(
    ["posts"],
    fetchPosts, 
    {
      staleTime: 1000 * 60 * 60,
      initialData
    }
  )
}

export default function Dashboard(props) {
  const { data: posts, error } = usePosts({ initialData: props.posts })
  if (!posts) return <div>Loading</div>
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
          posts.map(post => (
            <article key={post.id} className={styles.post}>
              <h2>{post.title}</h2>
              <Image
                src="https://via.placeholder.com/398x250"
                alt={`${post.id}-image`}
                width={398}
                height={250}
                priority
              />
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
