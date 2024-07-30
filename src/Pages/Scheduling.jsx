import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import ange from '../Assets/images/ange.jpg';

export default function Scheduling() {
  const [cleaners, setCleaners] = useState([]);
  const [selectedCleaner, setSelectedCleaner] = useState('');
  const [selectedCleanerServices, setSelectedCleanerServices] = useState([]);
  const [scheduleData, setScheduleData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCleaners = async () => {
      const db = getFirestore();
      const cleanersCollection = collection(db, "cleaners");
      const cleanerSnapshot = await getDocs(cleanersCollection);
      const cleanersList = cleanerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCleaners(cleanersList);
    };

    fetchCleaners();
  }, []);

  const handleCleanerClick = (cleaner) => {
    setSelectedCleaner(cleaner.name);
    setSelectedCleanerServices(cleaner.services);
  };

  const handleFromChange = (day, value) => {
    setScheduleData(prevData => ({
      ...prevData,
      [day]: {
        ...(prevData[day] || {}),
        from: value
      }
    }));
  };

  const handleToChange = (day, value) => {
    setScheduleData(prevData => ({
      ...prevData,
      [day]: {
        ...(prevData[day] || {}),
        to: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      const db = getFirestore();
      
      const defaultTimes = {
        from: "8:00 am",
        to: "8:00 pm"
      };

      const scheduleEntry = {
        cleaner: selectedCleaner,
        services: selectedCleanerServices,
        schedule: Object.keys(scheduleData).reduce((acc, day) => {
          acc[day] = {
            from: scheduleData[day]?.from || defaultTimes.from,
            to: scheduleData[day]?.to || defaultTimes.to
          };
          return acc;
        }, {})
      };

      await addDoc(collection(db, "schedules"), scheduleEntry);
      setSuccessMessage("Scheduled successfully!");
      setScheduleData({});
      setSelectedCleaner('');
      setSelectedCleanerServices([]);
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="p-4">
      <div className='mb-4'>Staff Members</div>
      {successMessage && <div className='bg-green-500 text-white my-2 rounded py-2 px-4 text-center'>{successMessage}</div>}
      <div className='xl:flex lg:flex gap-4'>
        <div className='xl:w-[380px] lg:w-[380px] w-full'>
          {cleaners.map((cleaner, index) => (
            <div key={index} className={`bg-white flex gap-4 mb-2 p-2 rounded hover:border ${index === 0 ? 'bg-green-500 text-black-500' : ''}`} onClick={() => handleCleanerClick(cleaner)}>
              <div><img src={ange} className='w-[50px] rounded' alt="Profile" /></div>
              <div className='pt-3'>{cleaner.name}</div>
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
              <input type="text" name="name" placeholder='Eg: Iradukunda Ange' className="border px-4 py-1 w-full rounded" value={selectedCleaner} readOnly /> 
            </div>
          </div>
          <div className='pt-3 w-full'>
            <div className='font-bold'>Services <span className='text-red-500'>*</span></div>
            <input type="text" name="services" className="border px-4 py-1 w-full rounded" value={selectedCleanerServices} readOnly />
          </div>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <div key={index}>
              <div className='bg-gray-200 grid grid-cols-2 rounded p-3 mt-6'>
                <div className='font-bold'>{day}</div>
              </div>
              <div className='grid xl:grid-cols-2 lg:grid-cols-2 rounded p-3 m-4'>
                <div className='flex gap-3'>
                  <div>
                    <select name="from" className='border p-[4px] rounded' onChange={(e) => handleFromChange(day, e.target.value)}>
                      <option value="8:00 am">8:00 am</option>
                      <option value="9:00 am">9:00 am</option>
                      <option value="10:00 am">10:00 am</option>
                      <option value="11:00 am">11:00 am</option>
                    </select>
                  </div>
                  <div className='pt-1'>to</div>
                  <div>
                    <select name="to" className='border p-[4px] rounded' onChange={(e) => handleToChange(day, e.target.value)}>
                      <option value="8:00 pm">8:00 pm</option>
                      <option value="9:00 pm">9:00 pm</option>
                      <option value="10:00 pm">10:00 pm</option>
                      <option value="11:00 pm">11:00 pm</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <hr className='my-4' />
          <div className='xl:flex lg:flex justify-between p-3 m-4'>
            <div className='text-white flex gap-2'>
              <div>
                <button className='bg-[#64c700] border border-[#64c700] px-4 py-1 rounded' onClick={handleSubmit}>Save</button>
              </div>
              <div>
                <button className='border border-gray-500 text-gray-500 px-4 py-1 rounded'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
