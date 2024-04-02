import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function Help() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z\s]+$/;
if (!name.trim()) {
  setNameError('Please enter your name');
  return;
} else if (!nameRegex.test(name)) {
  setNameError('Name must contain only letters and spaces');
  return;
} else {
  setNameError('');
}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }
    if (!subject.trim()) {
      setSubjectError('Please enter a subject');
      return;
    } else {
      setSubjectError('');
    }
    if (!message.trim()) {
      setMessageError('Please enter your message');
      return;
    } else {
      setMessageError('');
    }

    try {
      await emailjs.send(
        'service_7tb8xj9',
        'template_tqu9xgc',
        { from_name: name, reply_to: email, subject: subject, message: message },
        'r5TaQoF09s9oDGmz_'
      );
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }


    // Reset form fields after submission
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 placeholder-gray-300 border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:${nameError ? 'border-red-500' : 'border-indigo-500'}`}
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 placeholder-gray-300 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:${emailError ? 'border-red-500' : 'border-indigo-500'}`}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full px-3 py-2 placeholder-gray-300 border ${subjectError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:${subjectError ? 'border-red-500' : 'border-indigo-500'}`}
          />
          {subjectError && <p className="text-red-500 text-sm mt-1">{subjectError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full px-3 py-2 placeholder-gray-300 border ${messageError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:${messageError ? 'border-red-500' : 'border-indigo-500'}`}
            rows="4"
          ></textarea>
          {messageError && <p className="text-red-500 text-sm mt-1">{messageError}</p>}
        </div>
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Submit</button>
      </form>
    </div>
  )
}
