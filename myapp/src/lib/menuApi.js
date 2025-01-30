import axios from "axios";
export const getMenuItem = async function () {
  const data = await axios({
    method: "GET",
    url: "http://127.0.0.1:3000/api/menu",
  });
  console.log(data);
  return data;
};
