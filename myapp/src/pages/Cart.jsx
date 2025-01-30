import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generateTransactionId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 10;
  return (
    "TXN" +
    Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("")
  );
};

function Cart() {
  const {
    cartItems,
    instructions,
    updateQuantity,
    clearCart,
    updateInstructions,
  } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleInstructionChange = (itemId, value) => {
    updateInstructions(itemId, value);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePaymentAndOrder = async () => {
    setIsProcessing(true);
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));

      const orderData = {
        id: `ORD${Date.now()}`,
        transactionId: generateTransactionId(),
        customerName: userDetails?.name || "Customer",
        phoneNumber: userDetails?.phone || "1234567890",
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          instructions: instructions[item.id] || "",
          price: item.price,
        })),
        totalAmount: total,
        status: "pending",
        paymentStatus: "completed",
        orderDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        orderTime: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        timestamp: new Date().toISOString(),
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, orderData])
      );

      setOrderDetails(orderData);
      setShowReceipt(true);

      toast.success("Order placed successfully! 🎉");
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadReceipt = async (format = "pdf") => {
    const receiptElement = document.getElementById("receipt-content");

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        margin: 20,
      });

      if (format === "pdf") {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const padding = 20;

        const imgWidth = pageWidth - padding * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", padding, padding, imgWidth, imgHeight);
        pdf.save(`order-receipt-${orderDetails.id}.pdf`);
      } else {
        const paddedCanvas = document.createElement("canvas");
        const ctx = paddedCanvas.getContext("2d");
        const padding = 40;

        paddedCanvas.width = canvas.width + padding * 2;
        paddedCanvas.height = canvas.height + padding * 2;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

        ctx.drawImage(canvas, padding, padding);

        const link = document.createElement("a");
        link.download = `order-receipt-${orderDetails.id}.png`;
        link.href = paddedCanvas.toDataURL("image/png");
        link.click();
      }

      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download receipt");
    }
  };

  const ReceiptModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={() => setShowReceipt(false)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[380px] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="receipt-content" className="bg-white p-4 sm:p-6">
          <div className="text-center  pb-3 mb-1">
            
            <h1 className="text-2xl font-bold text-black mb-1 text-center">
           BPIT CANTEEN
           <i className="fa-solid fa-utensils ml-2 text-orange-500"></i>
            </h1>
            <p className="text-gray-500 text-xs">GST No: 29AADCB2230M1ZX</p>
            <div className="border-t my-2"></div>
            <h2 className="text-xl sm:text-lg font-bold text-gray-800">
              Order Receipt
            </h2>
            <p className="text-gray-500 text-sm mt-0">
              Thank you for your order!
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Order ID:</p>
              <p className="font-semibold text-sm">{orderDetails?.id}</p>
            </div>

            <div>
              <p className="text-gray-600 text-xs sm:text-sm">
                Transaction ID:
              </p>
              <p className="font-semibold text-sm">
                {orderDetails?.transactionId}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Customer Name:</p>
              <p className="font-semibold text-sm">
                {orderDetails?.customerName}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Phone Number:</p>
              <p className="font-semibold text-sm">
                {orderDetails?.phoneNumber}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                Order Items:
              </p>
              <div className="space-y-2">
                {orderDetails?.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border-b pb-2"
                  >
                    <div className="pr-2">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      {item.instructions && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          Note: {item.instructions}
                        </p>
                      )}
                    </div>
                    <p className="font-semibold text-sm whitespace-nowrap">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm sm:text-base">
                  Total Amount:
                </span>
                <span className="font-extrabold  text-red-600 text-sm sm:text-base">
                  ₹{orderDetails?.totalAmount}
                </span>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Order Date: {orderDetails?.orderDate}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 text-center mt-1">
                Order Time: {orderDetails?.orderTime}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 text-xs sm:text-sm"
            onClick={() => downloadReceipt("pdf")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            PDF
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-green-500 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 text-xs sm:text-sm"
            onClick={() => downloadReceipt("image")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Image
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-500 text-white px-3 py-1.5 rounded-lg font-medium text-xs sm:text-sm"
            onClick={() => {
              setShowReceipt(false);
              clearCart();
              navigate("/snacks");
            }}
          >
            Done
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Add some delicious items to your cart!
          </p>
          <Link
            to="/snacks"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Cart
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/snacks"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Menu
          </Link>
        </motion.div>
      </div>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center p-4">
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />

              <div className="flex-grow ml-6">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <p className="text-green-600 font-semibold">₹{item.price}</p>

                <div className="mt-2 max-w-[250px]">
                  <motion.div
                    initial={false}
                    animate={{ height: "auto" }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="a cooking instructions"
                      value={instructions[item.id] || ""}
                      onChange={(e) =>
                        handleInstructionChange(item.id, e.target.value)
                      }
                      className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-400"
                    />
                    {instructions[item.id] && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => handleInstructionChange(item.id, "")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                <motion.button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(0, item.quantity - 1))
                  }
                  className="bg-white text-gray-600 h-8 w-8 rounded-lg flex items-center justify-center shadow-sm hover:shadow transition-shadow duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </motion.button>

                <span className="w-8 text-center font-semibold text-gray-800">
                  {item.quantity}
                </span>

                <motion.button
                  onClick={() =>
                    updateQuantity(item.id, Math.min(10, item.quantity + 1))
                  }
                  className={`h-8 w-8 rounded-lg flex items-center justify-center shadow-sm hover:shadow transition-shadow duration-200
                    ${
                      item.quantity >= 10
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600"
                    }`}
                  whileHover={item.quantity < 10 ? { scale: 1.1 } : {}}
                  whileTap={item.quantity < 10 ? { scale: 0.95 } : {}}
                  disabled={item.quantity >= 10}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </motion.button>
              </div>

              <div className="ml-6 text-right min-w-[100px]">
                <div className="font-bold text-lg text-gray-800">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 bg-white p-6 rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: cartItems.length * 0.1 }}
      >
        <div className="flex justify-between items-center text-xl mb-6">
          <span className="font-semibold text-gray-800">Total Amount</span>
          <span className="font-bold text-green-600">₹{total}</span>
        </div>
        <div className="space-y-3">
          <motion.button
            onClick={handlePaymentAndOrder}
            disabled={isProcessing}
            className={`w-full ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200`}
            whileHover={{ scale: isProcessing ? 1 : 1.02 }}
            whileTap={{ scale: isProcessing ? 1 : 0.98 }}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              "Proceed to Payment"
            )}
          </motion.button>

          <motion.button
            onClick={clearCart}
            className="w-full bg-white hover:bg-red-50 text-red-500 border border-red-500 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear Cart
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>{showReceipt && <ReceiptModal />}</AnimatePresence>
    </div>
  );
}

export default Cart;
