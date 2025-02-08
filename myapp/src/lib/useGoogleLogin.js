import { useMutation } from "@tanstack/react-query";
import { fetchUser, googleLogin } from "./authApi";
import toast from "react-hot-toast";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";


export const useGoogleLogin = () => {
    const { setUser, setIsLoggedIn } = useUser();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: googleLogin,
        onSuccess: async () => {
            toast.success("Redirecting to Google...");
            // No need to do anything immediately since Google will redirect the user

            const res = await fetchUser();
            if (res.user) {
              setUser(res.user);
              setIsLoggedIn(true);
              localStorage.setItem("user", JSON.stringify(res.user));
      
              // Redirect to snacks page
              navigate("/snacks");
            }
        },
        onError: (error) => {
            toast.error("Google login failed:", error.response?.data);
        },
    });
};
