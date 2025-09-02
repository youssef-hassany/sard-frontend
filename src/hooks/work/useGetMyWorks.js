import { BASE_URL } from "../../constants/base-url";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../../constants/token-key";
import { useInfiniteQuery } from "@tanstack/react-query";

const getMyWork = async (page) => {
  const accessToken = Cookies.get(TOKEN_KEY);

  try {
    const response = await fetch(`${BASE_URL}/api/myWorks?Page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Error getting user work");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetMyWorks = () => {
  return useInfiniteQuery({
    queryKey: ["my-works"],
    queryFn: ({ pageParam = 1 }) => getMyWork(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // If the current page number is less than total pages, return next page
      const currentPage = allPages.length;
      return currentPage < lastPage.totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
