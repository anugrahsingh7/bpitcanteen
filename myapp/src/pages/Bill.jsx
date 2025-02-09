import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useOrderApi } from "../lib/useOrderApi";
import { motion } from "framer-motion";
import { format } from "date-fns";
import jsPDF from "jspdf";

const Bill = () => {
  const { state } = useLocation();
  const { paymentData } = state || {}; // Extract payment data passed from Cart.jsx

  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load order data based on payment ID
  useEffect(() => {
    if (paymentData) {
      const fetchOrderDetails = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/orders/${paymentData.razorpay_payment_id}`);
          const data = await response.json();
          setOrderDetails(data);
        } catch (error) {
          console.error("Error fetching order details:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrderDetails();
    }
  }, [paymentData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!orderDetails) {
    return <p>Order details not found</p>;
  }

  const { items, totalAmount, createdAt, buyerName } = orderDetails;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("BPIT College Canteen", 20, 20);
    doc.text(`GST No: XXXXXXXX`, 20, 30); // Replace with your actual GST number
    doc.text(`Transaction ID: ${paymentData.razorpay_payment_id}`, 20, 40);
    doc.text(`Date: ${format(new Date(createdAt), "dd-MM-yyyy")}`, 20, 50);
    doc.text(`Time: ${format(new Date(createdAt), "hh:mm a")}`, 20, 60);
    doc.text(`Buyer Name: ${buyerName}`, 20, 70);

    let y = 80;
    items.forEach((item) => {
      doc.text(`${item.name} (x${item.quantity}) - ₹${(item.quantity * item.price).toFixed(2)}`, 20, y);
      y += 10;
    });

    doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Payment Status: ${paymentData.status}`, 20, y);
    y += 10;

    doc.save("bill.pdf");
  };

  return (
    <div className="bg-white min-h-screen p-6 relative">
      <h2 className="text-2xl font-bold text-center mb-4">
        <span className="text-blue-600">BPIT</span>{" "}
        <span className="text-red-500">COLLEGE CANTEEN</span>
      </h2>
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 space-y-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Back Button */}
        <FaArrowLeft
          className="absolute top-16 left-4 text-2xl cursor-pointer"
          onClick={() => window.history.back()}
        />

        {/* Bill Content */}
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>

        <p><strong>Buyer Name:</strong> {buyerName}</p>
        <p><strong>Order Date:</strong> {format(new Date(createdAt), "dd-MM-yyyy")}</p>
        <p><strong>Order Time:</strong> {format(new Date(createdAt), "hh:mm a")}</p>
        
        <div className="mt-3">
          <p className="font-semibold">Items Ordered:</p>
          <ul className="list-disc list-inside">
            {items.map((item, idx) => (
              <li key={idx}>
                {item.name} (x{item.quantity}) - ₹
                {(item.quantity * item.price).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Total Amount:</p>
          <p>₹{totalAmount.toFixed(2)}</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Payment Status:</p>
          <p>{paymentData.status === "captured" ? "Payment Successful" : "Payment Failed"}</p>
        </div>

        <div className="mt-3">
          <p className="font-semibold">Transaction ID:</p>
          <p>{paymentData.razorpay_payment_id}</p>
        </div>

        {/* Download PDF Button */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Download Bill as PDF
          </button>

          <button
            onClick={() => window.location.href = "/snacks"}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
          >
            Back to Menu
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Bill;
