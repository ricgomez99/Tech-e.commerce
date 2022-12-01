import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import StateWrapper from "../components/statewrapper";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateWrapper>
        <SessionProvider>
        <Component {...pageProps} />
        </SessionProvider>
    </StateWrapper>

  );
}
