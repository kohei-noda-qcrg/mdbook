import Head from "next/head";
import Book from "~/components/Book";
import { useRouter } from "next/router";
import { useBooks } from "~/hooks/books";
import { useSession } from "next-auth/react";

export default function SideBar() {
  const { data: session } = useSession();
  const { books: books } = useBooks();
  const { createNewBook } = useBooks();

  const router = useRouter();
  const handleNewBook = async () => {
    const bookId = await createNewBook();
    await router.push(`/edit/${bookId}`);
  };

  const handleViewBook = async (book: Book) => {
    await router.push(`/view/${book.id}`);
  };

  return (
    <>
      <Head>
        <title>mdbook - Markdown book memo</title>
      </Head>
      <div className="flex flex-col gap-2">
        {books?.map((book: Book) => (
          <Book
            key={book.id}
            onViewBook={() => {
              void handleViewBook(book);
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
