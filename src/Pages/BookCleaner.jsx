import React, { useState } from 'react';
import ange from '../Assets/images/ange.jpg';
import { RxHamburgerMenu } from "react-icons/rx";
import emailjs from 'emailjs-com';

export default function BookCleaner() {
  const [noDataMessage] = useState("");
  const [schedules] = useState({
    schedules: [
      { id: 1, name: "John Doe", services: "Cleaning" },
      { id: 2, name: "Jane Smith", services: "Window Cleaning" }
    ]
  });
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

  const handleCleanerClick = (cleaner) => {
    setSelectedCleaner(cleaner.name);
    setSelectedCleanerServices(cleaner.services);
    setAmount(1000); // Reset amount
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("Booking created successfully");
    sendEmail();
  };
  
  const sendEmail = () => {
    // Set up your email service details here
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
          {noDataMessage && <div className='bg-teal-500 text-white my-2 rounded py-2 px-4 text-center'>{noDataMessage}</div>}
          {schedules.schedules.map((schedule, index) => (
            <div key={index} className={`bg-white flex gap-4 mb-2 p-2 rounded hover:border `} onClick={() => handleCleanerClick(schedule)}>
              <div className='pt-4'><RxHamburgerMenu /></div>
              <div><img src={ange} className='w-[50px] rounded' alt="Profile" /></div>
              <div className='pt-3'>{schedule.name}</div>
            </div>
          ))}
        </div>
        <div className='bg-white p-5 w-full'>
          <div className='flex gap-4'>
            <div>
              <img src={ange} className='w-[100px] rounded' alt='Profile' />
            </div>
            <div className='pt-3 w-full'>
              <div className='font-bold'>Full name <span className='text-red-500'>*</span></div>
              <input type="text" name="name" id="" placeholder='Eg: Iradukunda Ange' className="border px-4 py-1 w-full rounded" value={selectedCleaner} readOnly />
            </div>
          </div>
          <div className='pt-3 w-full'>
            <div className='font-bold'>Services <span className='text-red-500'>*</span></div>
            <input type="text" name="services" id="" className="border px-4 py-1 w-full rounded" value={selectedCleanerServices} readOnly />
          </div>
          <div className='pt-3 w-full'>
            <div className='font-bold'>Add Services <span className='text-red-500'>*</span></div>
            <select name="addservices" className="border px-4 py-1 w-full rounded" id="" onChange={handleServiceChange}>
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
            <select name="day" className="border px-4 py-1 w-full rounded" id="">
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
