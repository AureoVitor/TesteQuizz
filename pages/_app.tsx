import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ErorTest } from "./hooks/Error";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErorTest>
      <Component {...pageProps} />
    </ErorTest>
  );
}

export default MyApp;
