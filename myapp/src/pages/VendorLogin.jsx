import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

import gsap from "gsap";
import { useVendor } from "../context/vendorContext"

function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useVendor();
  const duration = 1;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() ) {
      toast.error("Please fill all fields");
      return;
    }

    if (
      email !== import.meta.env.VITE_VENDOR_EMAIL ||
      password !== import.meta.env.VITE_VENDOR_PASSWORD
      
    ) {
      toast.error("Invalid login credentials");
      return;
    }

    login(); 
    toast.success("Vendor login successfully!");
    navigate("/vendor-dashboard");
    // setIsLoading(true);
    // setTimeout(() => {
    //   localStorage.setItem("vendorEmail", email);
    //   toast.success("Vendor Login successful!");
    //   navigate("/vendor-dashboard", { replace: true });
    
    // }, 1500);
  };
  useEffect(() => {
    // GSAP animation to fade in the content when the page loads
    gsap.to(".fade-in", {
      opacity: 1,
      y: 0,
      duration: duration, // Use the duration variable
      delay: 0.3
    });
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-hidden flex bg-[#f8f1e7] justify-center items-center p-2 fade-in" style={{ opacity: 0, transform: 'translateY(50px)' }}>
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-[#f8f1e7] border border-[#592e1f] border-opacity-40 rounded-lg shadow-md ]">
      <div className="flex justify-center mx-auto">
          <img className="w-auto h-24 sm:h-24" src="/logo/logo-removebg.png" alt="" />
        </div>
        <p className="mt-1 -mb-5 text-xs font-light text-center text-[#592e1f]">
          <Link to="/login" className="font-semibold opacity-85 hover:opacity-100 text-[#592e1f] hover:underline ">Customer Log In</Link>
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >
          
           
          {/* Vendor Email */}
          <div className="mt-2">
          <label htmlFor="email" className="block text-md text-[#592e1f] ">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40"
              placeholder="Enter your email"
            />
          </div>

         
          

          {/* Password with Eye Icon */}
          <div className="mt-2">

          <label htmlFor="email" className="block text-md text-[#592e1f] ">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40"
                placeholder="Enter your password"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye text-gray-600"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash text-gray-600"></i>
                )}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-6 px-6 py-2.5 text-sm flex justify-center items-center font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg   bg-[#592e1f] hover:bg-[#50291b]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VendorLogin;
