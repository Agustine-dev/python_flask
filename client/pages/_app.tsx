// import { UserContextProvider } from '../context/userContext'
import './index.css'

export default function App({ Component, pageProps }) {
  // optionally pass the 'user' prop from pages that require server-side
  // rendering to prepopulate the 'useUser' hook.

  const { user } = pageProps

  return (
      <Component {...pageProps} />
  )
}
