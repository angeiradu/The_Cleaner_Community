import React from 'react';
import ange from '../Assets/ange.jpg';

export default function Header() {

  return (
    <div className='bg-[#e7f7fe] px-6 py-1 flex justify-between font-quicksand '>
      <div className='flex gap-1'>
        <div>
          <img className='h-[40px] rounded-full' src={ange} alt="User Avatar" />
        </div>
    
      </div>
    </div>
  );
}