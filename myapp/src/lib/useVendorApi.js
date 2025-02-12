import { useMutation, useQuery } from "@tanstack/react-query";
import { getVendor, updateVendor } from "./vendorApi";

export const useVendor = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vendor"],
    queryFn: getVendor,
  });
  return { data, isLoading };
};

export const useUpdateVendor = () => {
  return useMutation({
    mutationFn: ({ status, id }) => updateVendor({ status, id }),
  });
};
