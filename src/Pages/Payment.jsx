import React, { useState, useEffect } from 'react';
import { BsPaypal } from "react-icons/bs";
export default function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [csvNumber, setCsvNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');

  const [cardNumberError, setCardNumberError] = useState('');
  const [csvNumberError, setCsvNumberError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous errors
    setCardNumberError('');
    setCsvNumberError('');
    setMonthError('');
    setYearError('');
    setPasswordError('');

    // Perform validation
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setCardNumberError('Please enter a valid 16-digit card number.');
      return;
    }

    if (csvNumber.length !== 3 && csvNumber.length !== 4 || isNaN(csvNumber)) {
      setCsvNumberError('Please enter a valid 3 or 4-digit CSV number.');
      return;
    }

    if (isNaN(month) || month < 1 || month > 12) {
      setMonthError('Please enter a valid month (1-12).');
      return;
    }

    if (isNaN(year) || year.length !== 2) {
      setYearError('Please enter a valid 2-digit year.');
      return;
    }

    if (isNaN(password) || password.length !== 4) {
      setPasswordError('Please enter a valid 4-digit password.');
      return;
    }

    alert('Payment Successful!');
  };
  const hours = ('0' + time.getHours()).slice(-2);
  const minutes = ('0' + time.getMinutes()).slice(-2);
  const seconds = ('0' + time.getSeconds()).slice(-2);
  return (
    <div className='p-4 '>
      <div className='xl:flex lg:flex md:flex gap-2'>
          <div className='w-full p-3'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                  <div className='bg-blue-500 w-[40px] p-2 rounded-full h-[40px] text-white pt-3 pl-3'><BsPaypal /></div>
                  <div className='pt-2'> The Community</div>
              </div>
              <div className='flex gap-1 text-white'>
                <div className='bg-[#1a2551] py-[2px] rounded px-2 pt-2'>{hours[0]}</div>
                <div className='bg-[#1a2551] py-[2px] rounded px-2 pt-2'>{hours[1]}</div>
                <div className='text-black pt-2'>:</div>
                <div className='bg-[#1a2551] py-[2px] rounded px-2 pt-2'>{minutes[0]}</div>
                <div className='bg-[#1a2551] py-[2px] rounded px-2 pt-2'>{minutes[1]}</div>
                <div className='text-black pt-2'>:</div>
                <div className='bg-[#1a2551] py-[2px] rounded px-2 pt-2'>{seconds[0]}</div>
                <div className='bg-[#1a2551] py-[2px] rounded px-2 pt-2'>{seconds[1]}</div>
              </div>
            </div>
            <div className='my-5'>
              <form onSubmit={handleSubmit}>
                <div className='font-bold text-[20px]'>Card Number</div>
                <div className='text-[13px] text-gray-500'>Enter the 16-digit card number on the card</div>
                <div>
                  <input 
                    type="number" 
                    name="cardnumber" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className='my-3 border rounded py-2 w-full px-2' 
                    id="" 
                  />
                  <div className="text-red-500">{cardNumberError}</div>
                </div>
                <div className='my-5 flex gap-8'>
                  <div className='w-[340px]'>
                    <div className='font-bold text-[20px]'>CSV Number</div>
                    <div className='text-[13px] text-gray-500'>Enter the 3 or 4 digit number on the card</div>
                  </div>
                  <div className='w-full'>
                    <input 
                      type="number" 
                      name="csvnumber" 
                      value={csvNumber}
                      onChange={(e) => setCsvNumber(e.target.value)}
                      className='my-3 border rounded py-2 w-full px-2' 
                      id="" 
                    />
                    <div className="text-red-500">{csvNumberError}</div>
                  </div>
                </div>
                <div className='my-5 flex gap-8'>
                  <div className='w-[340px]'>
                    <div className='font-bold text-[20px]'>Expire Date</div>
                    <div className='text-[13px] text-gray-500'>Enter expiration date of the card</div>
                  </div>
                  <div className='w-full flex gap-4'>
                    <div className='w-full'><input 
                      type="number" 
                      name="month" 
                      value={month}
                      min="1"
                      max="12"
                      onChange={(e) => setMonth(e.target.value)}
                      className='my-3 border rounded py-2 w-full px-2' 
                      id="" 
                    />
                    <div className="text-red-500">{monthError}</div>
                    </div>
                    <div className='pt-5'>/</div>
                    <div className='w-full'><input 
                      type="number" 
                      name="year" 
                      value={year}
                      min="0"
                      max="99"
                      onChange={(e) => setYear(e.target.value)}
                      className='my-3 border rounded py-2 w-full px-2' 
                      id="" 
                    />
                    <div className="text-red-500">{yearError}</div>
                    </div>
                  </div>
                </div>
                <div className='my-5 flex gap-8'>
                  <div className='w-[340px]'>
                    <div className='font-bold text-[20px]'>Password</div>
                    <div className='text-[13px] text-gray-500'>Enter your dynamic password</div>
                  </div>
                  <div className='w-full'>
                    <input 
                      type="number" 
                      name="password" 
                      value={password}
                      min="0"
                      max="9999"
                      onChange={(e) => setPassword(e.target.value)}
                      className='my-3 border rounded py-2 w-full px-2' 
                      id="" 
                    />
                    <div className="text-red-500">{passwordError}</div>
                  </div>
                </div>
                <div className='my-5'>
                 <button type="submit" className='text-white bg-[#025eff] rounded font-bold py-3 px-3 w-full'>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
          <div className='bg-gray-300 rounded-xl p-5 mb-6'>
              <div className='text-gray-600'>You have to pay</div>
              <div className='flex gap-2'>
                <div className='text-[25px] font-bold'>549.99</div>
                <div className='text-gray-600 pt-3'>USD</div>
              </div>
          </div>
      </div>
    </div>
  )
}
