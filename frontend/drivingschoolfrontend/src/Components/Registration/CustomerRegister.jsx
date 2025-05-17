import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaIdCard, FaPhone, FaMapMarkerAlt, FaAddressCard, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CustomerRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    nic: '',
    licenseNumber: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific field error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate NIC format (9 digits + V at the end OR 12 digits)
  const validateNIC = (nic) => {
    if (!nic) return true; // NIC is optional, so empty is valid
    
    // Format 1: 9 digits followed by 'V' or 'v'
    const oldFormatRegex = /^[0-9]{9}[vV]$/;
    
    // Format 2: 12 digits
    const newFormatRegex = /^[0-9]{12}$/;
    
    return oldFormatRegex.test(nic) || newFormatRegex.test(nic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset all errors
    setErrors({});
    
    // Form validation
    let formErrors = {};
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords don't match";
    }

    // Validate password strength (matches backend constraint of 8-20 chars)
    if (formData.password.length < 8 || formData.password.length > 20) {
      formErrors.password = "Password must be between 8-20 characters";
    }

    // Validate phone number format
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      formErrors.phoneNumber = "Please enter a valid phone number";
    }

    // Validate NIC
    if (formData.nic && !validateNIC(formData.nic)) {
      formErrors.nic = "Please enter a valid NIC (9 digits + V or 12 digits)";
    }

    // If there are validation errors, show them and stop submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      
      // Show first error as toast
      const firstError = Object.values(formErrors)[0];
      toast.error(firstError);
      
      return;
    }

    setIsLoading(true);

    try {
      // Extract only the fields needed for the API and remove confirmPassword
      const { confirmPassword, ...apiData } = formData;
      
      const response = await axios.post(
        'http://localhost:8080/api/customers/auth/register', 
        apiData
      );

      toast.success('Registration successful!');
      
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          (error.response?.data?.errors && Object.values(error.response.data.errors).join(', ')) || 
                          'Registration failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full pl-10 pr-10 py-2 bg-transparent border-b outline-none focus:ring-2 focus:ring-[#003366] shadow-sm";
    return `${baseClass} ${errors[fieldName] ? 'border-red-500' : 'border-black'}`;
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Gradient Background */}
      <div className="w-full md:w-1/2 h-1/3 md:h-full bg-gradient-to-br from-[#003366] to-[#002244] flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl md:text-5xl text-white font-bold text-center">Start Your Journey Today</h1>
        <p className="text-lg text-white mt-2">Register with Tharuka Driving School!</p>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full md:w-1/2 bg-[#f5f5f5] flex flex-col justify-center items-center px-8 sm:px-16 md:px-20 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h3 className="text-3xl text-[#060606] font-semibold mb-2">Customer Registration</h3>
          <p className="text-base mb-6">Please fill in your details to register</p>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="w-full flex flex-col gap-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={getInputClassName('firstName')}
                    required
                  />
                </div>
                <div className="relative flex-1">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={getInputClassName('lastName')}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClassName('email')}
                  required
                />
              </div>

              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number (e.g., +94711234567)"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={getInputClassName('phoneNumber')}
                  required
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={getInputClassName('address')}
                />
              </div>

              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="nic"
                  placeholder="National ID (9 digits + V or 12 digits)"
                  value={formData.nic}
                  onChange={handleChange}
                  className={getInputClassName('nic')}
                />
                {errors.nic && (
                  <p className="text-xs text-red-500 mt-1">{errors.nic}</p>
                )}
                {!errors.nic && formData.nic && validateNIC(formData.nic) && (
                  <p className="text-xs text-green-600 mt-1">Valid NIC format</p>
                )}
              </div>

              {/* Password Fields */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password (8-20 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  className={getInputClassName('password')}
                  required
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={getInputClassName('confirmPassword')}
                  required
                />
                <button 
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col mt-6">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full text-white font-semibold bg-[#003366] hover:scale-105 transition-transform duration-200 rounded-md p-4 disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="w-full flex items-center justify-center mt-6">
            <p className="text-sm font-normal text-[#060606]">
              Already have an account?
              <Link 
                to="/login" 
                className="font-semibold underline underline-offset-2 cursor-pointer ml-1 relative after:content-[''] after:absolute after:bg-[#003366] after:h-[2px] after:w-0 after:left-0 after:bottom-[-2px] hover:after:w-full after:transition-all after:duration-300"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerRegister;