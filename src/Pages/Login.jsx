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
    password: ''
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
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="bg-[#11a37f] p-[50px]">
      <div className="bg-[#fbfdfd] rounded-2xl py-[50px] px-[320px]">
        <div className="bg-[#ffffff] p-2 rounded">
          <div className="bg-[#eef8f6] p-[20px] rounded text-center">
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
