import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import { Disclosure } from "@headlessui/react";
import { Header } from "~/components/Header";
import SideBar from "~/components/SideBar";
import "~/styles/globals.css";
import { useAtom } from "jotai";
import { isSidebarOpen } from "~/atom/sidebarIsOpen";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [isOpenSidebar, setIsOpenSidebar] = useAtom(isSidebarOpen);
  return (
    <SessionProvider session={session}>
      <Header />
      <main>
        <div className="container grid gap-8 pb-2 md:grid-cols-[240px_1fr] md:gap-12 md:px-6">
          <Disclosure as="nav">
            <Disclosure.Button onClick={() => setIsOpenSidebar(!isOpenSidebar)} className="group peer absolute left-4 top-4 inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:block md:hidden"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Disclosure.Button>
            {isOpenSidebar && <div className="fixed inset-0 z-10" onClick={() => setIsOpenSidebar(false)}></div>}
            <div className={`${isOpenSidebar ? 'left-0' : '-left-96'} peer:transition z-20 p-6 delay-150 duration-200 ease-out peer-focus:left-0 fixed -left-96 top-0 h-screen bg-gray-700 md:static md:left-0 md:w-60 md:bg-inherit`}>
              <div className="h-full w-64">
                <SideBar />
              </div>
            </div>
          </Disclosure>
          <div className="max-w-[100vw]">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
