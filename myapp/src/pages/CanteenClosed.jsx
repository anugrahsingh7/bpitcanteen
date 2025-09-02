import React from 'react';
import { FaDoorClosed } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from "react-router-dom"

function CanteenClosed() {
  const handleCopy = () => {
    const textToCopy = "https://bpitcanteen.vercel.app/"; // Replace with your text
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch((err) => toast.error('Failed to copy text.'));
  };

  return (
    <>
      <section className="min-h-screen flex items-center">
        <div className="container flex items-center justify-center px-6 py-10 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <span className=" text-md font-bold tracking-tight flex bg-transparent p-1">
              <img className="w-auto h-20 mb-2" src="/logo/Canteen.png" alt="logo" /> 
            </span>
            <p className="p-0 text-[1.7rem] flex font-semibold items-center  text-[#502214] rounded-full ">
              
              
              <h1 className='text-red-600 flex items-center space-x-1'><h1 className='text-[#502214]'>Sorry! We are</h1><FaDoorClosed className='text-[#502214]' />Closed😞</h1>
            </p>
            <p className="mt-0 text-[#502214] text-opacity-75">
              Our Canteen is currently closed, or the website is under maintenance. Please check back later!
            </p>
            <h1 className='text-[#502214] mt-4 font-bold text-2xl '>Opening Hours</h1>
            <p className="mt-0 text-lg font-normal text-[#e9b528] text-opacity-100 flex flex-col">
              <span>Monday - Friday: 8:00 AM - 6:00 PM</span>
              <span>Saturday: 9:00 AM - 4:00 PM</span>
              <span>Sunday: Closed</span>
            </p>

            <div className="flex justify-center items-center w-full mt-6 gap-x-1 shrink-0 sm:w-auto">
            <Link to="/Snacks"
                className="flex justify-center gap-1 items-center w-1/2 px-3 py-2 text-sm tracking-wide text-[#502214] transition-colors duration-200 rounded-lg shrink-0 sm:w-2/3 border border-[#502214] hover:bg-[#f8f1e7] shadow-md"
              >
              <IoMdArrowRoundBack />
              Browse Menu
              </Link>

              <button 
                onClick={handleCopy}
                className="w-1/2 px-3 py-2 text-sm tracking-wide text-[#502214] transition-colors duration-200 rounded-lg shrink-0 sm:w-2/3 border border-[#502214] hover:bg-[#f8f1e7] shadow-md"
              >
              Website Link
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Container to render the toast notifications */}
      <ToastContainer />
    </>
  );
}

export default CanteenClosed;
