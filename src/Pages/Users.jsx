import React, { useState, useRef, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { db } from '../firebase'; // Adjust the path to your firebase config
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [unSuccessMessage, setUnSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setFormData({
        name: "",
        phone: "",
        email: ""
      });
      setErrors({});
      setUserToEdit(null);
    }
  };

  const fetchUsers = async () => {
    const usersCollection = await getDocs(collection(db, 'users'));
    setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name?.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.phone?.trim()) {
      validationErrors.phone = "Phone is required";
    }
    if (!formData.email?.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (userToEdit) {
          const userDoc = doc(db, 'users', userToEdit);
          await updateDoc(userDoc, formData);
          setSuccessMessage("User updated successfully");
        } else {
          await addDoc(collection(db, 'users'), formData);
          setSuccessMessage("User added successfully");
        }
        setShowModal(false);
        fetchUsers();
        setFormData({
          name: "",
          phone: "",
          email: ""
        });
      } catch (error) {
        console.error("Error adding/updating document: ", error);
        setUnSuccessMessage("Error saving user");
      } finally {
        setTimeout(() => {
          setSuccessMessage("");
          setUnSuccessMessage("");
        }, 2000);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await deleteDoc(doc(db, 'users', userToDelete));
        setSuccessMessage("User deleted successfully");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting document: ", error);
        setUnSuccessMessage("Error deleting user");
      } finally {
        setUserToDelete(null);
        setTimeout(() => {
          setSuccessMessage("");
          setUnSuccessMessage("");
        }, 2000);
      }
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setUserToEdit(user.id);
    setShowModal(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const generatePdf = () => {
    const input = document.getElementById('reportTable');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('users_report.pdf');
      });
  };

  return (
    <div className='p-8'>
      {successMessage && <div className='bg-green-500 text-white my-2 rounded py-2 px-4 text-center'>{successMessage}</div>}
      {unSuccessMessage && <div className='bg-red-500 text-white my-2 rounded py-2 px-4 text-center'>{unSuccessMessage}</div>}
      <div className='flex justify-between'>
        <div>Manage Users</div>
        <div>
          <button onClick={toggleModal} className='bg-teal-500 text-white py-2 px-6 rounded'>New User</button>
          <button onClick={generatePdf} className='bg-blue-500 text-white py-2 px-6 rounded ml-4'>Generate PDF</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full" id="reportTable">
          <thead>
            <tr>
              <th className="px-1 py-2">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border px-1 text-center py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <div onClick={() => handleEdit(user)}>
                      <FaRegEdit className='text-green-500 cursor-pointer' />
                    </div>
                    <div>
                      <MdDelete className='text-red-500 cursor-pointer' onClick={() => confirmDelete(user.id)} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {userToDelete && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Confirmation
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setUserToDelete(null)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Are you sure you want to delete this user?
                </p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-400 text-white active:bg-gray-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setUserToDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white w-full mx-2 xl:w-1/2 lg:w-1/2 p-8 rounded-lg" ref={modalRef}>
            <h2 className="text-lg font-semibold mb-4">{userToEdit ? "Edit User" : "New User"}</h2>
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
  );
}
