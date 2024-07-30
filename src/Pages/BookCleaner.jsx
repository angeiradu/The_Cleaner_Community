import React, { useState, useEffect } from 'react';
import ange from '../Assets/images/ange.jpg';
import { RxHamburgerMenu } from "react-icons/rx";
import emailjs from 'emailjs-com';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function BookCleaner() {
  const [cleaners, setCleaners] = useState([]);
  const [selectedCleaner, setSelectedCleaner] = useState('');
  const [selectedCleanerServices, setSelectedCleanerServices] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [amount, setAmount] = useState(1000);
  const [formData, setFormData] = useState({
    name: '',
    services: '',
    amount: 1000,
    day: ''
  });

  useEffect(() => {
    const fetchCleaners = async () => {
      const cleanersCollection = await getDocs(collection(db, 'schedules'));
      setCleaners(cleanersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCleaners();
  }, []);

  const handleCleanerClick = (cleaner) => {
    setSelectedCleaner(cleaner.cleaner);
    setSelectedCleanerServices(cleaner.services);
    setAmount(1000);
  };

  const handleServiceChange = (event) => {
    const service = event.target.value;
    setSelectedCleanerServices(service);
    setAmount(calculateAmount(service));
    setFormData({ ...formData, services: service });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("Booking created successfully");

    const currentDate = new Date();

    try {
      await addDoc(collection(db, 'bookings'), {
        name: selectedCleaner,
        services: selectedCleanerServices,
        amount: amount,
        day: formData.day,
        date: currentDate
      });
      setSuccessMessage("Booking created successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    sendEmail();
  };

  const sendEmail = () => {
    const emailParams = {
      name: selectedCleaner,
      services: selectedCleanerServices,
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

  return (
    <div className="p-4">
      <div className='mb-4'>Cleaners Available</div>
      {successMessage && <div className='bg-green-500 text-white my-2 rounded py-2 px-4 text-center'>{successMessage}</div>}
      <div className='xl:flex lg:flex gap-4'>
        <div className='xl:w-[380px] lg:w-[380px] w-full'>
          {cleaners.length === 0 ? (
            <div className='text-center text-gray-500'>No cleaners available</div>
          ) : (
            cleaners.map((cleaner, index) => (
              <div key={index} className={`bg-white flex gap-4 mb-2 p-2 rounded hover:border `} onClick={() => handleCleanerClick(cleaner)}>
                <div className='pt-4'><RxHamburgerMenu /></div>
                <div><img src={ange} className='w-[50px] rounded' alt="Profile" /></div>
                <div className='pt-3'>{cleaner.cleaner}</div>
              </div>
            ))
          )}
        </div>
        <div className='bg-white p-5 w-full'>
          <div className='flex gap-4'>
            <div>
              <img src={ange} className='w-[100px] rounded' alt='Profile' />
            </div>
            <div className='pt-3 w-full'>
              <div className='font-bold'>Full name <span className='text-red-500'>*</span></div>
              <input type="text" name="name" placeholder='Eg: Iradukunda Ange' className="border px-4 py-1 w-full rounded" value={selectedCleaner} readOnly />
            </div>
          </div>
          <div className='pt-3 w-full'>
            <div className='font-bold'>Services <span className='text-red-500'>*</span></div>
            <input type="text" name="services" className="border px-4 py-1 w-full rounded" value={selectedCleanerServices} readOnly />
          </div>
          <div className='pt-3 w-full'>
            <div className='font-bold'>Add Services <span className='text-red-500'>*</span></div>
            <select name="addservices" className="border px-4 py-1 w-full rounded" onChange={handleServiceChange}>
              <option value="">Choose Services</option>
              {['Cleaning', 'Window Cleaning', 'Floor Cleaning', 'Carpet Cleaning', 'Deep Cleaning'].map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div className='pt-3 w-full'>
            <div className='font-bold'>Amount <span className='text-red-500'>*</span></div>
            <input type="text" name="amount" className="border px-4 py-1 w-full rounded" value={amount} readOnly />
          </div>
          <div className='pt-3 w-full'>
            <div className='font-bold'>Days <span className='text-red-500'>*</span></div>
            <select name="day" className="border px-4 py-1 w-full rounded" onChange={(e) => setFormData({ ...formData, day: e.target.value })}>
              <option value="">Select Day</option>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                <option key={index} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <hr className='my-4' />
          <div className='xl:flex lg:flex justify-between p-3 m-4'>
            <div className='text-white flex gap-2'>
              <div>
                <button className='bg-[#64c700] border border-[#64c700] px-4 py-1 rounded' onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
