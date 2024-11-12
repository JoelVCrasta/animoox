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

      <div className="w-full p-4 md:py-4 md:px-8">
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
