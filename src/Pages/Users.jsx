import React, { useState, useRef, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Users() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: ""
    });
    const [errors, setErrors] = useState({});
    const modalRef = useRef(null);
  
    const toggleModal = () => {
      setShowModal(!showModal);
      if (!showModal) {
        setFormData({
          name: "",
          phone: "",
          email: ""
        });
        setErrors({});
      }
    };
  
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
        setShowModal(false);
      }
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowModal(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div className='p-8'>
        <div className='flex justify-between'>
          <div>Manage Users</div>
          <div>
            <button onClick={toggleModal} className='bg-teal-500 text-white py-2 px-6 rounded'>New User</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-1 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-1 text-center py-2">1</td>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2">1234567890</td>
                <td className="border px-4 py-2">john@example.com</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <Link to='/editusers'>
                      <div><FaRegEdit className='text-green-500' /></div>
                    </Link>
                    <div><MdDelete className='text-red-500' /></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border px-1 text-center py-2">2</td>
                <td className="border px-4 py-2">Jane Doe</td>
                <td className="border px-4 py-2">9876543210</td>
                <td className="border px-4 py-2">jane@example.com</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <Link to='/editusers'>
                      <div><FaRegEdit className='text-green-500' /></div>
                    </Link>
                    <div><MdDelete className='text-red-500' /></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border text-center px-1 py-2">3</td>
                <td className="border px-4 py-2">Alice Smith</td>
                <td className="border px-4 py-2">5556667777</td>
                <td className="border px-4 py-2">alice@example.com</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <Link to='/editusers'>
                      <div><FaRegEdit className='text-green-500' /></div>
                    </Link>
                    <div><MdDelete className='text-red-500' /></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border text-center px-1 py-2">4</td>
                <td className="border px-4 py-2">Bob Johnson</td>
                <td className="border px-4 py-2">3332221111</td>
                <td className="border px-4 py-2">bob@example.com</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <Link to='/editusers'>
                      <div><FaRegEdit className='text-green-500' /></div>
                    </Link>
                    <div><MdDelete className='text-red-500' /></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border text-center px-1 py-2">5</td>
                <td className="border px-4 py-2">Emily Wilson</td>
                <td className="border px-4 py-2">7778889999</td>
                <td className="border px-4 py-2">emily@example.com</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <Link to='/editusers'>
                      <div><FaRegEdit className='text-green-500' /></div>
                    </Link>
                    <div><MdDelete className='text-red-500' /></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white w-full mx-2 xl:w-1/2 lg:w-1/2 p-8 rounded-lg" ref={modalRef}>
            <h2 className="text-lg font-semibold mb-4">New User</h2>
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
                <button
                  onClick={toggleModal}
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
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
        )}
      </div>
  )
}
