import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const passwordRequirements = "Enter a combination of at least 8 numbers, letters, or special characters";
  const confirmPasswordRequirement = "Password should match with password";
  const tokenRequirement = "You can get the reset token from your Email.";

  const handleEmailChange = (emailValue) => {
    setEmail(emailValue);
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailValue));
  };

  const handleSendToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulating API call (replace with actual API call later)
      setTimeout(() => {
        toast.success("Reset token has been sent to your email!", {
          duration: 4000,
          position: "top-center",
          icon: "📧",
          style: {
            backgroundColor: "#4ade80",
            color: "white",
          },
        });
        setIsLoading(false);
        // Optionally clear the email field after success
        setEmail("");
        setIsValidEmail(false);
        setShowResetForm(true); // Show the reset form after token is sent
      }, 1500);
    } catch (error) {
      toast.error("Failed to send reset token. Please try again.", {
        duration: 4000,
        position: "top-center",
      });
      setIsLoading(false);
    }
  };

  const handleTokenChange = (tokenValue) => {
    setToken(tokenValue);
    // Replace this with your actual token validation logic
    setIsValidToken(tokenValue.length === 6); // Example: assuming 6-digit token
  };

  const handlePasswordChange = (password, isConfirm = false) => {
    // Remove spaces from the input value
    const noSpacePassword = password.replace(/\s/g, '');
    
    if (isConfirm) {
      setConfirmPassword(noSpacePassword);
      setPasswordsMatch(newPassword === noSpacePassword);
    } else {
      setNewPassword(noSpacePassword);
      setPasswordsMatch(confirmPassword === noSpacePassword);
      // Check if password meets minimum length requirement
      setIsValidPassword(noSpacePassword.length >= 8);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      // Add your API call here
      toast.success("Your password has been changed successfully!", {
        duration: 4000,
        position: "top-center",
        icon: "✅",
        style: {
          backgroundColor: "#4ade80",
          color: "white",
        },
      });
      setIsLoading(false);
      // Optionally redirect to login page after successful password reset
      // navigate('/login');
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-blue-600">BPIT</span>{" "}
          <span className="text-red-500">COLLEGE CANTEEN</span>
        </h1>

        <form onSubmit={showResetForm ? handleResetPassword : handleSendToken}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
            <h2 className=" text-center text-2xl font-bold">Change your Password</h2>
            <h3 className="text-center opacity-50 text-sm mb-4"></h3>
          {!showResetForm ? (
            // Email Input Form
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />

              <button
                type="submit"
                disabled={!isValidEmail || isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Sending...
                  </div>
                ) : (
                  "Send Reset Token"
                )}
              </button>
            </div>
          ) : (
            // Reset Password Form
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  value={token}
                  onChange={(e) => handleTokenChange(e.target.value)}
                  placeholder="Enter Reset Token"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pr-12 ${
                    isValidToken ? 'border-green-500' : 'border-gray-300'
                  }`}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="relative">
                    <FaExclamationCircle
                      className="text-gray-500 hover:text-gray-700 cursor-help"
                      size={16}
                    />
                    <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 bg-opacity-90 text-white text-sm rounded-lg p-2 hidden group-hover:block shadow-lg">
                      {tokenRequirement}
                      <div className="absolute bottom-0 right-3 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800 bg-opacity-90"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => handlePasswordChange(e.target.value, false)}
                  placeholder="New Password"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pr-20 ${
                    passwordsMatch && isValidPassword ? 'border-green-500' : 'border-gray-300'
                  }`}
                  required
                  minLength={8}
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
                    {showPassword ? <FaEye size={20} /> :  <FaEyeSlash size={20} />}
                  </button>
                </div>
              </div>

              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handlePasswordChange(e.target.value, true)}
                  placeholder="Confirm New Password"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pr-20 ${
                    passwordsMatch && isValidPassword ? 'border-green-500' : 'border-gray-300'
                  }`}
                  required
                  minLength={8}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="relative">
                    <FaExclamationCircle
                      className="text-gray-500 hover:text-gray-700 cursor-help"
                      size={16}
                    />
                    <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 bg-opacity-90 text-white text-sm rounded-lg p-2 hidden group-hover:block shadow-lg">
                      {confirmPasswordRequirement}
                      <div className="absolute bottom-0 right-3 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800 bg-opacity-90"></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FaEye size={20} /> :  <FaEyeSlash size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isValidPassword || !passwordsMatch || !isValidToken}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Resetting...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          )}

          <Link
            to="/login"
            className="block text-center mt-4 text-blue-600 hover:text-blue-800"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
