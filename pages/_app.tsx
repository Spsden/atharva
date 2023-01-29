import '../styles/globals.css'
import 'winbox/dist/css/winbox.min.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
