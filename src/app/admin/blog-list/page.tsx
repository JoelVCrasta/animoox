"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Table from "../_components/table-blog-list";
import Iphone from "../../../assets/images/iphone.png";

const ProductManagement = () => {
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  //   useEffect(() => {
  //     async function loadProducts() {
  //       try {
  //         setIsLoading(true);
  //         const products = await fetchProducts();
  //         console.log(products,"products")
  //       } catch (error) {
  //         toast.error("Failed to load products.");
  //         console.error("Error loading products:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //     loadProducts();
  //   }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex">
      <Toaster />

      <div className="w-full p-4 md:py-4 md:px-8">
        <Table data={data} />
      </div>
    </section>
  );
};

export default ProductManagement;
