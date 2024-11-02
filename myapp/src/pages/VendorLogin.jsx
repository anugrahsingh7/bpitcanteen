import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const COUNTRY_CODES = ['+91'];
const VENDOR_MOBILE = '8433145171'; // This will be replaced with API data later

function VendorLogin() {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [countryCode, setCountryCode] = useState('+91');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !mobile.trim()) {
            toast.error('Please fill all fields');
            return;
        }
        if (mobile.length !== 10) {
            toast.error('Please enter valid mobile number');
            return;
        }
        
        if (mobile !== VENDOR_MOBILE) {
            toast.error('Please enter registered vendor mobile number');
            return;
        }
        
        toast.success(`OTP sent to +91 ${mobile}`, {
            duration: 4000,
            position: 'top-center',
            style: {
                background: '#4B5563',
                color: '#fff',
            },
            icon: '📱'
        });
        
        setShowOTP(true);
    };

    const handleOTPChange = (index, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOtp(newOTP);

            if (value && index < 3) {
                const nextInput = document.querySelector(`input[name=otp${index + 1}]`);
                nextInput?.focus();
            }
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join('');
        
        if (enteredOTP === '1234') {
            setIsLoading(true);
            setTimeout(() => {
                localStorage.setItem('vendorName', name);
                toast.success('Vendor Login successful!');
                setTimeout(() => {
                    navigate('/vendor-dashboard', { replace: true });
                }, 0);
                setIsLoading(false);
            }, 1500);
        } else {
            toast.error('Invalid OTP');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-100 flex justify-center items-center p-4">
            <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
                <form 
                    onSubmit={showOTP ? handleVerifyOTP : handleSubmit}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-3 animate-[fadeIn_0.6s_ease-out]">
                            <span className="text-blue-600">BPIT</span>{' '}
                            <span className="text-red-500">COLLEGE CANTEEN
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

                    {!showOTP ? (
                        <>
                            <div className="space-y-2 mb-4 animate-[fadeIn_0.7s_ease-out]">
                                <label className="block text-gray-700 text-sm font-semibold">
                                    Vendor Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-2 mb-6 animate-[fadeIn_0.8s_ease-out]">
                                <label className="block text-gray-700 text-sm font-semibold">
                                    Mobile Number
                                </label>
                                <div className="flex">
                                    <div className="px-3 py-2 rounded-lg border bg-gray-50 text-gray-700 mr-2">
                                        +91
                                    </div>
                                    <input
                                        type="tel"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                                        placeholder="Enter mobile number"
                                        maxLength={10}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4 mb-6 animate-[fadeIn_0.7s_ease-out]">
                            <label className="block text-gray-700 text-sm font-semibold text-center">
                                Enter OTP sent to +91 {mobile}
                            </label>
                            <div className="flex justify-center space-x-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        name={`otp${index}`}
                                        value={digit}
                                        onChange={(e) => handleOTPChange(index, e.target.value)}
                                        className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:border-blue-500"
                                        maxLength={1}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                        ) : (
                            showOTP ? 'Verify OTP' : 'Get OTP'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VendorLogin; 