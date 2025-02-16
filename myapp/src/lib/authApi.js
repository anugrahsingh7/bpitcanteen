import axios from "axios";

export async function login(userDetails) {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
    userDetails,
    {
      withCredentials: true, // 🔥 Ensure cookies are included
    }
  );
  return res.data;
}
export async function signup(formData) {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
    formData
  );
  return res.data;
}

export async function forgotPassword(email) {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/forgotPassword`,
    { email }
  );
  return res.data;
}

export async function resetPassword({ email, token, newPassword }) {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/resetPassword/${token}`,
    { email, newPassword }
  );
  return res.data;
}

export async function fetchUser() {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`, {
    withCredentials: true,
  });
  return res.data;
}

export async function googleLogin() {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`; // Redirect to Google OAuth
}