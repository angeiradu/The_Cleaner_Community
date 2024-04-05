import React, { useState } from 'react';
import ange from '../Assets/images/ange.jpg';
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Scheduling() {
  const [breakSections, setBreakSections] = useState({});
  const [fromValue, setFromValue] = useState("8:00 am");
  const [toValue, setToValue] = useState("8:00 pm");
  const [noDataMessage] = useState("");
  const [cleaners] = useState([
    {
      id: 1,
      name: "John Doe",
      services: "Cleaning, Dusting"
    },
    {
      id: 2,
      name: "Jane Smith",
      services: "Vacuuming, Mopping"
    },
    {
      id: 3,
      name: "Ange divine",
      services: "Vacuuming, Mopping"
    },
    {
      id: 4,
      name: "Christophe",
      services: "Vacuuming, Mopping"
    }
  ]);
  const [selectedCleaner, setSelectedCleaner] = useState('');
  const [selectedCleanerServices, setSelectedCleanerServices] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const addBreak = (day, fromValue, toValue) => {
    const key = Math.random().toString(36).substring(7);
    const newBreak = (
      <div key={key} className='flex justify-between gap-4 border border-blue-500 text-blue-500 rounded py-2 px-3 mb-2 bg-[#def0fd]'>
        <div>{fromValue} - {toValue}</div>
        <div onClick={() => toggleBreakSection(day, key)}><IoMdClose className='text-[22px]' /></div>
      </div>
    );
    setBreakSections(prevBreakSections => ({
      ...prevBreakSections,
      [day]: [...(prevBreakSections[day] || []), newBreak]
    }));
  };

  const handleCleanerClick = (cleaner) => {
    setSelectedCleaner(cleaner.name);
    setSelectedCleanerServices(cleaner.services);
  };

  const toggleBreakSection = (day, key) => {
    setBreakSections(prevBreakSections => ({
      ...prevBreakSections,
      [day]: prevBreakSections[day].filter(section => section.key !== key)
    }));
  };

  const handleSubmit = () => {
    setSuccessMessage("Scheduled successfully!");
  };

  return (
    <div className="p-4">
      <div className='mb-4'>Staff Members</div>
      {successMessage && <div className='bg-green-500 text-white my-2 rounded py-2 px-4 text-center'>{successMessage}</div>}
      <div className='xl:flex lg:flex gap-4'>
        <div className='xl:w-[380px] lg:w-[380px] w-full'>
          {noDataMessage && <div className='bg-teal-500 text-white my-2 rounded py-2 px-4 text-center'>{noDataMessage}</div>}
          {cleaners.map((cleaner, index) => (
            <div key={index} className={`bg-white flex gap-4 mb-2 p-2 rounded hover:border ${index === 0 ? 'bg-green-500 text-black-500' : ''}`} onClick={() => handleCleanerClick(cleaner)}>
              <div className='pt-4'><RxHamburgerMenu /></div>
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
              <input type="text" name="name" id="" placeholder='Eg: Iradukunda Ange' className="border px-4 py-1 w-full rounded" value={selectedCleaner} readOnly /> 
            </div>
          </div>
          <div className='pt-3 w-full'>
            <div className='font-bold'>Services <span className='text-red-500'>*</span></div>
            <input type="text" name="services" id="" className="border px-4 py-1 w-full rounded" value={selectedCleanerServices} readOnly />
          </div>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <div key={index}>
              <div className='bg-gray-200 grid grid-cols-2 rounded p-3 mt-6'>
                <div className='font-bold'>{day}</div>
                <div className='text-gray-500'>BREAKS</div>
              </div>
              <div className='grid xl:grid-cols-2 lg:grid-cols-2 rounded p-3 m-4'>
                <div className='flex gap-3'>
                  <div>
                    <select name="from" className='border p-[4px] rounded' id="" onChange={(e) => setFromValue(e.target.value)}>
                      <option value="8:00 am">8:00 am</option>
                      <option value="9:00 am">9:00 am</option>
                      <option value="10:00 am">10:00 am</option>
                      <option value="11:00 am">11:00 am</option>
                    </select>
                  </div>
                  <div className='pt-1'>to</div>
                  <div>
                    <select name="to" className='border p-[4px] rounded' id="" onChange={(e) => setToValue(e.target.value)}>
                      <option value="8:00 pm">8:00 pm</option>
                      <option value="9:00 pm">9:00 pm</option>
                      <option value="10:00 pm">10:00 pm</option>
                      <option value="11:00 pm">11:00 pm</option>
                    </select>
                  </div>
                </div>
                <div className='xl:flex lg:flex gap-3'>
                  <div>{breakSections[day]}</div>
                  <div className='text-blue-500 pt-2' onClick={() => addBreak(day, fromValue, toValue)}>Add break</div>
                </div>
              </div>
            </div>
          ))}
          <hr className='my-4' />
          <div className='xl:flex lg:flex  justify-between p-3 m-4'>
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
  )
}
