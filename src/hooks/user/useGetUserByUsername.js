import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../constants/base-url";

const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/api/User/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const useGetUserByUsername = (username) => {
  return useQuery({
    queryKey: ["user-data", username],
    queryFn: () => getUserByUsername(username),
    enabled: !!username,
  });
};
