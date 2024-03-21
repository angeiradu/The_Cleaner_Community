import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function PageLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1200);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className='flex font-quicksand'>
        <div>{showSidebar && <Sidebar />}</div>
        <div className='relative w-full bg-[#f6f6f6]'>
          <div className='flex justify-between bg-[#e7f7fe]'>
                <div onClick={toggleSidebar}>
                <GiHamburgerMenu className='mt-4 mx-4' />
                </div>
                <div>
                <Header />
                </div>
          </div>
          
          <div>
            <Outlet />
          </div>
          <div className='absolute bottom-0 w-full'>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}