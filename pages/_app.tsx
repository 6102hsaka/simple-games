import type { AppProps } from "next/app";

import Header from "../component/Header";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
