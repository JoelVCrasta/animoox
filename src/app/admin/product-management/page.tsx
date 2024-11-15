"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Table from "../_components/table-all-product";
import TableTraffic from "../_components/table-traffic-source";
import Iphone from "../../../assets/images/iphone.png";

const ProductManagement = () => {
  interface Product {
    id: string;
    productId: string;
    type: string;
    pack: string;
    typeSmallDescription: string;
    price: number;
    tag: string;
    category: string;
    title: string;
    description: string;
    pageView: string;
    smallDescription: string;
    animationCount: number;
    buttonText: string;
    files: string[];
    compatibility: string[];
    highlights: string[];
    createdAt: string;
    updatedAt: string;
  }
  const [isAllProduct, setIsAllProduct] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  async function fetchProductsFromAPI(productId?: string): Promise<Product[]> {
    const url = productId ? `/api/product?productId=${productId}` : "/api/product";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const products = await fetchProductsFromAPI();
        setData(products)
      } catch (error) {
        toast.error("Failed to load products.");
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

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
        {isAllProduct ? <Table data={data}/> : <TableTraffic dataTraffic={dataTraffic} />}
      </div>
    </section>
  );
};

export default ProductManagement;
