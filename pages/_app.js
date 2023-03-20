import MyContext from './src/MyContext'
import '@/styles/common.scss'

export default function App({ Component, pageProps }) {
  return (
    <MyContext>
      <Component {...pageProps} />
    </MyContext>
  )
}
