import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLogin } from "../lib/login";
import { useSignup } from "../lib/signup";

import gsap from "gsap";

function SignUp  ()  {
    const { mutate: signup, isLoading } = useSignup();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      setShowErrorMessage(true);
      return;
    }
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      setShowErrorMessage(true);
      return;
    }
    setShowErrorMessage(false);
    signup(formData);
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
 const duration = 1;
 
 
 
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
    <div className="w-screen h-screen flex bg-[#592e1f] justify-center items-center p-2 fade-in" style={{ opacity: 0, transform: 'translateY(50px)' }}>
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-[#f8f1e7] rounded-lg shadow-md ">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-24 sm:h-24" src="/logo/logo-removebg.png" alt="" />
        </div>
        

        <form 
       onSubmit={handleSubmit}
        className="mt-3">
            <div>
            <label htmlFor="fullname" className="block text-md text-[#592e1f] ">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Full Name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40 "
              required
           />
          </div>
          <div className='mt-2'>
            <label htmlFor="email" className="block text-md text-[#592e1f] ">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email Address"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40 "
              required
            />
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-md text-[#592e1f] ">Password</label>
            
            </div>

            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                className="block w-full px-4 py-2 mt-1  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40"
              required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#592e1f]">
                {isPasswordVisible ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-md text-[#592e1f] ">Confirm Password</label>
              
            </div>

            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
               name="confirmPassword"
                  placeholder="Confirm your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                className="block w-full px-4 py-2 mt-1  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40"
              required
              />
              <button
                type="button"
                
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#592e1f]">
                {isPasswordVisible ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            
          </div>
          {showErrorMessage && passwordError && (
                <p className="text-red-500 text-sm mt-1 animate-[fadeIn_0.3s_ease-in]">
                  {passwordError}
                </p>
              )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              
              className={`w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg   bg-[#592e1f] hover:bg-[#50291b] 
                ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-600"
                  }
                `}
              
            >
               {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="mt-2 text-xs font-light text-center text-[#592e1f]">
          Already have an account? <Link to="/login" className="font-medium text-[#592e1f] hover:underline">Log In</Link>
        </p>

        
      </div>
    </div>
  );
};

export default SignUp;
