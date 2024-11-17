"use client"
import React, { useState } from 'react'
import { Logo } from "@/assets/images";
import { UploadCloud } from "@/assets/images";
import Image from 'next/image';
import { ProfileIcon } from '@/assets/icons/profile-icon';
import { HomeIcon } from '@/assets/icons/home-icon';
import { LetterIcon } from '@/assets/icons/letter-icon';
import { ManagementBoxIcon } from '@/assets/icons/managementBox-icon';
import { AnalyticsBarIcon } from '@/assets/icons/analyticsBar-icon';
import { SalesBagIcon } from '@/assets/icons/salesBag-icon';
import { CursorIcon } from '@/assets/icons/cursor-icon';
import { NewsletterIcon } from '@/assets/icons/newsletter-icon';
import { SettingsIcon } from '@/assets/icons/settings-icon';
import { TrafficInsightsIcon } from '@/assets/icons/trafficInsights-icon';
import { OrderManagementIcon } from '@/assets/icons/orderManagement-icon';
import { DollarIcon } from '@/assets/icons/dollar-icon';
import { UploadCloudIcon } from '@/assets/icons/uploadCloud-icon';
import { IoLogOutOutline } from "react-icons/io5";
import { LogoutButton } from './auth/logout-button';
import Link from 'next/link';

function Sidebar() {

  return (
    <div className='flex flex-col items-center'>
        <div className='w-full pl-6'>
        <Image alt="Logo" src={Logo} width={200} />
        </div>
        <hr className='bg-neutral-400 w-full my-4'></hr>

        <div className='flex flex-col gap-3 w-full mt-5 px-5'>
        {NavItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
        </div>

        <div className='mt-16 flex flex-col items-center justify-center w-full px-7 relative'>
          <div className='h-20 aspect-square bg-white rounded-full p-1 absolute -top-9'>
            <div className='h-fit aspect-square upload-cloud-circle rounded-full flex items-center justify-center'>
              <Image alt="Upload" src={UploadCloud} width={45} height={45} />
            </div>
          </div>
          <div className='h-66 w-full rounded-xl border-t border-x border-indigo-100 bg-gradient-to-b from-indigo-100 to indigo-50 flex flex-col items-center justify-start px-3 pt-16 pb-4 space-y-4 '>
            <div className='w-full px-4 space-y-2'>
            <p className='text-xl font-bold text-center w-full text-indigo-950'>Up Your Product Now</p>
            <p className='text-sm text-neutral-500 text-center w-full'>Get 1 month free and unlock</p>
            </div>
            <button className='flex justify-between items-center w-full bg-blue-500 rounded-full px-8 py-4 text-white'>
              <UploadCloudIcon />
              <p className='font-medium text-base'>Upload Now</p>
            </button>
          </div>

          <LogoutButton >
          <button className='w-full flex items-center justify-between bg-indigo-100 px-6 py-3 rounded-xl mt-10'>
            <p className='text-lg font-medium text-neutral-600'>Logout</p>
            <IoLogOutOutline className='w-6 h-6' strokeWidth={1.5} />
          </button>
          </LogoutButton>
        </div>
    </div>
  )
}

function SidebarItem({ item }: any) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
  
    return (
      <Link href={item.href}>
      <div
        className="flex gap-2 items-center cursor-pointer "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsActive(!isActive)}
      >
            <div className="">
          {React.cloneElement(item.icon, {
            fill: isHovered ? "#000000" : "#73748A",
          })}
        </div>
        <p className={`text-base ${ isHovered ? "text-black" : "text-neutral-500"}`}>{item.title}</p>

      </div>
        </Link>
    );
  }

export default Sidebar


const NavItems = [
    {
        title: "Overview",
        href: "#",
        icon: <HomeIcon />,
    },
    {
        title: "Inbox",
        href: "/inbox",
        icon: <LetterIcon />,
    },
    {
        title: "Product Management",
        href: "/product-management",
        icon: <ManagementBoxIcon />,
    },
    {
        title: "Icon Management",
        href: "#",
        icon: <ManagementBoxIcon />,
    },
    {
        title: "Analytics",
        href: "#",
        icon: <AnalyticsBarIcon />,
    },
    {
        title: "Sales & Pricing",
        href: "#",
        icon: <SalesBagIcon />,
    },
    {
        title: "Subscription",
        href: "#",
        icon: <CursorIcon />,
    },
    {
        title: "Newsletter Management",
        href: "#",
        icon: <NewsletterIcon />,
    },
    {
        title: "Setting",
        href: "#",
        icon: <SettingsIcon/>,
    },
    {
        title: "Email Campaigns",
        href: "#",
        icon: <LetterIcon />,
    },
    {
        title: "Traffic Insights",
        href: "#",
        icon: <TrafficInsightsIcon />,
    },
    {
        title: "Order Management",
        href: "#",
        icon: <OrderManagementIcon />,
    },
    {
        title: "Pricing Management",
        href: "#",
        icon: <DollarIcon />,
    },

]