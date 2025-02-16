import axios from "axios";
export const getMenuItem = async function (category) {
  const data = await axios({
    method: "GET",
    url: `http://127.0.0.1:3000/api/menu?category=${category}`,
  });
  return data;
};

export const createMenuItem = async function ( data ) {
  try{
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/menu",
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
    url: `http://127.0.0.1:3000/api/menu/${id}`,
    data: data,
  });
  return res;
};

export const deleteMenuItems = async function (id){
  const res = await axios({
    method: "DELETE",
    url: `http://127.0.0.1:3000/api/menu/${id}`,
  });
  return res;
}