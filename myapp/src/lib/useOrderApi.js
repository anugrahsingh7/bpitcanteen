import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  getOrderByUser,
  getOrders,
  updateOrder,
} from "./orderApi";
import toast from "react-hot-toast";

export const useOrderApi = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", id], // Unique key for the query including id
    queryFn: () =>
      id ? getOrderByUser(id) : Promise.reject("User ID is missing"), // ✅ Prevent API call if ID is missing
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const useCreateOrderByUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order) => createOrder(order), // ✅ Pass order dynamically
    onSettled: (_, __, variables) =>
      queryClient.invalidateQueries(["orders", variables.userId]),
  });
};

export const useGetAllOrders = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"], // Unique key for the query
    queryFn: () => getOrders(),
  });
  return { data, isLoading, isError, error };
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateOrder({ id, status }),
    onSuccess: () => {
      toast.success("Order Prepared");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
