import React from 'react'
import { DashboardData } from '../Data/DashboardData'

export default function Dashboard() {
  return (
    <div className='bg-[#252a48] h-screen'>
        <div className='p-[20px]'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4'>
                {
                    DashboardData.map((item) => {
                        return (
                            <div className='bg-[#2c3157] rounded-2xl px-3 py-5 w-full'>
                                <div className='flex justify-between'>
                                    <div className='bg-[#9d3efa] text-white p-3 rounded'>{item.icons}</div>
                                    <div>
                                        <div className='text-gray-500 text-[13px]'>{item.name}</div>
                                        <div className='text-white font-bold'>{item.number}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
