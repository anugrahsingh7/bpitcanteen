import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Implement your password validation logic here
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidPassword(formData.password)) {
      setPasswordError("Password must meet the requirements");
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      return;
    }
    
    setPasswordError("");
    setIsLoading(true);

    try {
      const response = await fetch('YOUR_API_ENDPOINT/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token);
        // Navigate to dashboard or home page
        navigate('/dashboard');
      } else {
        // Handle error response
        setPasswordError(data.message || "Account creation failed");
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 3000);
      }
    } catch (error) {
      setPasswordError("Network error. Please try again.");
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Remove spaces from password fields
    if (name === "password" || name === "confirmPassword") {
      const noSpacePassword = value.replace(/\s/g, '');
      setFormData({
        ...formData,
        [name]: noSpacePassword,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear password error when user types in either password field
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const isPasswordsMatch =
    formData.password === formData.confirmPassword && formData.password !== "";

  const passwordRequirements = "Enter a combination of at least 8 numbers, letters, or special characters";
  const confirmPasswordRequirement = "Password should match with password";

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
        
      <h2 className="text-2xl font-bold  animate-[fadeIn_0.6s_ease-out] text-center ">
                <span className="text-blue-600">BPIT</span>{" "}
                <span className="text-red-500">
                  COLLEGE CANTEEN
                  <i className="fa-solid fa-utensils ms-2 animate-bounce"></i>
                </span>
              </h2>
              <div className="text-center mb-3">
              
             
              </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
        >
             <h2 className=" text-center text-2xl font-bold">Create a new account</h2>
             <h3 className="text-center opacity-50 text-sm mb-4">It's quick and easy.</h3>
            
          

          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  formData.email
                    ? isValidEmail(formData.email)
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none`}
                required
              />
            </div>

            <div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    formData.password && formData.confirmPassword
                      ? isPasswordsMatch
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none pr-20`}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="relative">
                    <FaExclamationCircle
                      className="text-gray-500 hover:text-gray-700 cursor-help"
                      size={16}
                    />
                    <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 bg-opacity-90 text-white text-sm rounded-lg p-2 hidden group-hover:block shadow-lg">
                      {passwordRequirements}
                      <div className="absolute bottom-0 right-3 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800 bg-opacity-90"></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    formData.password && formData.confirmPassword
                      ? isPasswordsMatch
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none pr-20`}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="relative">
                    <FaExclamationCircle
                      className="text-gray-500 hover:text-gray-700 cursor-help"
                      size={16}
                    />
                    <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 text-white text-sm rounded-lg p-2 hidden group-hover:block shadow-lg">
                      {confirmPasswordRequirement}
                      <div className="absolute bottom-0 right-3 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>
              </div>
              {showErrorMessage && passwordError && (
                <p className="text-red-500 text-sm mt-1 animate-[fadeIn_0.3s_ease-in]">
                  {passwordError}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isPasswordsMatch}
            className={`w-full py-3 rounded-lg font-medium mt-6 bg-yellow-500 text-white transition-opacity duration-200 ${
              isLoading ||
              !isPasswordsMatch ||
              !formData.name ||
              !formData.email
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-600"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <Link
            to="/login"
            className="block text-center mt-4 text-blue-600 hover:text-blue-800 hover:underline"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
