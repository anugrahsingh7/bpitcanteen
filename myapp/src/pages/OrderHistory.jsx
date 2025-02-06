import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useOrderApi } from "../lib/useOrderApi";
import { useUser } from "../context/userContext";
import Loading from "../components/Loading";


// Dummy order data (Replace with API data)
const orders = [
  {
    id: "ORD123456",
    date: "2025-02-06",
    time: "12:45 PM",
    amount: 499.99,
    transactionId: "TXN987654321",
    items: [
      { name: "Burger", quantity: 2, price: 150 },
      { name: "French Fries", quantity: 1, price: 100 },
      { name: "Coke", quantity: 1, price: 50 },
    ],
  },
  {
    id: "ORD789012",
    date: "2025-02-04",
    time: "03:15 PM",
    amount: 299.99,
    transactionId: "TXN123456789",
    items: [
      { name: "Pizza", quantity: 1, price: 200 },
      { name: "Garlic Bread", quantity: 2, price: 50 },
    ],
  },
  {
    id: "ORD345678",
    date: "2025-02-02",
    time: "06:30 PM",
    amount: 199.99,
    transactionId: "TXN456789123",
    items: [{ name: "Pasta", quantity: 1, price: 199.99 }],
  },
];

const OrderHistory = () => {
  const { user } = useUser();

  // ✅ Call useOrderApi as a hook inside the component
  const { data, isLoading, isError, error } = useOrderApi(user?._id);
  const  [orders,setOrders] = useState([]);
  
  useEffect(() => {
    if(data){
      setOrders(data);
    }
  },[data])
  console.log(data);
  if (!user) return <Loading />;
  
  // ✅ Show loading until user is available
  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;

   

 
  
  return (
    <div className="bg-white min-h-screen p-6 relative">
      {/* Page Title */}
      <h2 className="text-2xl font-bold animate-[fadeIn_0.6s_ease-out] text-center mb-3">
        <span className="text-blue-600">BPIT</span>{" "}
        <span className="text-red-500">
          COLLEGE CANTEEN
          <i className="fa-solid fa-utensils ms-2 animate-bounce"></i>
        </span>
      </h2>
      <Link to="/Snacks"  className="justify-start items-center flex">
      <button className="absolute flex justify-center items-center top-16  text-2xl p-3 bg-black bg-opacity-5 hover:bg-opacity-10 opacity-80 rounded-full "> <FaArrowLeft  /></button>
      </Link>

      {/* Order History Heading */}
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-black text-opacity-70 text-center mb-4"
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
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Order ID */}
            <p className="text-sm font-semibold text-orange-500">
              Order ID: <span className="text-black">{order._id}</span>
            </p>

            {/* Order Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-black">
              <p>
                <span className="font-semibold">Date:</span> {order.createdAt}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {order.createdAt}
              </p>
    
            </div>

            {/* Order Items */}
            <div className="mt-3">
              <p className="font-semibold text-orange-500">Items Ordered:</p>
              <ul className="list-disc list-inside text-black">
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
              <p className="font-semibold text-orange-500 me-1">Total:</p>
              <div className="flex items-center">
                <p className="text-black font-bold">
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
