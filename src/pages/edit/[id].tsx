import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { api } from "~/utils/api";
import { Loading } from "~/components/Loading";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { type Book } from "@prisma/client";
import { useBooks } from "~/hooks/books";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

const Edit = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { handleUpdate, handleUpdateWithNoTimeout, isUpdated } = useBooks();
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
  // If ctrl + s is pressed, save the content
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.key === "s" && bookData) {
      e.preventDefault();
      handleUpdate.mutate({
        id: bookData.id,
        title: bookData.title,
        content: bookData.content,
      });
    }
  };

  const handleOnChange = (value: string) => {
    const newBookData = { ...bookData, content: value };
    setBookData(newBookData);
  };

  return (
    <>
      <div
        className="mx-auto h-screen w-11/12 flex-1"
        onKeyDown={handleKeyDown}
      >
        <div className="flex justify-between">
          <div tabIndex={0} className="dropdown">
            <label className="btn m-1">
              <p placeholder="Title">{bookData?.title}</p>
            </label>
            <div
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
            >
              <label className="text-sm">Title</label>
              <input
                className="rounded-md px-4 py-2"
                value={bookData?.title}
                onChange={(e) => {
                  const newTitle = e.currentTarget.value;
                  setBookData({ ...bookData, title: newTitle });
                  handleUpdateWithNoTimeout.mutate({
                    id: bookData.id,
                    title: newTitle,
                  });
                }}
              />
              <label className="text-sm">Author</label>
              <input
                className="rounded-md px-4 py-2"
                value={bookData?.author ?? ""}
                onChange={(e) => {
                  const newAuthor = e.currentTarget.value;
                  setBookData({ ...bookData, author: newAuthor });
                  handleUpdateWithNoTimeout.mutate({
                    id: bookData.id,
                    author: newAuthor,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <MarkdownEditor
          value={bookData?.content}
          height="80vh"
          width="100%"
          onChange={(v) => {
            handleOnChange(v);
          }}
          visible={true}
        />
      </div>
      <div
        className={`alert alert-success fixed bottom-0 left-0 right-0 mx-auto w-1/2 animate-updated ${
          isUpdated ? "" : "hidden"
        }`}
      >
        <p>Updated!</p>
      </div>
    </>
  );
};
export default Edit;
