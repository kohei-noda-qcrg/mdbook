import { type Book } from "@prisma/client";

const Book = ({ book, onViewBook }: { book: Book; onViewBook: () => void }) => {
  return (
    <>
      <div
        key={book.id}
        className="btn flex justify-start"
        onClick={onViewBook}
      >
        {book.title}
      </div>
    </>
  );
};
export default Book;
