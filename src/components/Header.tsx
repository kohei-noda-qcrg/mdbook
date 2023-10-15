import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between border-b-4 border-indigo-600 bg-white px-6 py-4">
      <div className="flex items-center">
        <div className="text-xl font-bold text-gray-800 hover:text-gray-700">
          mdbook - Markdown book memo
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => void signOut()}
            >
              Logout
            </button>
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
