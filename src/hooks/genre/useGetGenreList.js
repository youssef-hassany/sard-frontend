import { BASE_URL } from "../../constants/base-url";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../../constants/token-key";
import { useQuery } from "@tanstack/react-query";

const getGenres = async () => {
  const accessToken = Cookies.get(TOKEN_KEY);

  try {
    const response = await fetch(`${BASE_URL}/api/genre`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Error loading Genres");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetGenresList = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
};
