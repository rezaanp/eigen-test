import useSWR from "swr";
import { GET } from "@/modules/Members/service";

//TYPES
interface DataProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

interface MemberProps {
  memberId: string;
}

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

const useGetHistoryMember = (props: MemberProps): DataProps => {
  const { memberId } = props;

  const URL = `history/member/${memberId}`;

  const { data, isLoading, error } = useSWR(memberId ? URL : null, GET, {});

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
};

export { useGetMembers, useGetHistoryMember };
