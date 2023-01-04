import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import StateWrapper from "../components/statewrapper";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateWrapper>
      <SessionProvider>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </StateWrapper>
  );
}
