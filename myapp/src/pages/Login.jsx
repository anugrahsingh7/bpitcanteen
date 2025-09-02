import gsap from "gsap";
import { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { useLogin } from "../lib/login";
import { useGoogleLogin } from "../lib/useGoogleLogin";
import { toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State to track login process
  const { mutate: login } = useLogin();
  const { mutate: googleLogin } = useGoogleLogin();

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail && password) {
      setIsLoggingIn(true);
      toast.info("Please wait while logging in..."); // Toast message
      const userDetails = { email, password };
      login(userDetails, {
        onSettled: () => setIsLoggingIn(false) // Reset state after login attempt
      });
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  };
  const handlePasswordChange = (e) => setPassword(e.target.value.replace(/\s/g, ""));

  useEffect(() => {
    gsap.to(".fade-in", { opacity: 1, y: 0, duration: 1, delay: 0.3 });
  }, []);

  return (
    <div className="w-screen min-h-screen flex bg-[#f8f1e7] justify-center items-center p-2 fade-in" style={{ opacity: 0, transform: 'translateY(50px)' }}>
      <div className="w-full max-w-sm p-6 bg-[#f8f1e7] border border-[#592e1f] rounded-lg shadow-md">
        <div className="flex justify-center"><img className="h-24 mb-0" src="/logo/Canteen.png" alt="logo" /></div>
       
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-md text-[#592e1f]">Email</label>
            <input type="email" value={email} onChange={handleEmailChange} placeholder='Enter your email' className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg border-[#592e1f] placeholder-opacity-40" />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label className="block text-md text-[#592e1f]">Password</label>
              <Link to="/forgetpassword" className="text-xs text-[#592e1f] hover:underline">Forget Password?</Link>
            </div>
            <div className="relative">
              <input type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder='Enter your password' className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg border-[#592e1f] placeholder-opacity-40" />
              <button type="button" onClick={togglePasswordVisibility} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#592e1f]">
                {isPasswordVisible ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" disabled={!isValidEmail || isLoggingIn} className={`flex justify-center items-center w-full px-6 py-2.5 text-sm font-medium text-white rounded-lg bg-[#592e1f] hover:bg-[#50291b] ${(!isValidEmail || isLoggingIn) && "opacity-80 cursor-not-allowed"}`}>
              {isLoggingIn ? <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div> : "Login"}
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
        <p className="mt-6 text-sm text-center text-[#592e1f] hover:text-[#502214]"><Link to="/vendor-login" className="font-semibold underline ">Vendor Login</Link></p>
        <p className="mt-1 text-xs text-center text-[#592e1f] hover:text-[#502214]">Don't have an account? <Link to="/SignUp" className="font-medium underline">Create One</Link></p>
      </div>
    </div>
  );
};

export default Login;
