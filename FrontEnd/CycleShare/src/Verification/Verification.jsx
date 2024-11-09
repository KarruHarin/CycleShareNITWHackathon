import React, { useState,useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { userContext } from '../Context/userContext'; 
import axios from 'axios';

function Verification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
const {user} = useContext(userContext)
  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input if current input is filled
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle backspace to focus previous input field
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  // Handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (otp.join('').length === 6) {
  let code = otp.join('')
        const res = await axios.post("http://localhost:8000/user/verify",{email:user.email,verificationCode:code})
        console.log(res)
      navigate('/login');
    } else {
      alert('Please enter a valid OTP');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-100 to-yellow-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-full max-w-sm p-8 space-y-6 bg-white shadow-2xl rounded-lg border-2 border-yellow-400"
      >
        <motion.h2
          className="text-3xl font-bold text-gray-900 text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          OTP Verification
        </motion.h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-2">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-yellow-300 rounded-md shadow-sm focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 focus:outline-none transition-all duration-300"
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                required
              />
            ))}
          </div>
          <motion.button
            type="submit"
            className="w-full py-3 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Verification;
