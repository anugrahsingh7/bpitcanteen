import { useMutation, useQuery } from "@tanstack/react-query";
import { createMenuItem, deleteMenuItems, getMenuItem, updateMenuItem } from "./menuApi";


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

export const useUpdateMenu = () =>{
  const { mutate, isLoading, isError, error } = useMutation({
     mutationFn: ({id ,data}) => updateMenuItem({id,data}),

  });
  
  return {mutate, isLoading, isError};
}

export const useDeleteMenu = () =>{
  const { mutate, isLoading, isError, error } = useMutation({
     mutationFn: (id) => deleteMenuItems(id),
  });

  return {mutate,isLoading}
}

export const useCreateMenu = () =>{ 
  const { mutate, isLoading, isError, error } = useMutation({
     mutationFn: (data) => createMenuItem(data),
  });

  return {mutate,isLoading};
}

