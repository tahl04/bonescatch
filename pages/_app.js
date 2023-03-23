import MyContext from "./src/MyContext";
import "@/styles/common.scss";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MyContext>
        <Component {...pageProps} />
      </MyContext>
    </SessionProvider>
  );
}
