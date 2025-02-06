import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { login } from "./authApi";
import toast from "react-hot-toast";
import { useUser } from "../context/userContext";

export const useLogin = () => {
  const { setUser, setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Login successful");
      const { password, ...userWithoutPassword } = data.data.user;
      setUser(userWithoutPassword);
      setIsLoggedIn(true);

      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      navigate("/snacks"); // Redirect after successful login
    },
    onError: (error) => {
      toast.error("Login failed:", error.response?.data);
    },
  });
};
