import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import StateWrapper from "../components/statewrapper";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateWrapper>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </StateWrapper>
  );
}
