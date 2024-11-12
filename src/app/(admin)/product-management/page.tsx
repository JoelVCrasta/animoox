"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Table from "../_components/table";
import TableTraffic from "../_components/tableTrafficSource";
import Iphone from "../../../assets/images/iphone.png";

const ProductManagement = () => {
  const [isAllProduct, setIsAllProduct] = useState(true);
  const data = [
    {
      productName: "iPhone 16 Pro",
      category: "Smart Phone",
      src: Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      category: "Laptop, Notebook",
      src: Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1500.5K",
      increment: false,
    },
    {
      productName: "Apple Watch 10",
      category: "Smart Watch",
      src: Iphone,
      status: 0,
      price: "$2099",
      pageViews: "200.47K",
      increment: true,
    },
    {
      productName: "Amd Ryzen 9",
      category: "Processor",
      src: Iphone,
      status: 2,
      price: "$999.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "iPhone 16 Pro",
      category: "Smart Phone",
      src: Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      category: "Laptop, Notebook",
      src: Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1500.5K",
      increment: false,
    },
    {
      productName: "Apple Watch 10",
      category: "Smart Watch",
      src: Iphone,
      status: 0,
      price: "$2099",
      pageViews: "200.47K",
      increment: true,
    },
    {
      productName: "Amd Ryzen 9",
      category: "Processor",
      src: Iphone,
      status: 2,
      price: "$999.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "iPhone 16 Pro",
      category: "Smart Phone",
      src: Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      category: "Laptop, Notebook",
      src: Iphone,
      status: 1,
      price: "$1099",
      pageViews: "1500.5K",
      increment: false,
    },
    {
      productName: "Apple Watch 10",
      category: "Smart Watch",
      src: Iphone,
      status: 0,
      price: "$2099",
      pageViews: "200.47K",
      increment: true,
    },
    {
      productName: "Amd Ryzen 9",
      category: "Processor",
      src: Iphone,
      status: 2,
      price: "$999.99",
      pageViews: "1475.5K",
      increment: true,
    },
  ];
  const dataTraffic = [
    {
      productName: "iPhone 16 Pro",
      dayTrading: "01",
      src: Iphone,
      weeklyTrading: "05",
      avgSales: "$9479.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      dayTrading: "02",
      src: Iphone,
      weeklyTrading: "03",
      avgSales: "$7479.99",
      pageViews: "1500.5K",
      increment: true,
    },
    {
      productName: "iPhone 16 Pro",
      dayTrading: "01",
      src: Iphone,
      weeklyTrading: "05",
      avgSales: "$9479.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      dayTrading: "02",
      src: Iphone,
      weeklyTrading: "03",
      avgSales: "$7479.99",
      pageViews: "1500.5K",
      increment: true,
    },
    {
      productName: "iPhone 16 Pro",
      dayTrading: "01",
      src: Iphone,
      weeklyTrading: "05",
      avgSales: "$9479.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      dayTrading: "02",
      src: Iphone,
      weeklyTrading: "03",
      avgSales: "$7479.99",
      pageViews: "1500.5K",
      increment: true,
    },
    {
      productName: "iPhone 16 Pro",
      dayTrading: "01",
      src: Iphone,
      weeklyTrading: "05",
      avgSales: "$9479.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      dayTrading: "02",
      src: Iphone,
      weeklyTrading: "03",
      avgSales: "$7479.99",
      pageViews: "1500.5K",
      increment: true,
    },
    {
      productName: "iPhone 16 Pro",
      dayTrading: "01",
      src: Iphone,
      weeklyTrading: "05",
      avgSales: "$9479.99",
      pageViews: "1475.5K",
      increment: true,
    },
    {
      productName: "MacBook Pro",
      dayTrading: "02",
      src: Iphone,
      weeklyTrading: "03",
      avgSales: "$7479.99",
      pageViews: "1500.5K",
      increment: true,
    },
  ];
  return (
    <section className="flex">
      <Toaster />

      <div className="w-full p-4 md:py-4 md:px-8">
        <div className="flex items-center gap-2 mt-5">
          <div
            className={`px-2.5 py-1.5 rounded-full cursor-pointer text-sm ${
              isAllProduct
                ? "bg-gray-800 text-white"
                : "border border-gray-400 text-gray-400"
            }`}
            onClick={() => setIsAllProduct(true)}
          >
            All Product
          </div>
          <div
            className={`px-2.5 py-1.5 rounded-full cursor-pointer text-sm ${
              !isAllProduct
                ? "bg-gray-800 text-white"
                : "border border-gray-400 text-gray-400"
            }`}
            onClick={() => setIsAllProduct(false)}
          >
            Traffic source
          </div>
        </div>
        {isAllProduct ? (
          <Table data={data} />
        ) : (
          <TableTraffic dataTraffic={dataTraffic} />
        )}
      </div>
    </section>
  );
};

export default ProductManagement;
