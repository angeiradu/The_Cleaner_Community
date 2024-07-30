import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'; // adjust the import according to your file structure

export default function ForgotPasswordModal({ show, onClose }) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-bold">Forgot Password</h2>
        {emailSent ? (
          <div className="text-green-500 mt-4">Password reset email sent!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <div className='mb-1'>Email</div>
              <input
                type="email"
                className="w-full border border-gray-400 rounded-xl px-6 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {error && (
                <div className="text-red-500 mt-2">{error}</div>
              )}
            </div>
            <div className='mt-4'>
              <button
                type="submit"
                className="bg-[#10a37f] w-full py-2 text-center text-white rounded-xl"
              >
                Send Reset Email
              </button>
            </div>
          </form>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
