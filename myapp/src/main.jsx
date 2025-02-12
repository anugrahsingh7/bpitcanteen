import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { LiveProvider } from "./context/LiveContext.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LiveProvider>
        <App />
      </LiveProvider>
    </QueryClientProvider>
  </StrictMode>
);
