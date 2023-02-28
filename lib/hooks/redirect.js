import Router, { useRouter } from "next/router"
import { useEffect } from "react"

export default function useRedirect({ pageProps, session, isInitialized }) {
  const router = useRouter()
  const { isReady, pathname, asPath } = router

  useEffect(() => {
    if (isReady && isInitialized) {
      if (pageProps.privatePage && !session) {
        Router.push(`/auth/login?next=${asPath}`)
      }

      if (pathname === "/auth/login" && session) {
        Router.replace("/")
      }
    }
  }, [isReady, pathname, asPath, session, pageProps, isInitialized])

  return router
}