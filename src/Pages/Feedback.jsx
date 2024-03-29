import React, { useState } from 'react';
import { VscFeedback } from "react-icons/vsc";

export default function Feedback() {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError('');
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setError('Please select a feedback option.');
      return;
    }
    console.log('Form submitted successfully!');
  };

  return (
    <div className='xl:m-10 lg:m-10 m-2 bg-white xl:p-8 lg:p-8 p-4 rounded-2xl'>
      <div className='flex gap-3'>
        <div className='bg-[#2b2a35] text-white rounded-full px-2 py-2'><VscFeedback /></div>
        <div>Feedback</div>
      </div>
      <hr className='my-7' />
      <div className='font-bold text-[30px] text-center'>
          How are you feeling?
      </div>
      <div className='text-[12px] text-center'>
          Your input is valuable in helping us better understand your
      </div>
      <div className='text-[12px] text-center'>
          needs and tailor our service accordingly.
      </div>
      <div className='xl:flex lg:flex md:flex gap-5 justify-center my-8'>
        <div className='text-center'>
          <div>
          <input type="radio" name="feedback" id="very-satisfied" value="Very Satisfied" onChange={handleOptionChange} />
          </div>
          <div>
            <label htmlFor="very-satisfied">Very Satisfied</label>
          </div>
        </div>
        <div className='text-center'>
          <div>
            <input type="radio" name="feedback" id="satisfied" value="Satisfied" onChange={handleOptionChange} />
          </div>
          <div>
            <label htmlFor="satisfied">Satisfied</label>
          </div>
        </div>
        <div className='text-center'>
          <div>
            <input type="radio" name="feedback" id="neutral" value="Neutral" onChange={handleOptionChange} />
          </div>
          <div>
            <label htmlFor="neutral">Neutral</label>
          </div>
        </div>
        <div className='text-center'>
          <div>
            <input type="radio" name="feedback" id="unsatisfied" value="Unsatisfied" onChange={handleOptionChange} />
          </div>
          <div>
            <label htmlFor="unsatisfied">Unsatisfied</label>
          </div>
        </div>
        <div className='text-center'>
          <div>
          <input type="radio" name="feedback" id="very-unsatisfied" value="Very Unsatisfied" onChange={handleOptionChange} />
          </div>
          <div>
            <label htmlFor="very-unsatisfied">Very Unsatisfied</label>
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm text-center pb-3">{error}</div>}
      <div>
        <textarea name="" id="" cols="30" placeholder='Add Comment...' className='border p-3 rounded-2xl w-full' rows="10"></textarea>
      </div>
      <div >
        <button className='bg-[#3faa72] text-white py-2 px-3 rounded-xl w-full my-4' onClick={handleSubmit}>Submit Now</button>
      </div>
    </div>
  );
}
