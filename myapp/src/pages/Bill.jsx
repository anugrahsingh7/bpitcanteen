import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import html2pdf from 'html2pdf.js';
import { Link } from "react-router-dom";

const Invoice = () => {
  const navigate = useNavigate(); // For navigation
  const invoiceRef = useRef(null); // Reference for invoice content

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
            <div className="text-sm">Date: 01/05/2023</div>
            <div className="text-sm">Order No: INV12345</div>
            <div className="text-sm">GST No: INV123456789</div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-4">
          <div className="w-full sm:w-1/2">
            <h2 className="font-bold text-[#502214] text-lg sm:text-xl">Bill To:</h2>
            <div className="text-[#502214] text-sm sm:text-base">Vaibhav Sinha</div>
            <div className="text-[#502214] text-sm sm:text-base">+91 1234567890</div>
            <div className="text-[#502214] text-sm sm:text-base">johndoe@example.com</div>
            <div className="text-[#502214] text-sm sm:text-base">Transaction Id: gjhgjhgjh</div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <table className="w-full text-left mb-2">
          <thead>
            <tr>
              <th className="text-[#502214] font-bold uppercase py-2">Description</th>
              <th className="text-[#502214] font-bold uppercase py-2">Quantity</th>
              <th className="text-[#502214] font-bold uppercase py-2">Price</th>
              <th className="text-[#502214] font-bold uppercase py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 text-[#502214]">Product 1</td>
              <td className="py-2 text-[#502214]">1</td>
              <td className="py-2 text-[#502214]">$100.00</td>
              <td className="py-2 text-[#502214]">$100.00</td>
            </tr>
            <tr>
              <td className="py-2 text-[#502214]">Product 2</td>
              <td className="py-2 text-[#502214]">2</td>
              <td className="py-2 text-[#502214]">$50.00</td>
              <td className="py-2 text-[#502214]">$100.00</td>
            </tr>
            <tr>
              <td className="py-2 text-[#502214]">Product 3</td>
              <td className="py-2 text-[#502214]">3</td>
              <td className="py-2 text-[#502214]">$75.00</td>
              <td className="py-2 text-[#502214]">$225.00</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mb-2">
          <div className="text-[#502214] mr-2">Total:</div>
          <div className="text-[#502214] font-bold text-xl">$450.50</div>
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
