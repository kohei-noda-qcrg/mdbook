import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleTitleClick = async () => {
    await router.push("/");
  };

  return (
    <header className="navbar mb-5 flex items-center justify-between border-b-2 px-6 py-2">
      <div className="flex-1">
        <div
          className="btn text-xl font-bold"
          onClick={() => void handleTitleClick()}
        >
          mdbook - Markdown book memo
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={session.user.image ?? ""} alt="avatar" />
                  </div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box menu-sm z-[1] w-52 bg-base-300 p-2 shadow"
              >
                <li>
                  <a
                    className="flex items-center justify-between"
                    onClick={() => void signOut()}
                  >
                    <span>Sign out</span>
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-primary" onClick={() => void signIn()}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
};
