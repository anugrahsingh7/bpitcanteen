import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const VALID_CREDENTIALS = {
  email: "anugrahyashsingh2014@gmail.com", // Replace with actual vendor email
  vendorId: "YASH@1234", // Replace with actual vendor ID
  password: "Yash@1234", // Replace with actual vendor password
};

function VendorLogin() {
  const [email, setEmail] = useState("anugrahyashsingh2014@gmail.com");
  const [password, setPassword] = useState("Yash@1234");
  const [vendorId, setVendorId] = useState("YASH@1234");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !vendorId.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (
      email !== VALID_CREDENTIALS.email ||
      password !== VALID_CREDENTIALS.password ||
      vendorId !== VALID_CREDENTIALS.vendorId
    ) {
      toast.error("Invalid login credentials");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("vendorEmail", email);
      toast.success("Vendor Login successful!");
      navigate("/vendor-dashboard", { replace: true });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-3 animate-[fadeIn_0.6s_ease-out]">
              <span className="text-blue-600">BPIT</span>{" "}
              <span className="text-red-500">
                COLLEGE CANTEEN
                <i className="fa-solid fa-utensils ms-2 animate-bounce"></i>
              </span>
            </h2>
            <Link
              to="/"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Login as a Customer →
            </Link>
          </div>

          {/* Vendor Email */}
          <div className="space-y-2 mb-4 animate-[fadeIn_0.7s_ease-out]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Vendor ID */}
          <div className="space-y-2 mb-4 animate-[fadeIn_0.7s_ease-out]">
            <input
              type="text"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
              placeholder="Enter Vendor ID"
            />
          </div>

          {/* Password with Eye Icon */}
          <div className="space-y-2 mb-6 animate-[fadeIn_0.8s_ease-out]">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
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
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center"
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
