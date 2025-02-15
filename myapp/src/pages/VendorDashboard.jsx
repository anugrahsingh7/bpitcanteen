import { AnimatePresence, motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaMoneyBill, FaPhone, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useLive } from "../context/LiveContext";
import { useGetAllOrders, useUpdateOrder } from "../lib/useOrderApi";
import { useUpdateVendor, useVendor } from "../lib/useVendorApi";

// Helper function to get formatted time

const getFormattedTime = (orderTime) => {
  const date = orderTime ? new Date(orderTime) : new Date();
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

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

function VendorDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { vendorInfo = {}, setVendorInfo } = useLive();
  const { data, isLoading: vendorLoading } = useVendor();
  const { mutate: updateStatus } = useUpdateVendor();

  const { mutate: updateOrder } = useUpdateOrder();
  const { data: getOrders, isLoading } = useGetAllOrders();
  useEffect(() => {
    if (getOrders) {
      const sortedOrders = getOrders.sort((a, b) => {
        if (a.status === "pending" && b.status === "completed") return -1;
        new Date(b.createdAt) - new Date(a.createdAt);
      });
      const today = new Date();
      const todayOrders = sortedOrders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getDate() === today.getDate() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );
      });
      setOrders(todayOrders);
    }
    setLoading(false);
  }, [getOrders]);

  useEffect(() => {
    if (data) {
      setVendorInfo(data[0]);
    }
  }, [setVendorInfo, data]);

  if (isLoading && vendorLoading) return <Loading />;

  const handleReceiveOrder = (orderId) => {
    updateOrder({ id: orderId, status: "completed" });
  };

  const handleLiveChange = async () => {
    if (!vendorInfo) return;
    try {
      const newStatus = !vendorInfo.status;

      // Assuming updateStatus sends the new status to the backend and updates it in the database
      await updateStatus({
        status: newStatus,
        id: vendorInfo._id,
      });

      // Update vendorInfo state and persist it in localStorage
      const updatedVendorInfo = { ...vendorInfo, status: newStatus };
      setVendorInfo(updatedVendorInfo);
      // localStorage.setItem("vendorInfo", JSON.stringify(updatedVendorInfo));
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const downloadPDF = () => {
    console.log(orders);
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(80, 34, 20, 1); // Orange color
    doc.text("BPIT CANTEEN", 15, 20);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Orders Report", 15, 30);

    // Report Info
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 40);
    doc.text(`Total Orders: ${orders?.length || 0}`, 15, 45);

    let yPos = 70; // Starting y position for orders

    // Ensure orders is an array
    if (!Array.isArray(orders) || orders.length === 0) {
      alert("No orders available to download.");
      return;
    }

    // Loop through each order
    orders.forEach((order) => {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Order Header
      doc.setFillColor(80, 34, 20, 1);
      doc.setDrawColor(80, 34, 20, 1);
      doc.rect(15, yPos, 180, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(`Order #${orderIdHasher.hashOrderId(order._id)}`, 20, yPos + 6);
      yPos += 15;

      // Order Details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);

      const details = [
        [
          `Order No.: ${orderIdHasher.hashOrderId(order._id) || "N/A"}`,
          `Time: ${
            order.createdAt || order.timestamp
              ? new Date(order.createdAt || order.timestamp).toLocaleString()
              : "N/A"
          }`,
        ],
        [
          `Transaction ID: ${order.transactionId || "N/A"}`,
          `Status: ${order.status || "Unknown"}`,
        ],
        [
          `Customer: ${order.user?.name || "Unknown"}`,
          `Phone: ${order.phoneNumber || "N/A"}`,
        ],
        [`Total Amount: Rs. ${order.totalAmount || "0"}`],
      ];

      details.forEach(([left, right]) => {
        if (left && right) {
          // Prevent undefined values
          doc.text(left.toString(), 20, yPos);
          doc.text(right.toString(), 120, yPos);
          yPos += 6;
        }
      });

      yPos += 5;

      // Items Table
      doc.autoTable({
        startY: yPos,
        head: [["Item", "Quantity", "Price (Rs.)", "Instructions"]],
        body:
          order.items?.map((item) => [
            item.name || "Unknown",
            item.quantity?.toString() || "0",
            `${item.price || 0}`,
            item.instructions || "No special instructions",
          ]) || [],
        styles: { fontSize: 9, cellPadding: 2 },
        headStyles: {
          fillColor: [241, 90, 35],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 20 },
          2: { cellWidth: 30 },
          3: { cellWidth: 80 },
        },
        margin: { left: 20 },
        theme: "grid",
      });

      yPos = doc.lastAutoTable.finalY + 20; // Update yPos after table
    });

    // Save the PDF
    doc.save(`BPIT_Canteen_Orders_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-2 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto  min-h-screen"
    >
      <motion.h1
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-0 md:mb-1 lg:mb-2 text-gray-800"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-end">
            <span className="text-md font-bold tracking-tight flex bg-transparent p-1">
              <img
                className="w-auto h-20"
                src="/logo/logo-removebg.png"
                alt="logo"
              />
            </span>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col md:flex-row md:justify-end lg:flex-row gap-2 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
            {/* Live & Toggle Button */}
            <div className="flex gap-2 justify-center md:justify-end w-full sm:w-auto">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={vendorInfo?.status ?? false}
                  onChange={handleLiveChange}
                  className="sr-only peer"
                />
                <span className="hidden peer-checked:block ms-3 text-lg font-medium text-green-500 shadow-sm me-2 bg-white bg-opacity-80 px-3 py-0 rounded-lg">
                  Live
                </span>
                <div className="relative w-11 h-6 shadow-md bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            {/* Download Report Button */}
            <div className="flex gap-2 justify-center md:justify-end w-full sm:w-auto">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={downloadPDF}
                className="flex-1 sm:flex-none text-[#502214] border border-[#502214] hover:bg-[#f8f1e7] px-3 sm:px-4 py-2 rounded-md text-sm sm:text-sm font-medium shadow-md transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="whitespace-nowrap">Download Report</span>
              </motion.button>
            </div>

            {/* Add & Remove Items Buttons (Always Centered) */}
            <div className="flex gap-2 justify-center w-full sm:w-auto">
              <Link
                to="/AddItems"
                className="flex-1 text-[#502214] border border-[#502214] hover:bg-[#f8f1e7] px-3 py-2 rounded-md text-sm sm:text-sm font-medium shadow-md transition-colors duration-200 flex items-center justify-center gap-1"
              >
                <IoMdAddCircle />
                Items
              </Link>
              <Link
                to="/EditItems"
                className="flex-1 text-[#502214] border border-[#502214] hover:bg-[#f8f1e7] px-3 py-2 rounded-md text-sm sm:text-sm font-medium shadow-md transition-colors duration-200 flex items-center justify-center gap-1"
              >
                <AiFillEdit />
                Items
              </Link>
            </div>
          </div>
        </div>
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#502214]"></div>
        </div>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-black">
              <FaShoppingCart className="text-6xl mb-4 opacity-60 text-[#502214]" />
              <p className="text-2xl font-semibold text-[#502214]">
                No Orders Yet
              </p>
              <p className="text-lg mt-0 font-medium text-[#502214] text-opacity-75 ">
                New orders will appear here
              </p>
            </div>
          ) : (
            <>
              {/* Mobile View - Card Layout */}
              <div className="lg:hidden m-2 mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                <AnimatePresence>
                  {orders.map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-md shadow p-2 sm:p-3 text-[10px] sm:text-xs"
                    >
                      <div className="flex justify-between items-start mb-1 sm:mb-2">
                        <div>
                          <div className="font-bold break-all text-red-500">
                            {orderIdHasher.hashOrderId(order._id)}
                          </div>

                          <div className="mt-1">
                            <div className="text-gray-700 group relative cursor-help">
                              {getFormattedTime(order.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex items-center gap-1">
                          <FaUser className="text-black text-xs" />
                          <span className="font-medium">
                            {order.user.name || undefined}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <FaPhone className="text-black text-xs" />
                          <a
                            href={`tel:${order.phoneNumber}`}
                            className="group  relative cursor-pointer hover:underline hover:text-blue-500"
                          >
                            {order.phoneNumber}
                          </a>
                        </div>

                        <div className="border-t pt-1">
                          <div className="font-medium mb-1 underline ">
                            Items:-
                          </div>
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="text-[10px] sm:text-xs py-1"
                            >
                              <div className="flex  justify-between">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-red-500">
                                  x{item.quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex-col justify-between items-center border-t pt-1">
                          <div className="space-y-1 font-semibold text-red-500">
                            {order.instructions || (
                              <span className="text-gray-500 italic ">
                                No cooking instructions
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="text-black">Total Amount</div>
                            <div className="font-bold text-green-500">
                              ₹{order.totalAmount}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 pt-1 border-t">
                          {order.status === "pending" && (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleReceiveOrder(order._id)}
                              className="flex-1 bg-blue-500 text-white py-1 rounded-md text-[10px] sm:text-xs font-medium shadow-sm"
                            >
                              Received
                            </motion.button>
                          )}
                          {order.status === "completed" && (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              // onClick={() => handlePreparedOrder(order._id)}
                              className="flex-1 bg-green-500 text-white py-1 rounded-md text-[10px] sm:text-xs font-medium shadow-sm"
                            >
                              Prepared
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Desktop View - Table Layout */}
              <div className="hidden lg:block rounded-lg shadow-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed min-w-[900px]">
                    <thead>
                      <tr className="bg-[#502214] text-[#e9b52a] ">
                        <th className="px-2 py-4 text-left w-20">Order No.</th>
                        <th className="px-2 py-4 text-left w-20">Time</th>
                        <th className="px-2 py-4 text-left w-24">
                          <FaUser className="inline mr-1" />
                          Customer
                        </th>
                        <th className="px-2 py-4 text-left w-28">
                          <FaPhone className="inline mr-1" />
                          Phone
                        </th>
                        <th className="px-2 py-4 text-left w-32">
                          <FaShoppingCart className="inline mr-1" />
                          Items
                        </th>
                        <th className="px-2 py-4 text-left w-40">
                          Instructions
                        </th>
                        <th className="px-2 py-4 text-left w-24">
                          <FaMoneyBill className="inline mr-1" />
                          Total
                        </th>
                        <th className="px-2 py-4 text-left w-24">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {orders.map((order) => (
                          <motion.tr
                            key={order._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="hover:bg-[#f8f1e7] transition-colors duration-150"
                          >
                            <td className="px-2 py-4 border-b group relative">
                              <span className=" text-red-500 font-bold">
                                {orderIdHasher.hashOrderId(order._id)}
                              </span>
                            </td>

                            <td className="px-2 py-4 border-b">
                              <span className=" group relative ">
                                {getFormattedTime(order.createdAt)}
                              </span>
                            </td>
                            <td className="px-2 py-4 border-b text-sm font-medium">
                              {order.user.name}
                            </td>
                            <td className="px-2 py-4 border-b">
                              <a
                                href={`tel:${order.phoneNumber}`}
                                className="group text-sm relative cursor-pointer hover:underline hover:text-blue-500"
                              >
                                {order.phoneNumber}
                              </a>
                            </td>
                            <td className="px-2 py-4 border-b">
                              <div className="space-y-1">
                                {order.items.map((item) => (
                                  <div
                                    key={item._id}
                                    className="text-sm font-semibold "
                                  >
                                    <span className="font-medium hover:underline">
                                      {item.name}
                                    </span>
                                    <span className=" font-bold ml-2 text-red-500">
                                      x{item.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-2 py-4 border-b">
                              <div className="space-y-1 font-medium text-red-500">
                                {order.instructions || (
                                  <span className="text-gray-500 italic text-sm">
                                    No cooking instructions
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-2 py-4 border-b font-bold text-green-500">
                              ₹{order.totalAmount}
                            </td>

                            <td className="px-1 py-4 border-b">
                              <div className="flex items-center gap-2">
                                {order.status === "pending" && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleReceiveOrder(order._id)
                                    }
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                                  >
                                    received
                                  </motion.button>
                                )}
                                {order.status === "completed" && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    // onClick={() =>
                                    //   // handlePreparedOrder(order._id)
                                    // }
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                                  >
                                    Prepared
                                  </motion.button>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </motion.div>
  );
}

export default VendorDashboard;
