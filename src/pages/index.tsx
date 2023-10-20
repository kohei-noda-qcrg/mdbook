import { useSession } from "next-auth/react";
import Head from "next/head";
import Book from "~/components/Book";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

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

  const [book, setBook] = useState<Book | null>(null);

  return (
    <>
      <Head>
        <title>mdbook - Markdown book memo</title>
      </Head>
      <div className="flex">
        <div className="flex w-1/4 flex-col gap-2">
          {books?.map((book: Book) => (
            <Book
              key={book.id}
              onViewBook={(book: Book) => {
                setBook(book);
              }}
              book={book}
            />
          ))}
          <div
            className="btn btn-info btn-outline"
            onClick={() => {
              void handleNewBook();
            }}
          >
            Add new book
          </div>
        </div>
        {book && (
          <div className="mx-2 w-3/4">
            <div className="flex gap-5">
              <div className="text-4xl font-bold">{book.title}</div>
              <div
                className="btn btn-info btn-outline"
                onClick={() => {
                  void router.push(`/edit/${book.id}`);
                }}
              >
                Edit
              </div>
              <div
                className="btn btn-warning btn-outline"
                onClick={() => {
                  deleteBook.mutate({ id: book.id });
                }}
              >
                Delete
              </div>
            </div>
            <div className="text-2xl">{book.description}</div>
            <div className="prose lg:prose-xl">
              <ReactMarkdown>{book.content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
