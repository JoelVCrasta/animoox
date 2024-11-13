'use client';
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import TableComponent from '@/components/purchased/table';
import { PurchasedPRofileIcon } from '@/assets/icons/purchased-profile-icon';
import { ListViewIcon } from '@/assets/icons';
import { GridViewIcon } from '@/assets/icons';
import ProductComponent from '@/components/products/productComponent';
import { dummyCardData } from '@/data/data';

const Page = () => {
  const {data:session}=useSession()
  const [activeView, setActiveView] = useState('list')

  const data = new Array(12).fill({
    name: "Traveling & Holiday Lottie Pack",
    image: "",
    fileSize: "87.06 MB",
    downloadLink: "#",
  });

  return (
    <main className="w-full flex flex-col justify-center items-center">
        <div className="flex items-center">
            <PurchasedPRofileIcon />
            <p className='text-5xl'>{session?.user.name}</p>
        </div>
        <div className="flex gap-9 items-center my-14">
          <div className="rounded-full p-2 border border-brand bg-brand text-sm text-white px-6 cursor-pointer">Lottie</div>
          <div className="rounded-full p-2 border border-brand bg-white text-sm px-6 cursor-pointer">Animation</div>
          <div className="rounded-full p-2 border border-brand bg-white text-sm px-6 cursor-pointer">Illustration</div>
        </div>

        <div className="px-28 w-full flex justify-end items-center cursor-pointer" onClick={()=>setActiveView((p)=>p==="list"?"grid":"list")}> 
          {activeView==='list'?<ListViewIcon />:<GridViewIcon />}
        </div>

        <div className="w-full mt-10">
          {
            activeView==='list'?(
              <div className="px-28">
                <TableComponent data={data}/> 
              </div>
            ):(
              <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 px-20'>
                {dummyCardData.map((data, index)=>(
                  <ProductComponent {...data} key={index}/>
                ))}
              </div>
            )
          }
        </div>

    </main>
  )
}

export default Page