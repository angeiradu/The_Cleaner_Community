import React, { useState } from 'react';
import { VscFeedback } from "react-icons/vsc";
import { db, auth } from '../firebase'; // Import Firestore and Auth
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Feedback() {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError(''); // Clear error when an option is selected
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      setError('Please select a feedback option.');
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        setError('User not authenticated.');
        return;
      }

      // Get logged-in user's name
      const userName = user.displayName || 'Anonymous';

      // Prepare feedback data
      const feedbackData = {
        option: selectedOption,
        comment: comment,
        userName: userName,
        timestamp: serverTimestamp() // Use serverTimestamp for accurate time
      };

      // Save feedback to Firestore
      await addDoc(collection(db, 'feedback'), feedbackData);

      // Show success modal
      setShowSuccessModal(true);
      
      // Clear form fields
      setSelectedOption('');
      setComment('');
      setError('');
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      setError('Failed to submit feedback. Please try again later.');
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
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
          <input 
            type="radio" 
            name="feedback" 
            id="very-satisfied" 
            value="Very Satisfied" 
            onChange={handleOptionChange} 
            checked={selectedOption === 'Very Satisfied'}
          />
          </div>
          <div>
            <label htmlFor="very-satisfied">Very Satisfied</label>
          </div>
        </div>
        <div className='text-center'>
          <div>
            <input 
              type="radio" 
              name="feedback" 
              id="satisfied" 
              value="Satisfied" 
              onChange={handleOptionChange} 
              checked={selectedOption === 'Satisfied'}
            />
          </div>
          <div>
            <label htmlFor="satisfied">Satisfied</label>
          </div>
        </div>
        <div className='text-center'>
          <div>
            <input 
              type="radio" 
              name="feedback" 
              id="neutral" 
              value="Neutral" 
              onChange={handleOptionChange} 
              checked={selectedOption === 'Neutral'}
            />
          </div>
          <div>
            <label htmlFor="neutral">Neutral</label>
          </div>
        </div>
        <div className='text-center'>
          <div>
            <input 
              type="radio" 
              name="feedback" 
              id="unsatisfied" 
              value="Unsatisfied" 
              onChange={handleOptionChange} 
              checked={selectedOption === 'Unsatisfied'}
            />
          </div>
          <div>
            <label htmlFor="unsatisfied">Unsatisfied</label>
          </div>
        </div>
        <div className='text-center'>
          <div>
          <input 
            type="radio" 
            name="feedback" 
            id="very-unsatisfied" 
            value="Very Unsatisfied" 
            onChange={handleOptionChange} 
            checked={selectedOption === 'Very Unsatisfied'}
          />
          </div>
          <div>
            <label htmlFor="very-unsatisfied">Very Unsatisfied</label>
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm text-center pb-3">{error}</div>}
      <div>
        <textarea 
          value={comment}
          onChange={handleCommentChange}
          cols="30" 
          placeholder='Add Comment...' 
          className='border p-3 rounded-2xl w-full' 
          rows="10"
        ></textarea>
      </div>
      <div>
        <button className='bg-[#3faa72] text-white py-2 px-3 rounded-xl w-full my-4' onClick={handleSubmit}>Submit Now</button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-md">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Success</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Your feedback has been submitted successfully!
                </p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
