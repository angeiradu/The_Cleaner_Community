import React from 'react';
import { GiVacuumCleaner } from 'react-icons/gi';
import { SidebarData } from '../Data/SidebarData';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const active = location.pathname;

  return (
    <div className='bg-[#000000] top-0 z-10 left-0 text-white h-screen w-[250px] px-3 pt-10 font-quicksand relative'>
        <div className='fixed top-0 left-0 bg-[#000000] text-white h-screen w-[250px] px-3 pt-4 font-quicksand '>
            <Link to='/dashboard'>
            <div className='flex gap-3'>
                <div>
                <GiVacuumCleaner className='text-[30px]' />
                </div>
                <div className='mt-3'>TCC</div>
            </div>
            </Link>
            <div className='py-6 text-[#9ea1a7]'>Menu</div>
            <div className='overflow-y-auto max-h-[calc(100vh-200px)]'>
            {SidebarData.map((item) => (
                <Link to={item.path} key={item.name}>
                <div className={`${active === item.path ? 'bg-[#293751]' : null} flex gap-2 hover:bg-[#293751] p-4 rounded-xl`}>
                    <div className='text-[22px]'>{item.icons}</div>
                    <div>{item.name}</div>
                </div>
                </Link>
            ))}
            </div>
        </div>
    </div>

  );
}
