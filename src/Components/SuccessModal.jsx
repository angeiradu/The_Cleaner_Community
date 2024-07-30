import React from 'react';
import { Link } from 'react-router-dom';

export default function SuccessModal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div className="text-green-500 mt-4">Registration successful!</div>
        <div className="mt-4 flex justify-between">
          <Link to="/">
            <button className="bg-[#10a37f] text-white py-2 px-4 rounded-lg">
              Go to Login
            </button>
          </Link>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
