import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./authApi";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Check your email for the reset link");
    },
    onError: (error) => {
      toast.error("Failed to send reset link", error.response?.data);
    },
  });
};
