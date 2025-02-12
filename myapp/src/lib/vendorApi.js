import axios from "axios";

export const getVendor = async () => {
  try {
    const vendorData = await axios.get("http://localhost:3000/api/vendor");
    return vendorData.data.vendor;
  } catch (e) {
    console.error(e);
  }
};

export const updateVendor = async ({ status, id }) => {
  try {
    console.log(status, id);
    const response = await axios.patch(
      `http://localhost:3000/api/vendor/${id}`,
      {
        status,
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};
