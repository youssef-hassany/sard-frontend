import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../constants/base-url";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../../constants/token-key";

const updateMe = async (formData) => {
  const token = Cookies.get(TOKEN_KEY);

  try {
    const response = await fetch(`${BASE_URL}/api/User/update-me`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });
};
