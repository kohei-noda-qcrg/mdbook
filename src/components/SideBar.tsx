import Head from "next/head";
import Book from "~/components/Book";
import { useRouter } from "next/router";
import { useBooks } from "~/hooks/books";
import { useSession } from "next-auth/react";
import { isSidebarOpen } from "~/atom/sidebarIsOpen";
import { useAtom } from "jotai";

export default function SideBar() {
  const { data: session } = useSession();
  const { books: books } = useBooks();
  const { createNewBook } = useBooks();

  const router = useRouter();
  const handleNewBook = async () => {
    setIsSidebarOpen(false);
    const bookId = await createNewBook();
    await router.push(`/edit/${bookId}`);
  };

  const handleViewBook = async (bookId: string) => {
    setIsSidebarOpen(false);
    await router.push(`/view/${bookId}`);
  };

  const [, setIsSidebarOpen] = useAtom(isSidebarOpen);
  return (
    <>
      <Head>
        <title>mdbook - Markdown book memo</title>
      </Head>
      <div className="flex flex-col gap-2">
        {books?.map((book) => (
          <Book
            key={book.id}
            onViewBook={() => {
              void handleViewBook(book.id);
            }}
            book={book}
          />
        ))}
        {session?.user && (
          <div
            className="btn btn-info btn-outline"
            onClick={() => {
              void handleNewBook();
            }}
          >
            Add new book
          </div>
        )}
      </div>
    </>
  );
}
