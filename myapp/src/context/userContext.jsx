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



  useEffect(() => {
  const token = Cookies.get("token");
  const params = new URLSearchParams(location.search);
  const userData = params.get("user");
  const urlToken = params.get("token");

  if (userData && urlToken) {
    const parsedUser = JSON.parse(decodeURIComponent(userData));
    localStorage.setItem("user", JSON.stringify(parsedUser));

    // Store token in cookie
    Cookies.set("token", urlToken, { secure: true, sameSite: "None", path: "/" });

    // Clear URL params after storing
    navigate("/snacks", { replace: true });
  }

  const storedUser = localStorage.getItem("user");
  if (token && storedUser) {
    setUser(JSON.parse(storedUser));
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
