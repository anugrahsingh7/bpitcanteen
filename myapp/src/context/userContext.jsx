import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log("USER PROVIDER IS RUNNING ");
  useEffect(() => {
    const token = Cookies.get("token");
    const params = new URLSearchParams(location.search);
    const userData = params.get("user");
    console.log("Token from Cookies:", token);
    console.log("UserData from URL:", userData);
    if (userData) {
      const parsedUser = JSON.parse(decodeURIComponent(userData));
      localStorage.setItem("user", JSON.stringify(parsedUser));
      navigate("/snacks", { replace: true });
    }
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Correctly retrieve user from localStorage
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }

    setLoading(false);
  }, [location.search, navigate]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
