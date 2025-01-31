import axios from "axios";

export async function login(userDetails) {
  const res = await axios.post(
    "http://localhost:3000/api/users/login",
    userDetails,
    {
      withCredentials: true, // 🔥 Ensure cookies are included
    }
  );
  return res.data;
}
export async function signup(formData) {
  console.log(formData);
  const res = await axios.post(
    "http://localhost:3000/api/users/signup",
    formData
  );
  return res.data;
}
