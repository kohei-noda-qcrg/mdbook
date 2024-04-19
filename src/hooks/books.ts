import { type Book } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

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

  const [isUpdated, setIsUpdated] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const handleUpdate = api.book.update.useMutation({
    onSuccess: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsUpdated(false);
      setTimeout(() => {
        setIsUpdated(true);
      }, 10);
      const timeOutId = setTimeout(() => {
        setIsUpdated(false);
      }, 1700);
      setTimeoutId(timeOutId);
    },
  });

  const handleUpdateWithNoTimeout = api.book.update.useMutation({});

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

  return {
    books,
    refetchBooks,
    createNewBook,
    deleteBook,
    isUpdated,
    handleUpdate,
    handleUpdateWithNoTimeout,
  };
}
