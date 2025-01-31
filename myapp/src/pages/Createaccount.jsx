import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignup } from "../lib/signup";

function CreateAccount() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
        <h2 className="text-2xl font-bold animate-[fadeIn_0.6s_ease-out] text-center">
          <span className="text-blue-600">BPIT</span>{" "}
          <span className="text-red-500">
            COLLEGE CANTEEN
            <i className="fa-solid fa-utensils ms-2 animate-bounce"></i>
          </span>
        </h2>
        <div className="text-center mb-3"></div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-center text-2xl font-bold">
            Create a new account
          </h2>
          <h3 className="text-center opacity-50 text-sm mb-4">
            Its quick and easy.
          </h3>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
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
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium mt-6 bg-yellow-500 text-white transition-opacity duration-200 ${
              isLoading
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
