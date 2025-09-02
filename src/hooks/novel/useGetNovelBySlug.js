import { BASE_URL } from "../../constants/base-url";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../../constants/token-key";
import { useQuery } from "@tanstack/react-query";

const getNovel = async (novelSlug) => {
  const accessToken = Cookies.get(TOKEN_KEY);

  try {
    const response = await fetch(`${BASE_URL}/api/novel/${novelSlug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Error loading novel");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetNovelBySlug = (slug) => {
  return useQuery({
    queryKey: ["novel", slug],
    queryFn: () => getNovel(slug),
  });
};
