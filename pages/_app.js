import MyContext from "./src/MyContext";
import "@/styles/common.scss";
import { SessionProvider } from "next-auth/react";
import Head from 'next/head'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>본 스케치</title>
      </Head>
      <MyContext>
        <Component {...pageProps} />
      </MyContext>
    </SessionProvider>
  );
}
