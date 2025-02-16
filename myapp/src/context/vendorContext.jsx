import { createContext, useState, useContext } from "react";
const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  );

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <VendorContext.Provider
      value={{ isLoggedIn, setIsLoggedIn,login,logout }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => useContext(VendorContext);
