"use client";

import { useState, useEffect } from "react";
import {fetchProducts} from "../../_api-end-point/endpoint"
import toast, { Toaster } from "react-hot-toast";
import Table from "../_components/table-all-product";
import TableTraffic from "../_components/table-traffic-source";
import Iphone from "../../../assets/images/iphone.png";

const ProductManagement = () => {
  const [isAllProduct, setIsAllProduct] = useState(true);
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  
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


  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const products = await fetchProducts();
        console.log(products,"products")
        // setData(products)
      } catch (error) {
        toast.error("Failed to load products.");
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (isLoading) return <div></div>;

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
          <Table />
        ) : (
          <TableTraffic dataTraffic={dataTraffic} />
        )}
      </div>
    </section>
  );
};

export default ProductManagement;
