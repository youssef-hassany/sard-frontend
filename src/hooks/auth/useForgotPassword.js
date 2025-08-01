import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../constants/base-url";

const forgotPassword = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/identity/forget-password`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Operation failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Operation error:", error);
    throw error;
  }
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: forgotPassword,
  });
};
