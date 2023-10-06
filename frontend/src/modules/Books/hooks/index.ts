import useSWR from "swr";
import { GET } from "@/modules/Books/service";

//TYPES
interface DataProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
  mutate?: any;
}

interface BookProps {
  bookId?: string;
  memberId?: string;
}

const useGetBooks = (): DataProps => {
  const URL = `books`;

  const { data, isLoading, error, mutate } = useSWR(URL, GET, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
};

const useGetHistoryBooks = (props: BookProps): DataProps => {
  const { bookId } = props;

  const URL = `history/book/${bookId}`;

  const { data, isLoading, error, mutate } = useSWR(bookId ? URL : null, GET, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    mutate,
    data: data?.data,
    isLoading,
    isError: error,
  };
};

const useGetMembers = (): DataProps => {
  const URL = `members`;

  const { data, isLoading, error } = useSWR(URL, GET, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
};

export { useGetBooks, useGetHistoryBooks, useGetMembers };
