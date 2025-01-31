import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "./authApi";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful");
    },
    onError: (error) => {
      toast.error("Password reset failed", error.response?.data);
    },
  });
};
