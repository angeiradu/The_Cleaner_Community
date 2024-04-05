import React, { useState, useRef } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Cleaner() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    services: "",
    phone: "",
    email: ""
  });
  const [errors, setErrors] = useState({});
  const [cleaners, setCleaners] = useState([
    // Initial data for demonstration
    { id: 1, name: 'John Doe', services: 'Cleaning', phone: '123456789', email: 'john@example.com' }
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setFormData({
        name: "",
        services: "",
        phone: "",
        email: ""
      });
      setErrors({});
    } else {
      setSuccessMessage(""); // Clear success message when opening modal
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
      // Assuming the ID is generated on the client side for demonstration
      const newCleaner = { ...formData, id: cleaners.length + 1 };
      setCleaners([...cleaners, newCleaner]);
      toggleModal();
      setSuccessMessage("Cleaner added successfully");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this cleaner?')) {
      setCleaners(cleaners.filter(cleaner => cleaner.id !== id));
    }
  };

  return (
    <div className='p-8'>
      {successMessage && <div className='bg-green-500 text-white my-2 rounded py-2 px-4 text-center'>{successMessage}</div>}
      <div className='flex justify-between'>
        <div>Manage Cleaners</div>
        <div>
          <button onClick={toggleModal} className='bg-teal-500 text-white py-2 px-6 rounded'>New Cleaner</button>
        </div>
      </div>
      <div className="overflow-x-auto" id="reportTable">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-1 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Services</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cleaners.map(cleaner => (
              <tr key={cleaner.id}>
                <td className="border px-1 text-center py-2">{cleaner.id}</td>
                <td className="border px-4 py-2">{cleaner.name}</td>
                <td className="border px-4 py-2">{cleaner.services}</td>
                <td className="border px-4 py-2">{cleaner.phone}</td>
                <td className="border px-4 py-2">{cleaner.email}</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <Link to={`/editcleaner/${cleaner.id}`}>
                      <div><FaRegEdit className='text-green-500' /></div>
                    </Link>
                    <div><MdDelete className='text-red-500' onClick={() => handleDelete(cleaner.id)} /></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white w-full mx-2 xl:w-1/2 lg:w-1/2 p-8 rounded-lg" ref={modalRef}>
          <h2 className="text-lg font-semibold mb-4">New Cleaner</h2>
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
  );
}
