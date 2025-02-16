import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { LiveProvider } from "./context/LiveContext.jsx";
import { VendorProvider } from "./context/vendorContext.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LiveProvider>
        <VendorProvider>
         <App />
        </VendorProvider>
      </LiveProvider>
    </QueryClientProvider>
  </StrictMode>
);
