import axios from "axios";
export const getMenuItem = async function (category) {
  console.log(category);
  const data = await axios({
    method: "GET",
    url: `http://127.0.0.1:3000/api/menu?category=${category}`,
  });
  return data;
};

export const createMenuItem = async function ({ data }) {
  const res = await axios({
    method: "POST",
    url: "http://127.0.0.1:3000/api/menu",
    data: data,
  });
  return res;
};
