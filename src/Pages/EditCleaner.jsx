import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EditCleaner() {
    
    const [formData, setFormData] = useState({
        name: "",
        services: "",
        phone: "",
        email: ""
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.name.trim()) {
          validationErrors.name = "Name is required";
        }
        if (!formData.services.trim()) {
          validationErrors.services = "Services is required";
        }
        if (!formData.phone.trim()) {
          validationErrors.phone = "Phone is required";
        }
        if (!formData.email.trim()) {
          validationErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          validationErrors.email = "Email is invalid";
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          console.log(formData);
        }
      };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white w-full mx-2 xl:w-1/2 lg:w-1/2 p-8 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Edit Cleaner</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={`mt-1 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`} 
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="services" className="block text-sm font-medium text-gray-700">Services</label>
              <select name="services" onChange={handleChange}  className={`mt-1 p-2 border ${errors.services ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`} id="services">
                <option value="" >Choose Services</option>
                <option value="Cleaning" >Cleaning</option>
                <option value="Window Cleaning" >Window Cleaning</option>
                <option value="Floor Cleaning" >Floor Cleaning</option>
                <option value="Carpet Cleaning" >Carpet Cleaning</option>
                <option value="Deep Cleaning" >Deep Cleaning</option>
              </select>
              {errors.services && <p className="text-red-500 text-sm">{errors.services}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className={`mt-1 p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`} 
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={`mt-1 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`} 
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex justify-end">
                <Link to='/cleaner'>
                    <button
                        type="button"
                        className="bg-gray-400 text-white py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                </Link>
              <button
                type="submit"
                className="bg-teal-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
