import { useQuery } from "@tanstack/react-query";
import { getOrderByUser } from "./orderApi";

export const useOrderApi = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", id], // Unique key for the query including id
    queryFn: () => id ? getOrderByUser(id) : Promise.reject("User ID is missing"), // ✅ Prevent API call if ID is missing
    enabled: !!id,
  });
  
  return {
    data,
    isLoading,
    isError,
    error,
  };
}