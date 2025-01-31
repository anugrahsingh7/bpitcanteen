import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
