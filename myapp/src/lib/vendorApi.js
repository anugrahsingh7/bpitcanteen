import axios from "axios";

export const getVendor = async () => {
  try {
    const vendorData = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/vendor`);
    return vendorData.data.vendor;
  } catch (e) {
    console.error(e);
  }
};

export const updateVendor = async ({ status, id }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/vendor/${id}`,
      {
        status,
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};
