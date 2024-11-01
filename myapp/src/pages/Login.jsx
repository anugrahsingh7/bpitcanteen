import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', name: 'India' },
  { code: '+93', country: 'AF', name: 'Afghanistan' },
  { code: '+355', country: 'AL', name: 'Albania' },
  { code: '+213', country: 'DZ', name: 'Algeria' },
  { code: '+376', country: 'AD', name: 'Andorra' },
  { code: '+244', country: 'AO', name: 'Angola' },
  { code: '+1', country: 'AG', name: 'Antigua and Barbuda' },
  { code: '+54', country: 'AR', name: 'Argentina' },
  { code: '+374', country: 'AM', name: 'Armenia' },
  { code: '+61', country: 'AU', name: 'Australia' },
  { code: '+43', country: 'AT', name: 'Austria' },
  { code: '+994', country: 'AZ', name: 'Azerbaijan' },
  { code: '+1', country: 'BS', name: 'Bahamas' },
  { code: '+973', country: 'BH', name: 'Bahrain' },
  { code: '+880', country: 'BD', name: 'Bangladesh' },
  { code: '+1', country: 'BB', name: 'Barbados' },
  { code: '+375', country: 'BY', name: 'Belarus' },
  { code: '+32', country: 'BE', name: 'Belgium' },
  { code: '+501', country: 'BZ', name: 'Belize' },
  { code: '+229', country: 'BJ', name: 'Benin' },
  { code: '+975', country: 'BT', name: 'Bhutan' },
  { code: '+591', country: 'BO', name: 'Bolivia' },
  { code: '+387', country: 'BA', name: 'Bosnia and Herzegovina' },
  { code: '+267', country: 'BW', name: 'Botswana' },
  { code: '+55', country: 'BR', name: 'Brazil' },
  { code: '+673', country: 'BN', name: 'Brunei' },
  { code: '+359', country: 'BG', name: 'Bulgaria' },
  { code: '+226', country: 'BF', name: 'Burkina Faso' },
  { code: '+257', country: 'BI', name: 'Burundi' },
  { code: '+855', country: 'KH', name: 'Cambodia' },
  { code: '+237', country: 'CM', name: 'Cameroon' },
  { code: '+1', country: 'CA', name: 'Canada' },
  { code: '+236', country: 'CF', name: 'Central African Republic' },
  { code: '+235', country: 'TD', name: 'Chad' },
  { code: '+56', country: 'CL', name: 'Chile' },
  { code: '+86', country: 'CN', name: 'China' },
  { code: '+57', country: 'CO', name: 'Colombia' },
  { code: '+269', country: 'KM', name: 'Comoros' },
  { code: '+242', country: 'CG', name: 'Congo' },
  { code: '+506', country: 'CR', name: 'Costa Rica' },
  { code: '+385', country: 'HR', name: 'Croatia' },
  { code: '+53', country: 'CU', name: 'Cuba' },
  { code: '+357', country: 'CY', name: 'Cyprus' },
  { code: '+420', country: 'CZ', name: 'Czech Republic' },
  { code: '+45', country: 'DK', name: 'Denmark' },
  { code: '+253', country: 'DJ', name: 'Djibouti' },
  { code: '+1', country: 'DM', name: 'Dominica' },
  { code: '+1', country: 'DO', name: 'Dominican Republic' },
  { code: '+670', country: 'TL', name: 'East Timor' },
  { code: '+593', country: 'EC', name: 'Ecuador' },
  { code: '+20', country: 'EG', name: 'Egypt' },
  { code: '+503', country: 'SV', name: 'El Salvador' },
  { code: '+240', country: 'GQ', name: 'Equatorial Guinea' },
  { code: '+291', country: 'ER', name: 'Eritrea' },
  { code: '+372', country: 'EE', name: 'Estonia' },
  { code: '+251', country: 'ET', name: 'Ethiopia' },
  { code: '+679', country: 'FJ', name: 'Fiji' },
  { code: '+358', country: 'FI', name: 'Finland' },
  { code: '+33', country: 'FR', name: 'France' },
  { code: '+241', country: 'GA', name: 'Gabon' },
  { code: '+220', country: 'GM', name: 'Gambia' },
  { code: '+995', country: 'GE', name: 'Georgia' },
  { code: '+49', country: 'DE', name: 'Germany' },
  { code: '+233', country: 'GH', name: 'Ghana' },
  { code: '+30', country: 'GR', name: 'Greece' },
  { code: '+1', country: 'GD', name: 'Grenada' },
  { code: '+502', country: 'GT', name: 'Guatemala' },
  { code: '+224', country: 'GN', name: 'Guinea' },
  { code: '+245', country: 'GW', name: 'Guinea-Bissau' },
  { code: '+592', country: 'GY', name: 'Guyana' },
  { code: '+509', country: 'HT', name: 'Haiti' },
  { code: '+504', country: 'HN', name: 'Honduras' },
  { code: '+852', country: 'HK', name: 'Hong Kong' },
  { code: '+36', country: 'HU', name: 'Hungary' },
  { code: '+354', country: 'IS', name: 'Iceland' },
  { code: '+62', country: 'ID', name: 'Indonesia' },
  { code: '+98', country: 'IR', name: 'Iran' },
  { code: '+964', country: 'IQ', name: 'Iraq' },
  { code: '+353', country: 'IE', name: 'Ireland' },
  { code: '+972', country: 'IL', name: 'Israel' },
  { code: '+39', country: 'IT', name: 'Italy' },
  { code: '+1', country: 'JM', name: 'Jamaica' },
  { code: '+81', country: 'JP', name: 'Japan' },
  { code: '+962', country: 'JO', name: 'Jordan' },
  { code: '+7', country: 'KZ', name: 'Kazakhstan' },
  { code: '+254', country: 'KE', name: 'Kenya' },
  { code: '+686', country: 'KI', name: 'Kiribati' },
  { code: '+82', country: 'KR', name: 'South Korea' },
  { code: '+965', country: 'KW', name: 'Kuwait' },
  { code: '+996', country: 'KG', name: 'Kyrgyzstan' },
  { code: '+856', country: 'LA', name: 'Laos' },
  { code: '+371', country: 'LV', name: 'Latvia' },
  { code: '+961', country: 'LB', name: 'Lebanon' },
  { code: '+266', country: 'LS', name: 'Lesotho' },
  { code: '+231', country: 'LR', name: 'Liberia' },
  { code: '+218', country: 'LY', name: 'Libya' },
  { code: '+423', country: 'LI', name: 'Liechtenstein' },
  { code: '+370', country: 'LT', name: 'Lithuania' },
  { code: '+352', country: 'LU', name: 'Luxembourg' },
  { code: '+853', country: 'MO', name: 'Macao' },
  { code: '+389', country: 'MK', name: 'Macedonia' },
  { code: '+261', country: 'MG', name: 'Madagascar' },
  { code: '+265', country: 'MW', name: 'Malawi' },
  { code: '+60', country: 'MY', name: 'Malaysia' },
  { code: '+960', country: 'MV', name: 'Maldives' },
  { code: '+223', country: 'ML', name: 'Mali' },
  { code: '+356', country: 'MT', name: 'Malta' },
  { code: '+692', country: 'MH', name: 'Marshall Islands' },
  { code: '+222', country: 'MR', name: 'Mauritania' },
  { code: '+230', country: 'MU', name: 'Mauritius' },
  { code: '+52', country: 'MX', name: 'Mexico' },
  { code: '+373', country: 'MD', name: 'Moldova' },
  { code: '+377', country: 'MC', name: 'Monaco' },
  { code: '+976', country: 'MN', name: 'Mongolia' },
  { code: '+382', country: 'ME', name: 'Montenegro' },
  { code: '+212', country: 'MA', name: 'Morocco' },
  { code: '+258', country: 'MZ', name: 'Mozambique' },
  { code: '+95', country: 'MM', name: 'Myanmar' },
  { code: '+264', country: 'NA', name: 'Namibia' },
  { code: '+674', country: 'NR', name: 'Nauru' },
  { code: '+977', country: 'NP', name: 'Nepal' },
  { code: '+31', country: 'NL', name: 'Netherlands' },
  { code: '+64', country: 'NZ', name: 'New Zealand' },
  { code: '+505', country: 'NI', name: 'Nicaragua' },
  { code: '+227', country: 'NE', name: 'Niger' },
  { code: '+234', country: 'NG', name: 'Nigeria' },
  { code: '+850', country: 'KP', name: 'North Korea' },
  { code: '+47', country: 'NO', name: 'Norway' },
  { code: '+968', country: 'OM', name: 'Oman' },
  { code: '+92', country: 'PK', name: 'Pakistan' },
  { code: '+680', country: 'PW', name: 'Palau' },
  { code: '+970', country: 'PS', name: 'Palestine' },
  { code: '+507', country: 'PA', name: 'Panama' },
  { code: '+675', country: 'PG', name: 'Papua New Guinea' },
  { code: '+595', country: 'PY', name: 'Paraguay' },
  { code: '+51', country: 'PE', name: 'Peru' },
  { code: '+63', country: 'PH', name: 'Philippines' },
  { code: '+48', country: 'PL', name: 'Poland' },
  { code: '+351', country: 'PT', name: 'Portugal' },
  { code: '+974', country: 'QA', name: 'Qatar' },
  { code: '+40', country: 'RO', name: 'Romania' },
  { code: '+7', country: 'RU', name: 'Russia' },
  { code: '+250', country: 'RW', name: 'Rwanda' },
  { code: '+1', country: 'KN', name: 'Saint Kitts and Nevis' },
  { code: '+1', country: 'LC', name: 'Saint Lucia' },
  { code: '+1', country: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: '+685', country: 'WS', name: 'Samoa' },
  { code: '+378', country: 'SM', name: 'San Marino' },
  { code: '+239', country: 'ST', name: 'Sao Tome and Principe' },
  { code: '+966', country: 'SA', name: 'Saudi Arabia' },
  { code: '+221', country: 'SN', name: 'Senegal' },
  { code: '+381', country: 'RS', name: 'Serbia' },
  { code: '+248', country: 'SC', name: 'Seychelles' },
  { code: '+232', country: 'SL', name: 'Sierra Leone' },
  { code: '+65', country: 'SG', name: 'Singapore' },
  { code: '+421', country: 'SK', name: 'Slovakia' },
  { code: '+386', country: 'SI', name: 'Slovenia' },
  { code: '+677', country: 'SB', name: 'Solomon Islands' },
  { code: '+252', country: 'SO', name: 'Somalia' },
  { code: '+27', country: 'ZA', name: 'South Africa' },
  { code: '+211', country: 'SS', name: 'South Sudan' },
  { code: '+34', country: 'ES', name: 'Spain' },
  { code: '+94', country: 'LK', name: 'Sri Lanka' },
  { code: '+249', country: 'SD', name: 'Sudan' },
  { code: '+597', country: 'SR', name: 'Suriname' },
  { code: '+268', country: 'SZ', name: 'Swaziland' },
  { code: '+46', country: 'SE', name: 'Sweden' },
  { code: '+41', country: 'CH', name: 'Switzerland' },
  { code: '+963', country: 'SY', name: 'Syria' },
  { code: '+886', country: 'TW', name: 'Taiwan' },
  { code: '+992', country: 'TJ', name: 'Tajikistan' },
  { code: '+255', country: 'TZ', name: 'Tanzania' },
  { code: '+66', country: 'TH', name: 'Thailand' },
  { code: '+228', country: 'TG', name: 'Togo' },
  { code: '+676', country: 'TO', name: 'Tonga' },
  { code: '+1', country: 'TT', name: 'Trinidad and Tobago' },
  { code: '+216', country: 'TN', name: 'Tunisia' },
  { code: '+90', country: 'TR', name: 'Turkey' },
  { code: '+993', country: 'TM', name: 'Turkmenistan' },
  { code: '+688', country: 'TV', name: 'Tuvalu' },
  { code: '+256', country: 'UG', name: 'Uganda' },
  { code: '+380', country: 'UA', name: 'Ukraine' },
  { code: '+971', country: 'AE', name: 'United Arab Emirates' },
  { code: '+44', country: 'GB', name: 'United Kingdom' },
  { code: '+1', country: 'US', name: 'United States' },
  { code: '+598', country: 'UY', name: 'Uruguay' },
  { code: '+998', country: 'UZ', name: 'Uzbekistan' },
  { code: '+678', country: 'VU', name: 'Vanuatu' },
  { code: '+379', country: 'VA', name: 'Vatican City' },
  { code: '+58', country: 'VE', name: 'Venezuela' },
  { code: '+84', country: 'VN', name: 'Vietnam' },
  { code: '+967', country: 'YE', name: 'Yemen' },
  { code: '+260', country: 'ZM', name: 'Zambia' },
  { code: '+263', country: 'ZW', name: 'Zimbabwe' },
].sort((a, b) => {
  // Sort by country name, but put India first
  if (a.country === 'IN') return -1;
  if (b.country === 'IN') return 1;
  return a.name.localeCompare(b.name);
});

function Login() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countryCode, setCountryCode] = useState('+91');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowOTP(true);
    toast.success(`OTP sent to ${countryCode} ${mobile}`, {
      duration: 2500,
      position: 'top-center',
    });
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    
    // Handle backspace
    if (value === '' && index > 0) {
      // If backspace is pressed and we're not at the first input
      newOtp[index] = '';
      setOtp(newOtp);
      document.getElementById(`otp-${index - 1}`).focus();
      return;
    }

    // Handle regular input
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward if a number is entered
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Add this new function to handle keydown events
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // If backspace is pressed on an empty input and we're not at the first input
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerifyOTP = () => {
    if (otp.join('') === '1234') {
      setShowWelcome(true);
      setTimeout(() => {
        navigate('/snacks');
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-100 flex justify-center items-center p-4">
      {showWelcome ? (
        <div className="text-center p-8 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] opacity-0 animate-fadeIn">
              BPIT COLLEGE CANTEEN<i className="fa-solid fa-utensils  ms-2"></i>
            </h1>
            <h2 className="text-2xl md:text-3xl text-red-500 mt-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] opacity-0 animate-fadeInDelay">
              WELCOMES YOU <span className="font-bold">{name}!</span>
            </h2>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <form 
            onSubmit={handleSubmit} 
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              <span className="text-blue-600">BPIT</span>{' '}
              <span className="text-red-500">COLLEGE CANTEEN<i className="fa-solid fa-utensils ms-2"></i></span>
            </h2>

            <div className="space-y-2 mb-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2 mb-6">
              <label className="block text-gray-700 font-medium">Mobile No</label>
              <div className="flex flex-col gap-3">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none focus:border-transparent transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em] bg-[right_0.7rem_center] bg-no-repeat pr-8"
                >
                  {COUNTRY_CODES.map((country) => (
                    <option key={`${country.code}-${country.country}`} value={country.code}>
                      {country.code} ({country.name})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setMobile(value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none focus:border-transparent transition-all duration-300"
                  required
                  maxLength="10"
                  pattern="\d{10}"
                  placeholder="Enter 10 digit mobile number"
                />
              </div>
            </div>

            {showOTP ? (
              <>
                <div className="space-y-4 mb-6">
                  <label className="block text-gray-700 font-medium">Enter OTP</label>
                  <div className="flex gap-3 justify-center">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none focus:border-transparent transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  className="w-full bg-yellow-500  hover:bg-yellow-600 text-white py-3 rounded-lg font-medium  transform hover:scale-[1.02] transition-all duration-300 focus:ring-2  focus:ring-offset-2"
                >
                  Verify OTP
                </button>
              </>
            ) : (
              <button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium  transform hover:scale-[1.02] transition-all duration-300 focus:ring-2  focus:ring-offset-2 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  'Get OTP'
                )}
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
