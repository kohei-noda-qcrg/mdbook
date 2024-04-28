type BookIdTitle ={
  id: string
  title: string
}

const Book = ({ book, onViewBook }: { book: BookIdTitle; onViewBook: () => void }) => {
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
