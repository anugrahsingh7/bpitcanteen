import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useOrderApi } from "../lib/useOrderApi";
import { useUser } from "../context/userContext";
import Loading from "../components/Loading";
import { parseISO, format } from "date-fns";
const orderIdHasher = {
  hashOrderId: (orderId) => {
    let hash = 0;

    // Generate hash from string
    for (let i = 0; i < orderId.length; i++) {
      const char = orderId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Ensure positive number and limit to 4 digits
    hash = Math.abs(hash) % 10000;

    // Pad with leading zeros if less than 4 digits
    return hash.toString().padStart(4, "0");
  },
};
const OrderHistory = () => {
  const { user } = useUser();

  // ✅ Call useOrderApi as a hook inside the component
  const { data, isLoading, isError, error } = useOrderApi(user?._id);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      const sortedOrders = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const hashedOrders = sortedOrders.map((el) => {
        return {
          ...el,
          _id: orderIdHasher.hashOrderId(el._id),
        };
      });
      setOrders(hashedOrders);
    }
  }, [data]);
  if (!user) return <Loading />;

  // ✅ Show loading until user is available
  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className=" min-h-screen p-6 relative">
      {/* Page Title */}
      <div className="flex justify-center mx-auto">
        <img
          className="w-auto h-16 sm:h-16"
          src="/logo/logo-removebg.png"
          alt=""
        />
      </div>
      <Link to="/Snacks" className="justify-start items-center flex">
        <button className="absolute flex text-[#502214] justify-center items-center top-16  text-2xl p-3 bg-black bg-opacity-5 hover:bg-opacity-10 opacity-80 rounded-full ">
          {" "}
          <FaArrowLeft />
        </button>
      </Link>

      {/* Order History Heading */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-[#502214] text-opacity-90 mt-3 text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Order History
      </motion.h1>

      {/* Order List Container */}
      <motion.div
        className="max-w-3xl  mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Orders */}
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            className="border border-[#502214] border-opacity-30 rounded-lg p-4 hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Order ID */}
            <p className="text-sm font-semibold text-[#e9b52a]">
              Order ID:{" "}
              <span className="text-[#502214] text-opacity-85">
                {order._id}
              </span>
            </p>

            {/* Order Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-[#502214] text-opacity-85">
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {format(parseISO(order.createdAt), "eeee , dd-MM-yyyy")}
              </p>
              <p>
                <span className="font-semibold">Time:</span>{" "}
                {format(parseISO(order.createdAt), "hh:mm a")}
              </p>
            </div>

            {/* Order Items */}
            <div className="mt-3">
              <p className="font-semibold text-[#e9b52a]">Items Ordered:</p>
              <ul className="list-disc list-inside text-[#502214] text-opacity-85">
                {order.items.map((item, idx) => (
                  <li key={idx} className="ml-4">
                    {item.name} (x{item.quantity}) - ₹
                    {(item.quantity * item.price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Total Amount Calculation with Payment Success Icon */}
            <div className="mt-3 flex items-center justify-start">
              <p className="font-semibold text-[#e9b52a] me-1">Total:</p>
              <div className="flex items-center">
                <p className="text-[#502214] text-opacity-85 font-bold">
                  ₹
                  {order.items
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
                <div className="ml-2 text-green-500">
                  <i className="fa-solid fa-check-circle"></i>
                  <span className="ml-1">Payment Successful</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OrderHistory;
