import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
import Payment from "./Payment"; // Import the Payment component

export default function BookList() {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [formData, setFormData] = useState({
    day: '',
    additionalService: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showPayment, setShowPayment] = useState(false); // State to control Payment component display
  const modalRef = useRef(null); // Ref for the modal content

  useEffect(() => {
    const fetchSchedules = async () => {
      const db = getFirestore();
      const schedulesCollection = collection(db, "schedules");
      const scheduleSnapshot = await getDocs(schedulesCollection);
      const schedulesList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(schedulesList);
    };

    fetchSchedules();
  }, []);

  const handleMoreClick = (schedule) => {
    setSelectedSchedule(schedule);
    setAmount(calculateAmount(formData.additionalService));
    setShowModal(true);
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedSchedule(null);
    setFormData({ day: '', additionalService: '' });
    setAmount(0);
    setShowPayment(false); // Reset Payment display when closing modal
  }, []);

  const handleServiceChange = (event) => {
    const service = event.target.value;
    setFormData({ ...formData, additionalService: service });
    setAmount(calculateAmount(service));
  };

  const calculateAmount = (service) => {
    let additionalAmount = 0;
    switch (service) {
      case 'Cleaning':
        additionalAmount = 2000;
        break;
      case 'Window Cleaning':
        additionalAmount = 3000;
        break;
      case 'Floor Cleaning':
        additionalAmount = 4000;
        break;
      case 'Carpet Cleaning':
        additionalAmount = 5000;
        break;
      case 'Deep Cleaning':
        additionalAmount = 3000;
        break;
      default:
        additionalAmount = 0;
        break;
    }
    return 1000 + additionalAmount;
  };

  const handleBooking = async () => {
    if (!selectedSchedule || !formData.day) return;

    const currentDate = new Date();
    try {
      await addDoc(collection(getFirestore(), 'bookings'), {
        cleaner: selectedSchedule.cleaner,
        services: formData.additionalService,
        amount: amount,
        day: formData.day,
        date: currentDate
      });
      setSuccessMessage("Booking created successfully");
      sendEmail();
      // Show Payment component after successful booking without closing the modal
      setShowPayment(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const sendEmail = () => {
    const emailParams = {
      cleaner: selectedSchedule.cleaner,
      services: formData.additionalService,
      amount: amount,
      day: formData.day
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams, 'YOUR_USER_ID')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
      })
      .catch((error) => {
        console.error('Error sending email:', error.text);
      });
  };

  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, handleClickOutside]);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            {showPayment ? (
              <Payment /> // Render Payment component
            ) : (
              <>
                <div className="text-xl font-bold text-center mb-4">Booking Details</div>
                <div className="text-center mb-2">
                  <div><span className="font-bold">Cleaner Name:</span> {selectedSchedule.cleaner}</div>
                  <div><span className="font-bold">Services:</span> {Array.isArray(selectedSchedule.services) ? selectedSchedule.services.join(', ') : selectedSchedule.services}</div>
                  <div className="font-bold mt-4 text-left">Add Services</div>
                  <select name="additionalService" className="border px-4 py-1 w-full rounded" onChange={handleServiceChange}>
                    <option value="">Choose Additional Service</option>
                    {['Cleaning', 'Window Cleaning', 'Floor Cleaning', 'Carpet Cleaning', 'Deep Cleaning'].map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                  <div className="mt-4 text-left font-bold">Amount:</div>
                  <input type="text" name="amount" className="border px-4 py-1 w-full rounded" value={amount} readOnly />
                  <div className="mt-4 font-bold text-left">Select Day:</div>
                  <select name="day" className="border px-4 py-1 w-full rounded" onChange={(e) => setFormData({ ...formData, day: e.target.value })}>
                    <option value="">Select Day</option>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                      <option key={index} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <hr className='my-4' />
                <div className="flex justify-between p-3 m-4">
                  <button 
                    onClick={handleBooking}
                    className="bg-green-500 text-white px-4 py-2 rounded-full"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-teal-500 text-white px-4 py-2 rounded-full"
                  >
                    Close
                  </button>
                </div>
                {successMessage && <div className='bg-green-500 text-white my-2 rounded py-2 px-4 text-center'>{successMessage}</div>}
              </>
            )}
          </div>
        </div>
      )}
      <div>
        <Link to="/login">
          <div className="text-right px-4 py-1 bg-black text-white">Login</div>
        </Link>
      </div>
      <div className="py-2 flex justify-end gap-5 px-4 bg-gray-300">
        <Link to="/help">
          <div className="hover:text-blue-500">Contact Us</div>
        </Link>
        <Link to="/feedback">
          <div className="hover:text-blue-500">Feedback</div>
        </Link>
      </div>
      <div className="p-4">
        <div className="mb-4 text-2xl text-center font-bold">Available Cleaners</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {schedules.map((schedule, index) => (
            <div key={index} className="bg-blue-100 p-10 rounded-md shadow">
              <div className="mb-2"><span className="font-bold">Cleaner:</span> {schedule.cleaner}</div>
              <div className="mb-2"><span className="font-bold">Services:</span> {Array.isArray(schedule.services) ? schedule.services.join(', ') : schedule.services}</div>
              <button 
                onClick={() => handleMoreClick(schedule)}
                className="mt-2 bg-teal-500 text-white px-8 py-1 rounded-full"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
