import React from "react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <section className=" min-h-screen flex items-center">
      <div className="container flex items-center justify-center px-6 py-12 mx-auto">
        <div className="w-full">
          {/* Centered Text Content */}
         
          <div className="flex flex-col items-center max-w-lg mx-auto text-center">
          <span className=" text-md font-bold tracking-tight flex bg-transparent p-1">
              <img className="w-auot h-20 mb-2" src="/logo/Canteen.png" alt="logo" /> 
            </span>
            <p className="text-3xl font-medium text-red-500 ">
              404 error
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-[#502214] md:text-3xl">
              We lost this page
            </h1>
            <p className="mt-4 text-[#502214] text-op">
              We searched high and low, but couldn’t find what you’re looking
              for. Let’s find a better place for you to go.
            </p>

            <div className="flex items-center w-full mt-6 gap-x-3 sm:w-auto">
              {/* Go Back Button */}
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-[#502214] transition-colors duration-200 bg-white hover:bg-[#f8f1e7] border border-[#502214] border-opacity-30 rounded-lg  gap-x-2 sm:w-auto   "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                <span>Go back</span>
              </button>

              {/* Take Me Home Button */}
              <Link to="/snacks"
               
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-[#502214] hover:bg-[#37180e] rounded-lg sm:w-auto "
              >
                Back to menu
              </Link>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Documentation Card */}
            <Card
              title="Menu"
              description="Order your favorite food now and enjoy a delicious meal! 🍔😋"
              linkText="Start ordering"
              link="/snacks"
              icon={
                <MdOutlineRestaurantMenu className="text-3xl" />
              }
            />

            {/* Blog Card */}
            <Card
              title="Log In"
              description="Log in to access your account and enjoy seamless ordering! 🔐✨"
              linkText="Click to log in"
              link="/login"
              icon={
                <FiLogIn  className="text-3xl"/>
              }
            />

            {/* Chat Support Card */}
            <Card
              title="Email Support"
              description="Email us now and let us know your issue—we're here to help! 📩😊"
              linkText="Click to email"
              link="#"
              icon={
                <MdEmail className="text-3xl" />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Card Component
const Card = ({ title, description, linkText, link, icon }) => {
  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      <span className="text-[#502214]">{icon}</span>

      <h3 className="mt-6 font-medium text-[#502214]">
        {title}
      </h3>
      <p className="mt-2 text-[#502214] text-opacity-75">{description}</p>

      <Link
        to={link}
        className="inline-flex items-center mt-4 text-sm text-[#502214] hover:text-[#23120d] gap-x-2 hover:underline"
      >
        <span>{linkText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default PageNotFound;
