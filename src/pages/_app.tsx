// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import type { AppRouter } from "../server/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { registerLicense } from "@syncfusion/ej2-base";
import { env } from "../env/client.mjs";
import { Provider, useCreateStore } from "../store/dash-store";

registerLicense(env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY);

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface ThemeInterface {
  colors: {
    primary: string;
  };
}

const theme: ThemeInterface = {
  colors: {
    primary: "#0070f3",
  },
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const createStore = useCreateStore(pageProps.initialZustandState);
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider createStore={createStore}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
