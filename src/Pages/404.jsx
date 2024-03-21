import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
const NotFound = () => {
  return (
    <div class="flex items-center justify-center h-screen bg-[#0a0a12] font-quicksand">
        <div class="text-center text-white">
            <div class="font-bold lg:text-[230px] xl:text-[230px] md:text-[230px] text-[110px] flex justify-center gap-2">
                <div>4</div>
                <div className='border-[#d8f401] border-[20px] px-2 xl:mt-[90px] lg:mt-[90px] md:mt-[90px] mt-[40px] rounded-t-full rounded-b-full text-[#d8f401] lg:pt-8 xl:pt-8 md:pt-8 pt-4 lg:h-[175px] xl:h-[175px] md:h-[175px] h-[95px]'>
                    <AiFillEye className='lg:text-[68px] xl:text-[68px] md:text-[68px] text-[20px]' />
                </div>
                <div>4!</div>
            </div>
            <h2 class="text-2xl mt-4 lg:text-[80px] xl:text-[80px] md:text-[80px] text-[40px] font-quicksand">Oops, Page <span className='text-[#d8f401]'>not found</span></h2>
            <Link to="/">
                <div class="text-2xl mt-20 inline-block px-6 py-3 rounded bg-[#d8f401] text-black font-quicksand">GO HOME</div>
            </Link>
        </div>
    </div>

  )
}

export default NotFound