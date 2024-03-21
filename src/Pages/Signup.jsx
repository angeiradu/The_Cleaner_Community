import React, { useState } from 'react';
import { GiVacuumCleaner } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password.trim())) {
      newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="bg-[#11a37f] p-[2px]  flex md:justify-center md:p-[50px] lg:p-[50px] xl:p-[50px]">
      <div className="bg-[#fbfdfd] rounded-2xl py-[2px] md:py-[50px] w-full lg:py-[50px] xl:py-[50px]  px-[2px]  lg:px-[320px] xl:px-[320px]">
        <div className="bg-[#ffffff] p-2 rounded">
          <div className="bg-[#eef8f6] py-[50px] md:py-[20px] lg:py-[20px] xl:py-[20px] p-[20px] rounded text-center">
            <div>
              <div className="flex justify-center mb-4">
                <GiVacuumCleaner className="text-green-500 text-[40px]" />
              </div>
              <div className='mb-5'>Welcome to The cleaner Community</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className='text-left mb-1'>User Name</div>
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full border border-gray-400 rounded-xl px-6 py-2"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                  {errors.username && (
                    <span className="text-red-500 flex">{errors.username}</span>
                  )}
                </div>
              </div>
              <div className='mt-6'>
                <div className="flex justify-between">
                  <div className='mb-1'>Email</div>
                </div>
                <div className="w-full">
                  <input
                    type="email"
                    className="w-full border border-gray-400 rounded-xl px-6 py-2"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <span className="text-red-500 flex">{errors.email}</span>
                  )}
                  {!errors.email && formData.email.trim() && !validateEmail(formData.email.trim()) && (
                    <span className="text-red-500 flex">Invalid email format</span>
                  )}
                </div>
              </div>
              <div className='mt-6'>
                <div className="flex justify-between">
                  <div className='mb-1'>Phone</div>
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full border border-gray-400 rounded-xl px-6 py-2"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                  />
                  {errors.phone && (
                    <span className="text-red-500 flex">{errors.phone}</span>
                  )}
                </div>
              </div>
              <div className='mt-6'>
                <div className="flex justify-between">
                  <div className='mb-1'>Password</div>
                </div>
                <div className="w-full">
                  <input
                    type="password"
                    className="w-full border border-gray-400 rounded-xl px-6 py-2"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <span className="text-red-500 flex">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className='mt-6'>
                <div className="flex justify-between">
                  <div className='mb-1'>Confirm Password</div>
                </div>
                <div className="w-full">
                  <input
                    type="password"
                    className="w-full border border-gray-400 rounded-xl px-6 py-2"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 flex">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
              <div className='mt-6'>
                <button
                  type="submit"
                  className="bg-[#10a37f] w-full py-2 text-center text-white rounded-xl"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex gap-2 mt-2">
              <div>Already have an account?</div>
              <Link to="/">
                <div className="text-[#10a37f]">Login</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
