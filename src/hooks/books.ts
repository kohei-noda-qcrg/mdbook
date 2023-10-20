import { type Book } from "@prisma/client";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

export function useBooks() {
  const { data: session } = useSession();
  const { data: books, refetch: refetchBooks } = api.book.getAll.useQuery(
    undefined,
    { enabled: session?.user?.id !== undefined },
  );

  const createBookMutation = api.book.create.useMutation({
    onSuccess: () => {
      void refetchBooks();
    },
  });

  const deleteBookMutation = api.book.delete.useMutation({
    onSuccess: () => {
      void refetchBooks();
    },
  });

  const createNewBook = async (): Promise<string> => {
    const emptyBook = {
      title: "",
      description: "",
      content: "",
    };
    const bookId = await createBookMutation.mutateAsync(emptyBook);
    return bookId;
  };

  const deleteBook = async (book: Book): Promise<void> => {
    await deleteBookMutation.mutateAsync({ id: book.id });
  };

  return { books, refetchBooks, createNewBook, deleteBook };
}
