import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLogin } from "../lib/login";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { mutate: login, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail && password) {
      const userDetails = {
        email: email,
        password: password,
      };
      login(userDetails);
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const noSpacePassword = e.target.value.replace(/\s/g, "");
    setPassword(noSpacePassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-100 flex justify-center items-center p-4">
      {showWelcome ? (
        <div className="text-center p-8 backdrop-blur-sm rounded-2xl animate-[fadeIn_0.5s_ease-out]">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] animate-[fadeIn_0.5s_ease-out]">
              BPIT COLLEGE CANTEEN
              <i className="fa-solid fa-utensils ms-2 animate-bounce"></i>
            </h1>
            <h2 className="text-2xl md:text-3xl text-red-500 mt-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] animate-[fadeIn_0.8s_ease-out]">
              WELCOMES YOU{" "}
              <span className="font-bold animate-pulse">{name}!</span>
            </h2>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
          <h2 className="text-2xl font-bold mb-0 animate-[fadeIn_0.6s_ease-out] text-center">
            <span className="text-blue-600">BPIT</span>{" "}
            <span className="text-red-500">
              COLLEGE CANTEEN
              <i className="fa-solid fa-utensils ms-2 animate-bounce"></i>
            </span>
          </h2>
          <div className="text-center mb-3"></div>
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <h2 className=" text-center text-2xl font-bold">
              Log into Canteen
            </h2>
            <h3 className="text-center opacity-50 text-sm mb-4">
              & order delicious food.
            </h3>

            <div className="space-y-2 mb-4 animate-[fadeIn_0.8s_ease-out]">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email Address"
                className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-300 hover:shadow-md
                  ${
                    isValidEmail
                      ? "border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      : "border-gray-300 focus:ring-2 focus:ring-orange-400  focus:border-transparent"
                  }`}
                required
              />
            </div>

            <div className="space-y-2 mb-6 animate-[fadeIn_0.9s_ease-out]">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400  outline-none focus:border-transparent transition-all duration-300 hover:shadow-md pr-12"
                  required
                  minLength="8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isValidEmail}
              className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium flex items-center justify-center ${
                !isLoading && isValidEmail
                  ? "opacity-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                "Login"
              )}
            </button>

            <Link
              to="/forgetpassword"
              className="text-md text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 flex justify-center items-center border-b-2 border-b-black border-opacity-20 p-4"
            >
              Forgotten password?
            </Link>

            <Link
              to="/createaccount"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center bg-opacity-70 hover:bg-opacity-100 mt-5"
            >
              Create new account
            </Link>

            <Link
              to="/vendor-login"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium flex items-center justify-center bg-opacity-70 hover:bg-opacity-100 mt-5"
            >
              Login as a Vendor →
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
