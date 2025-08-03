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

    const data = await response.json();

    // Check if the HTTP request was successful
    if (!response.ok) {
      // If there's an error message in the response, use it
      throw new Error(data.message || data.title || "Login failed");
    }

    // If we get here and have an accessToken, login was successful
    if (!data.accessToken) {
      throw new Error("No access token received");
    }

    return data.accessToken;
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
