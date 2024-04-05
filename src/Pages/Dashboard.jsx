import React from 'react'
import { DashboardData } from '../Data/DashboardData'
import { TransactionsData } from '../Data/TransactionsData'
import PieChart from '../Components/PieChart'
export default function Dashboard() {
    const data = [20, 30, 40, 10];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    const width = 200;
    const height = 200;
  return (
    <div className='grid grid-cols-1  xl:flex lg:flex'>
        <div className='bg-[#252a48] xl:h-screen lg:h-screen w-full'>
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
                                            <div className='text-white font-bold text-[22px]'>{item.number}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="mt-3">
                    <div className="bg-[#2c3157] p-8 rounded-3xl">
                        <PieChart data={data} colors={colors} width={width} height={height} />
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-[#202542] xl:h-screen lg:h-screen xl:w-[400px] lg:w-[400px] px-3 py-5'>
            <div className='bg-[#6e55ca] rounded-3xl p-6'>
                <div className='flex justify-between'>
                    <div className='text-[#c8bdeb]'>ID 122 887 552</div>
                    <div className='flex'>
                        <div className='bg-[#e9b4d6] h-6 w-6 rounded-full'></div>
                        <div className='bg-[#e9b4d6] h-6 w-6 rounded-full ml-[-6px]'></div>
                    </div>
                </div>
                <div className='text-[#c8bdeb] mt-8'></div>
                <div className='text-white text-[28px]'></div>
            </div>
            <div className='flex justify-between py-6'>
                <div className='text-white font-bold'>Last Transactions</div>
                <div className='text-[#3da2b1] font-bold'>See All</div>
            </div>
            <div>
                {
                    TransactionsData.map((items) => {
                        return (
                            <div className='mb-2 flex gap-3'>
                                <div className='w-[50px]'>
                                    <div className={`${items.transactionType === 'Deposit waste' ? 'bg-[#8bafee] text-white pt-3' : 'bg-[#f979a8] text-white pt-3'} ' h-12 w-12 rounded-full flex justify-center text-[23px]'`}>{items.icons}</div>
                                </div>
                                
                                <div className='w-full'>
                                    <div className='flex justify-between text-white'>
                                        {/* <div>{items.transactionType}</div> */}
                                        <div>{items.name}</div>
                                        <div>{items.amount}</div>
                                    </div>
                                    <div className='flex justify-between text-gray-400'>
                                        
                                        <div>{items.date}</div>
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
