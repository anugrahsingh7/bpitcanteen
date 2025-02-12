// src/context/LiveContext.js

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
// Create a Context for the live state
const LiveContext = createContext();

// Create a Provider component
export const LiveProvider = ({ children }) => {
  const [isLive, setIsLive] = useState(true);
  const [vendorInfo, setVendorInfo] = useState({});

  return (
    <LiveContext.Provider
      value={{ vendorInfo, setVendorInfo, isLive, setIsLive }}
    >
      {children}
    </LiveContext.Provider>
  );
};

// Custom hook to use the LiveContext
export const useLive = () => {
  return useContext(LiveContext);
};
