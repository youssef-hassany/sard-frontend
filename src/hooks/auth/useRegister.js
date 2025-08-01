import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../constants/base-url";

const register = async (formData) => {
  try {
    await fetch(`${BASE_URL}/api/identity/Register`, {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.error(error);
  }
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });
};
