import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { api } from "~/utils/api";
import { Loading } from "~/components/Loading";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { type Book } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { useBooks } from "~/hooks/books";

const View = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { deleteBook } = useBooks();
  const { data: book } = api.book.getOne.useQuery(
    { id: router.query.id as string },
    { enabled: session?.user !== undefined, retry: true },
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (book) {
      setBookData(book);
    }
  }, [book]);

  const [bookData, setBookData] = useState<Book | null>(book ?? null);

  if (!bookData) {
    return <Loading />;
  }

  return (
    <>
      {book && (
        <div className="px-2">
          <div className="flex gap-5">
              <span className="inline-block text-4xl font-bold truncate">{book.title}</span>
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
                void deleteBook(book);
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
    </>
  );
};
export default View;
