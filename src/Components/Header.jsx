import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth';
import ange from '../Assets/images/ange.jpg';
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";

export default function Header() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUsername(user.displayName || 'User'); 
      } else {
        setUsername('Guest'); 
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className='bg-[#e7f7fe] px-6 py-1 flex justify-between font-quicksand'>
      <div className='flex gap-2'>
        <div>
          <img className='h-[40px] rounded-full' src={ange} alt="User Avatar" />
        </div>
        <div className="pt-2">
          {username}
        </div>
        <div onClick={handleLogout}
        className="pt-3">
          <IoMdLogOut />
        </div>
      </div>
    </div>
  );
}
