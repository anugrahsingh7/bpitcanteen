import gsap from "gsap";
import { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { useLogin } from "../lib/login";
import { useGoogleLogin } from "../lib/useGoogleLogin";
import Loading from "../components/Loading";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const { mutate: login, isLoading } = useLogin();
  const { mutate: googleLogin } = useGoogleLogin();

  const duration = 1;
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
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-[#f8f1e7] border border-[#592e1f] rounded-lg border-opacity-40 shadow-md  ">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-24 sm:h-24" src="/logo/logo-removebg.png" alt="" />
        </div>
        <p className="mt-1 -mb-5 text-xs font-light text-center text-[#592e1f]">
          <Link to="/vendor-login" className="font-semibold opacity-85 hover:opacity-100 text-[#592e1f] hover:underline ">Vendor Login</Link>
        </p>

        <form 
        onSubmit={handleSubmit}
        className="mt-6">
          <div>
            <label htmlFor="email" className="block text-md text-[#592e1f] ">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter your email address'
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40 "
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-md text-[#592e1f] ">Password</label>
              <Link to="/forgetpassword" className="text-xs text-[#592e1f] opacity-75 hover:opacity-100 hover:underline">Forget Password?</Link>
            </div>

            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter your password'
                className="block w-full px-4 py-2 mt-2  bg-white border rounded-lg  border-[#592e1f] placeholder:text-[#592e1f] placeholder:text-opacity-40"
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

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading || !isValidEmail}
              className={`w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg   bg-[#592e1f] hover:bg-[#50291b] 
                ${
                    !isLoading && isValidEmail
                      ? "opacity-100"
                      : "opacity-80 cursor-not-allowed"
                  }`
              }
            >
                {isLoading ? (
              <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b border-[#592e1f] lg:w-1/5"></span>

          <div className="text-xs text-center  uppercase text-[#592e1f] opacity-75">
            or continue with 
          </div>

          <span className="w-1/5 border-b border-[#592e1f] lg:w-1/5 opacity-75"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button
          onClick={() => googleLogin()}
           type="button" className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-[#592e1f] transition-colors duration-300 transform border border-[#592e1f] rounded-lg hover:bg-[#ffffff] border-opacity-75 ">
            <FcGoogle className='text-lg' />
            <span className=" mx-2 ">Sign in with Google</span>
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-[#592e1f]">
          Don't have an account? <Link to="/SignUp" className="font-medium text-[#592e1f] hover:underline">Create One</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
