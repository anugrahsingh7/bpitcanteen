import { useQuery } from "@tanstack/react-query";
import { getMenuItem } from "./menuApi";

export const useMenuApi = (category) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menuItem", category],
    queryFn: () => getMenuItem(category),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
