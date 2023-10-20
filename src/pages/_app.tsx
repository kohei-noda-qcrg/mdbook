import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Header } from "~/components/Header";
import SideBar from "~/components/SideBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <main className="w-screen min-w-fit">
        <div className="flex">
          <div className="w-1/6">
            <SideBar />
          </div>
          <div className="w-5/6">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
