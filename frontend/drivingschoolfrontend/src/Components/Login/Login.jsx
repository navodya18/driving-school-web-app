import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Left Side - Gradient Background */}
      <div className="w-full md:w-1/2 h-1/3 md:h-full bg-gradient-to-br from-[#003366] to-[#002244] flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl md:text-5xl text-white font-bold text-center">Drive Your Dreams Forward</h1>
        <p className="text-lg text-white mt-2">Login to Tharuka Driving School!</p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 h-2/3 md:h-full bg-[#f5f5f5] flex flex-col justify-center items-center px-8 sm:px-16 md:px-20">
        {/* Motion Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h3 className="text-3xl text-[#060606] font-semibold mb-2">Login</h3>
          <p className="text-base mb-6">Welcome Back! Please enter your details.</p>

          {/* Input Fields */}
          <div className="w-full flex flex-col gap-4 mb-6">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-2 bg-transparent border-b border-black outline-none focus:ring-2 focus:ring-[#003366] shadow-sm"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2 bg-transparent border-b border-black outline-none focus:ring-2 focus:ring-[#003366] shadow-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col mt-6">
            <button className="w-full text-white font-semibold bg-[#003366] hover:scale-105 transition-transform duration-200 rounded-md p-4">
              Log in   
            </button>
            <button className="w-full text-[#003366] border-2 border-[#003366] hover:bg-[#003366] hover:text-white transition-all duration-200 rounded-md p-4 mt-3">
              Register
            </button>
          </div>

          {/* Sign-up Link */}
          <div className="w-full flex items-center justify-center mt-6">
            <p className="text-sm font-normal text-[#060606]">
              Don't have an account?
              <span className="font-semibold underline underline-offset-2 cursor-pointer ml-1 relative after:content-[''] after:absolute after:bg-[#003366] after:h-[2px] after:w-0 after:left-0 after:bottom-[-2px] hover:after:w-full after:transition-all after:duration-300">
                Sign up here
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;