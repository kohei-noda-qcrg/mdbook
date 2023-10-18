import React from "react";
// import MarkdownEditor from "@uiw/react-markdown-editor";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

import { type Book } from "@prisma/client";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

const Edit = (book: Book) => {
  return (
    <>
      <MarkdownEditor value={book.content} height="100vh" />
    </>
  );
};
export default Edit;
