import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useForgotPassword } from "../lib/forgotPassword";
import { useResetPassword } from "../lib/resetPassword";
import { useEffect } from "react";
import gsap from "gsap"; 

function ForgetPassword() {
  const duration = 1;
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isValidToken, setIsValidToken] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const { mutate: forgotPassword } = useForgotPassword();
  const { mutate: resetPassword } = useResetPassword();
  const passwordRequirements =
    "Enter a combination of at least 8 numbers, letters, or special characters";
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
    forgotPassword(email);
    setShowResetForm(true);
  };
  const handlePasswordChange = (password, isConfirm = false) => {
    // Remove spaces from the input value
    const noSpacePassword = password.replace(/\s/g, "");

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
      resetPassword({ email, token, newPassword });
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
  const handleTokenChange = (tokenValue) => {
    setToken(tokenValue);
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
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-[#f8f1e7] border border-[#592e1f] border-opacity-40 rounded-lg shadow-md ">
        
      <div className="flex justify-center mx-auto">
          <img className="w-auto h-24 sm:h-24" src="/logo/logo-removebg.png" alt="" />
        </div>
        

        <form
          onSubmit={showResetForm ? handleResetPassword : handleSendToken}
          className="mt-6"
        >

          {!showResetForm ? (
            // Email Input Form
            <div className="">
                <label htmlFor="email" className="block text-md text-[#592e1f] ">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Enter your email"
                className="block w-full px-4 py-2 mt-2  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40"
                required
              />
             <div className="mt-6">
              <button
                type="submit"
                disabled={!isValidEmail || isLoading}
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg   bg-[#592e1f] hover:bg-[#50291b]"
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
                  className={`block w-full px-4 py-2 mt-2  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40 `}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="relative">
                    <FaExclamationCircle
                      className="text-[#592e1f] opacity-85 cursor-help"
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
                  className={`block w-full px-4 py-2 mt-2  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40 ${
                    passwordsMatch && isValidPassword
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  required
                  minLength={8}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="relative">
                    <FaExclamationCircle
                      className="text-[#592e1f] opacity-85 cursor-help"
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
                    className="text-[#592e1f]"
                  >
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handlePasswordChange(e.target.value, true)}
                  placeholder="Confirm New Password"
                  className={`block w-full px-4 py-2 mt-2  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40 `}
                  required
                  minLength={8}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="relative">
                    <FaExclamationCircle
                      className="text-[#592e1f] opacity-85 cursor-help"
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
                    className="text-[#592e1f]"
                  >
                    {showConfirmPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isValidPassword || !passwordsMatch}
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg   bg-[#592e1f] hover:bg-[#50291b]"
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

         <p className="mt-4 text-xs font-light text-center text-[#592e1f]">
          Don't want to change password? <Link to="/Login" className="font-medium text-[#592e1f] hover:underline">Log In</Link>
        </p>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
