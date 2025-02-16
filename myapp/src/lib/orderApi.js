import axios from "axios";

export const getOrders = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/order/get-orders`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const createOrder = async (order) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/order/create-order`,
      order
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Order creation failed:", error);
    throw new Error(error.response?.data?.message || "Order creation failed");
  }
};

export const getOrderByUser = async (id) => {
  try {
    if (!id) throw new Error("User ID is missing");
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}/orders`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = async ({ id, status }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/order/${id}`,
      {
        status,
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
