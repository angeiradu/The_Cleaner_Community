import React, { useState } from 'react';
import { GiVacuumCleaner } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    loginError: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors({ ...newErrors, loginError: '' });
    if (Object.keys(newErrors).length === 0) {
      const storedUserData = JSON.parse(localStorage.getItem('formData'));
      if (storedUserData && formData.username === storedUserData.email && formData.password === storedUserData.password) {
        
        window.location.href = '/dashboard';
      } else {
        setErrors({ ...newErrors, loginError: 'Invalid username or password' });
      }
    }
  };

  return (
    <div className="bg-[#11a37f] p-[2px] md:h-screen flex md:justify-center md:p-[50px] lg:p-[50px] xl:p-[50px]">
      <div className="bg-[#fbfdfd] rounded-2xl py-[2px] md:py-[50px] w-full lg:py-[50px] xl:py-[50px]  px-[2px]  lg:px-[320px] xl:px-[320px]">
        <div className="bg-[#ffffff] p-2 rounded">
          <div className="bg-[#eef8f6] py-[150px] md:py-[220px] lg:py-[20px] xl:py-[20px] p-[20px] rounded text-center">
            <div>
              <div className="flex justify-center mb-4">
                <GiVacuumCleaner className="text-green-500 text-[40px]" />
              </div>
              <div className='mb-5'>Welcome Back!</div>
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
                    placeholder="Email or mobile number"
                  />
                  {errors.username && (
                    <span className="text-red-500 flex">{errors.username}</span>
                  )}
                </div>
              </div>
              <div className='mt-6'>
                <div className="flex justify-between">
                  <div className='mb-1'>Password</div>
                  <div className="text-[#1e9d77]">Forgot password?</div>
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
                <button
                  type="submit"
                  className="bg-[#10a37f] w-full py-2 text-center text-white rounded-xl"
                >
                  Sign In
                </button>
                {errors.loginError && (
                  <span className="text-red-500 flex mt-2">{errors.loginError}</span>
                )}
              </div>
            </form>
            <div className="flex gap-2 mt-2">
              <div>Don't have an account?</div>
              <Link to="/signup">
                <div className="text-[#10a37f]">Sign up</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
