import React, { useState, useEffect } from 'react';
import { BsPaypal } from "react-icons/bs";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51IUducIkJgtWO1bcufsdIwSdHuMxQKNbMDSQP1DBjBrZ0xSYwx6QkM6chvbtBwXT6NjjUOLGqd8y07DoHRAMDrxD00EYEpK3j9');

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const [error, setError] = useState(null);
  const [ setPaymentMethod] = useState(null);
  const [time, setTime] = useState(new Date());

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setPaymentMethod(paymentMethod);
      alert('Payment Successful!');
    }
  };

  const hours = ('0' + time.getHours()).slice(-2);
  const minutes = ('0' + time.getMinutes()).slice(-2);
  const seconds = ('0' + time.getSeconds()).slice(-2);

  return (
    <div className='p-4 '>
      <div className=''>
        <div className='w-full p-3'>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <div className='bg-blue-500 w-[40px] p-2 rounded-full h-[40px] text-white pt-3 pl-3'><BsPaypal /></div>
              <div className='pt-2'>The Community</div>
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
        <div className='bg-gray-300 rounded-xl p-5 mt-3 mb-6'>
          <div className='text-gray-600'>You have to pay</div>
          <div className='flex gap-2'>
            <div className='text-[25px] font-bold'>549.99</div>
            <div className='text-gray-600 pt-3'>USD</div>
          </div>
        </div>
          <div className='my-5'>
            <form onSubmit={handleSubmit}>
              <div className='font-bold text-[20px]'>Card Information</div>
              <div className='text-[13px] text-gray-500'>Enter your card details</div>
              <div>
                <CardElement className='my-3 border rounded py-2 w-full px-2' />
                {error && <div className="text-red-500">{error}</div>}
              </div>
              <div className='my-5'>
                <button type="submit" className='text-white bg-[#025eff] rounded font-bold py-3 px-3 w-full' disabled={!stripe}>Pay Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
