import axios from "axios";
export const getMenuItem = async function (category) {
  const data = await axios({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/api/menu?category=${category}`,
  });
  return data;
};

export const createMenuItem = async function ( data ) {
  try{
    const res = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/menu`,
      data: data,
    });
    return res;
  }catch(e){
    throw new Error("Failed to create menu item",e);
  }
};

export const updateMenuItem = async function ({ id, data }) {
  const res = await axios({
    method: "PATCH",
    url: `${import.meta.env.VITE_BACKEND_URL}/api/menu/${id}`,
    data: data,
  });
  return res;
};

export const deleteMenuItems = async function (id){
  const res = await axios({
    method: "DELETE",
    url: `${import.meta.env.VITE_BACKEND_URL}/api/menu/${id}`,
  });
  return res;
}