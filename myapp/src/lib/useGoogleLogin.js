import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { googleLogin } from "./authApi";

export const useGoogleLogin = () => {
  const { setUser, setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: googleLogin,
    onSuccess: async () => {
      toast.success("Redirecting...");
      // No need to do anything immediately since Google will redirect the user
    },
    onError: (error) => {
      toast.error("Google login failed:", error.response?.data);
    },
  });
};
