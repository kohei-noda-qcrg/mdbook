import { useSession } from "next-auth/react";
import Head from "next/head";
import Book from "~/components/Book";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();

  const { data: books, refetch: refetchBooks } = api.book.getAll.useQuery(
    undefined,
    { enabled: session?.user !== undefined, retry: true },
  );

  const deleteBook = api.book.delete.useMutation({
    onSuccess: () => refetchBooks(),
  });

  const createBook = api.book.create.useMutation({});

  const router = useRouter();
  const handleNewBook = async () => {
    console.log("handleNewBook");
    const emptyBook = {
      title: "",
      description: "",
      content: "",
    };
    const bookId = await createBook.mutateAsync(emptyBook);
    console.log("bookId", bookId);
    await router.push(`/edit/${bookId}`);
  };

  return (
    <>
      <Head>
        <title>mdbook - Markdown book memo</title>
      </Head>
      <div className="mx-2 flex justify-center">
        {books?.map((book: Book) => (
          <Book
            key={book.id}
            onDelete={() => {
              deleteBook.mutate({ id: book.id });
            }}
            book={book}
          />
        ))}
        <div
          className="btn"
          onClick={() => {
            void handleNewBook();
          }}
        >
          Add new book
        </div>
      </div>
    </>
  );
}
