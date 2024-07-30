import React, { useState } from 'react';
import { GiVacuumCleaner } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase'; 
import ForgotPasswordModal from '../Components/ForgotPasswordModal';
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    loginError: ''
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors({ ...newErrors, loginError: '' });
    if (Object.keys(newErrors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        window.location.href = '/dashboard';
      } catch (error) {
        setErrors({ ...newErrors, loginError: 'Invalid email or password' });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = '/dashboard';
    } catch (error) {
      setErrors({ ...errors, loginError: 'Failed to sign in with Google' });
    }
  };

  return (
    <div className="bg-[#11a37f] p-[2px] md:h-screen flex md:justify-center md:p-[50px] lg:p-[50px] xl:p-[50px]">
      <div className="bg-[#fbfdfd] rounded-2xl py-[2px] md:py-[50px] w-full lg:py-[50px] xl:py-[50px] px-[2px] lg:px-[320px] xl:px-[320px]">
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
                <div className='text-left mb-1'>Email</div>
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
                </div>
              </div>
              <div className='mt-6'>
                <div className="flex justify-between">
                  <div className='mb-1'>Password</div>
                  <div
                    className="text-[#1e9d77] cursor-pointer"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </div>
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
            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="bg-[#4285F4] text-white w-full py-2 rounded-xl flex items-center justify-center"
              >
                <div className="w-5 h-5 mt-1 mr-2">
                  <FaGoogle />
                </div>
                Sign In with Google
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <div>Don't have an account?</div>
              <Link to="/signup">
                <div className="text-[#10a37f]">Sign up</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        show={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}
