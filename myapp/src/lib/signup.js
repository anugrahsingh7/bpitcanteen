import { useMutation } from "@tanstack/react-query";
import { signup } from "./authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signup successful!");
      navigate("/login"); // Redirect after successful signup
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Signup failed!");
    },
  });
};
