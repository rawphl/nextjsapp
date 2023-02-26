import Header from "@/components/Header"
import useRedirect from "@/lib/hooks/redirect"
import { useSession } from "@/lib/hooks/session"
import { Titillium_Web as Font } from "@next/font/google"
import Head from "next/head"
import "./_app.css"

const font = Font({ subsets: ["latin"], weight: "400" })

export default function App({ Component, pageProps }) {
  const { session, isInitialized, signIn, signOut } = useSession()
  const router = useRedirect({ pageProps, session, isInitialized })
  const props = {
    ...pageProps,
    session,
    signIn,
    signOut
  }

  return isInitialized && (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div id="app" className={font.className}>
        <Header
          router={router}
          session={session}
          signOut={signOut}
        />

        <Component {...props}
        />
      </div>
    </>
  )
}
