import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../constants/base-url";

const login = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/identity/Login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
