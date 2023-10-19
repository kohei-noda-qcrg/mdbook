import { useState } from "react";

import { type Book } from "@prisma/client";

const Book = ({
  book,
  onDelete,
}: {
  book: Book;
  onDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        key={book.id}
        className={`collapse collapse-arrow border ${
          isOpen ? "collapse-open" : ""
        }`}
      >
        <div className="collapse-title" onClick={() => setIsOpen(!isOpen)} placeholder="Title">
          {book.title}
        </div>
        <div className="collapse-content">
          <div>{book.description}</div>
          <div>{book.author ?? ""}</div>
          <div>{book.coverImage ?? ""}</div>
          <div>{book.content}</div>
        </div>
        {/* Add edit button at the right bottom of this component */}
        <div className="card-actions mx-3 flex justify-end p-1">
          <div className="btn btn-primary btn-sm">
            <a href={`edit/${book.id}`}>Edit</a>
          </div>
          <div className="btn btn-primary btn-outline btn-sm">
            <a href="#" onClick={onDelete}>
              Delete
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Book;
