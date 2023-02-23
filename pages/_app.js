import { useSession } from '@/lib/session'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const { didLoad, session } = useSession()

  const newPageProps = {
    ...pageProps,
    session
  }

  return didLoad && <Component {...newPageProps} />
}
