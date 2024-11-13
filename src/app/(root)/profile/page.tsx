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
        <div className="flex gap-9 items-center mt-14 mb-5">
          <p className='text-secondary-text text-lg'>Here are some of our most popular products...</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 px-20'>
            {dummyCardData.map((data, index)=>(
                <ProductComponent {...data} key={index}/>
            ))}
        </div>

    </main>
  )
}

export default Page