import React from 'react';
import Ange from '../Assets/images/ange.jpg';
import { CiLight } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdContacts } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { AiOutlineTransaction } from "react-icons/ai";
import { SiGnuprivacyguard } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

export default function Profile() {
  return (
    <div className='p-5 mb-6'>
      <div className='flex justify-between'>
        <div className='text-blue-500'>Edit</div>
        <div className='text-center'>
          <div className='border-blue-500 border rounded-full p-1'>
            <img src={Ange} className='rounded-full w-[130px]' alt="ange profile" srcset="" />
          </div>
          <div className="font-bold text-[18px]">Ange IRAD</div>
          <div className='text-gray-500 text-[13px]'>Last Activity 10:35</div>
        </div>
        <div className="flex gap-3">
          <div className='text-blue-500'><CiLight /></div>
          <div className='text-blue-500'><IoIosNotifications /></div>
        </div>
      </div>
      <div className='grid grid-cols-3 border border-gray-300 rounded-2xl py-4 mt-6'>
        <div className='text-center'>
          <div className='font-bold text-[20px]'></div>
          <div className='text-gray-500'></div>
        </div>
        <div className='text-center'>
          <div className='font-bold text-[20px]'></div>
          <div className='text-gray-500'></div>
        </div>
        <div className='text-center'>
          <div className='font-bold text-[20px]'></div>
          <div className='text-gray-500'></div>
        </div>
      </div>
      <div className='mt-6 font-bold text-[20px] mb-2'>Quick Actions</div>
      <div className='border border-gray-300 rounded-2xl p-8'>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <div className='pt-1'><MdContacts className='text-blue-500' /></div>
              <div>Personal info</div>
            </div>
            <div><IoIosArrowForward className='text-[25px]' /></div>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <div className='pt-1'><FaRegCreditCard className='text-blue-500' /></div>
              <div>Credit Cards</div>
            </div>
            <div><IoIosArrowForward className='text-[25px]' /></div>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <div className='pt-1'><AiOutlineTransaction className='text-blue-500' /></div>
              <div>Transactions summary</div>
            </div>
            <div><IoIosArrowForward className='text-[25px]' /></div>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <div className='pt-1'><MdContacts className='text-blue-500' /></div>
              <div>Security & Privacy</div>
            </div>
            <div><SiGnuprivacyguard className='text-[25px]' /></div>
          </div>
      </div>
      <div className='flex gap-3 text-red-500 font-bold py-5 justify-center'>
        <div className='pt-[5px]'><AiOutlineLogout /></div>
        <div>Logout</div>
      </div>
    </div>
  )
}
