import { type Book } from "@prisma/client";

const Book = ({ book, onViewBook }: { book: Book; onViewBook: () => void }) => {
  return (
    <>
      <div
        key={book.id}
        className="btn flex justify-start"
        onClick={onViewBook}
      >
        <span className="truncate">{book.title}</span>
      </div>
    </>
  );
};
export default Book;
