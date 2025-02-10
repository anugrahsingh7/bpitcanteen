import  { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import html2pdf from 'html2pdf.js';
import { Link } from "react-router-dom";
import axios from 'axios';
import { parseISO, format } from "date-fns";
import Loading from '../components/Loading';

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

const Invoice = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // For navigation
  const invoiceRef = useRef(null); // Reference for invoice content
  const [order, setOrder] = useState({});
  
 const id = searchParams.get('id'); // Get the orderId from the URL
  
  useEffect(() => {
    const getOrder = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`http://localhost:3000/api/order/${id}`);
        
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    getOrder();
  }, [id]);

  if(order.length === 0 ) return <Loading/>;
  console.log(order);
  const orderDate= order.order?.createdAt;

  const downloadPDF = () => {
    const element = invoiceRef.current;

    const options = {
      margin: [10, 10, 10, 10], // Adjust margins if necessary
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2, // Increase scale for better quality
        logging: true,
        useCORS: true, // Enable CORS for external resources like images
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .from(element)
      .set(options)
      .save();
  };

  const handleBackToMenu = () => {
    navigate('/menu'); // Navigates to the menu page using useNavigate
  };

  return (
    <div className="w-screen min-h-max flex justify-center items-center py-4">
      <div
        ref={invoiceRef} // Use ref to target the invoice content
        className="bg-white min-h-max rounded-lg shadow-lg px-6 py-8 sm:px-8 sm:py-10 max-w-xl mx-auto invoice-content"
      >
        {/* Back to Menu Button */}
        <div className="flex justify-between items-center mb-2">
          <Link to="/snacks"
            onClick={handleBackToMenu}
            className="border-[#502214] border text-[#502214] bg-[#f9f7f1] flex items-center hover:bg-[#f8f1e7] py-2 px-3 rounded-md text-sm"
          >
            <IoIosArrowRoundBack className="text-2xl" />
            Back to Menu
          </Link>
        </div>

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              className="h-20 w-auto mr-2"
              src="/logo/logo-removebg.png"
              alt="Logo"
            />
          </div>
          <div className="text-[#502214] sm:text-right">
            <div className="font-bold mb-0 text-lg sm:text-xl">INVOICE</div>
            <div className="text-sm">Date: {order?.order?.createdAt ? format(parseISO(order.order.createdAt), "eeee , dd-MM-yyyy") : "N/A"}</div>
            <div className="text-sm">Order No: {order.order?._id ? orderIdHasher.hashOrderId(order.order._id) : "0000"}</div>
            <div className="text-sm">GST No: INV123456789</div>

            
          </div>
        </div>

        {/* Bill To Section */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-4">
          <div className="w-full sm:w-full">
            <h2 className="font-bold text-[#502214] text-lg sm:text-xl">Bill To:</h2>
            <div className="text-[#502214] text-sm sm:text-base">{order.order?.user?.name}</div>
            <div className="text-[#502214] text-sm sm:text-base">{order.order?.phoneNumber}</div>
            <div className="text-[#502214] text-sm sm:text-base">{order.order?.user?.email}</div>
            <div className="text-[#502214] text-sm sm:text-base">Transaction Id: {order.order?.transactionId}</div>
          </div>
        </div>

        <table className="w-full text-left mb-2">
  <thead>
    <tr>
      <th className="text-[#502214] font-bold uppercase py-2">Name</th>
      <th className="text-[#502214] font-bold uppercase py-2">Quantity</th>
      <th className="text-[#502214] font-bold uppercase py-2">Price</th>
      <th className="text-[#502214] font-bold uppercase py-2">Total</th>
    </tr>
  </thead>
  <tbody>
    {order.order?.items?.map((item, index) => (
      <tr key={index}>
        <td className="py-2 text-[#502214]">{item.name}</td>
        <td className="py-2 text-[#502214]">{item.quantity}</td>
        <td className="py-2 text-[#502214]">₹{item.price}</td>
        <td className="py-2 text-[#502214]">₹{item.quantity * item.price}</td>
      </tr>
    ))}
  </tbody>
</table>


        <div className="flex justify-end mb-2">
          <div className="text-[#502214] mr-2">Total:</div>
          <div className="text-[#502214] font-bold text-xl">{order.order?.totalAmount} Rs</div>
        </div>

        <div className="border-t border-[#502214] border-opacity-25 pt-4 mb-4">
          <div className="text-[#502214] mb-0">
            The total price includes all applicable taxes.
          </div>
        </div>

        {/* Button to Download PDF */}
        <div className="flex justify-end mt-4">
          <button
            onClick={downloadPDF}
            className="bg-[#502214] text-white py-2 px-4 rounded-md"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
