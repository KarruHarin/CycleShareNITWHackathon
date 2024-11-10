// src/pages/Login.js
import React, { useState,useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setUser} = useContext(userContext);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)

    try{
      const res = await axios.post("http://localhost:8000/user/login",{email:email,password:password});
     console.log(res);
     setUser(res.data.data)
     localStorage.setItem("AccessToken",res.data.data.accessToken)
     localStorage.setItem("RefreshToken",res.data.data.accessToken)
     localStorage.setItem("id",res.data.data.user._id)
     localStorage.setItem("username",res.data.data.user.username)
     localStorage.setItem("college",res.data.data.user.college)
     navigate("/homepage")
 

    }catch(e){
          console.log(e)
      }

    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-100 to-yellow-200 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-lg border-2 border-yellow-400"
      >
        <motion.h2
          className="text-4xl font-bold text-gray-900 text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Login
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border-2 border-yellow-300 rounded-md shadow-sm focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            required
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border-2 border-yellow-300 rounded-md shadow-sm focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            required
          />
          <motion.button
            type="submit"
            className="w-full py-3 mt-4 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            Login
          </motion.button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-yellow-600 hover:text-yellow-700 underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;