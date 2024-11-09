"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Profile from "../../../assets/images/profile.jpg";
import { CiSearch } from "react-icons/ci";
import { FiBell } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import Table from "../_components/table";
import Iphone from "../../../assets/images/iphone.png";

const ProductManagement = () => {
  const data = [
    {
      productName: "iPhone 16 Pro",
      category: "Smart Phone",
      src:Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      category: "Laptop, Notebook",
      src:Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1500.5K",
      increment: false,
    },
    {
      productName: "Apple Watch 10",
      category: "Smart Watch",
      src:Iphone,
      status: 0,
      price: "$2099",
      pageViews: "200.47K",
      increment: true,
    },
    {
      productName: "Amd Ryzen 9",
      category: "Processor",
      src:Iphone,
      status: 2,
      price: "$999.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "iPhone 16 Pro",
      category: "Smart Phone",
      src:Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      category: "Laptop, Notebook",
      src:Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1500.5K",
      increment: false,
    },
    {
      productName: "Apple Watch 10",
      category: "Smart Watch",
      src:Iphone,
      status: 0,
      price: "$2099",
      pageViews: "200.47K",
      increment: true,
    },
    {
      productName: "Amd Ryzen 9",
      category: "Processor",
      src:Iphone,
      status: 2,
      price: "$999.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "iPhone 16 Pro",
      category: "Smart Phone",
      src:Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      category: "Laptop, Notebook",
      src:Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1500.5K",
      increment: false,
    },
    {
      productName: "Apple Watch 10",
      category: "Smart Watch",
      src:Iphone,
      status: 0,
      price: "$2099",
      pageViews: "200.47K",
      increment: true,
    },
    {
      productName: "Amd Ryzen 9",
      category: "Processor",
      src:Iphone,
      status: 2,
      price: "$999.99",
      pageViews: "1475.5K",
      increment: true,
    },
  ];
  return (
    <section className="flex">
      <Toaster />
      <div className="w-80 bg-white">sidebar</div>

      <div className="w-full p-4 md:p-10">
        {/* Page Head */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-700/80">Pages / Overview</p>
            <p className="text-3xl font-bold text-gray-700">
              Product Management
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            {/* Search Main */}
            <div className="w-[200px] rounded-full p-1 bg-white flex items-center justify-center">
              <div className="w-full flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-full">
                <CiSearch className="text-gray-500 text-lg" />
                <input
                  className="border-none w-full focus:outline-none bg-transparent"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Notification */}
            <div className="relative flex items-center justify-center rounded-full bg-white h-[50px] w-[50px] cursor-pointer text-xl">
              <div className="absolute top-2.5 right-3 bg-red-500 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-full">
                0
              </div>
              <FiBell />
            </div>

            {/* Settings */}
            <div className="flex items-center justify-center rounded-full bg-white h-[50px] w-[50px] cursor-pointer text-xl">
              <IoSettingsOutline />
            </div>

            {/* Profile */}
            <div className="bg-white px-3 py-1 flex items-center gap-2 rounded-full cursor-pointer">
              <Image
                className="rounded-full h-[40px] w-[40px]"
                src={Profile}
                alt="profile"
              />
              <div>
                <p>Mike Anton</p>
                <p className="text-gray-500">Product Manager</p>
              </div>
              <IoIosArrowDown />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center gap-2 mt-5">
          <div className="px-2.5 py-1.5 bg-gray-800 text-white rounded-full cursor-pointer text-sm">
            All Product
          </div>
          <div className="px-2.5 py-1.5 border border-gray-400 text-gray-400 rounded-full cursor-pointer text-sm">
            Traffic source
          </div>
        </div>

        <Table data={data} />
      </div>
    </section>
  );
};

export default ProductManagement;
