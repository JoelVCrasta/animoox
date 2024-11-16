"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Table from "../_components/table-order-management";

interface Order {
  id: string;
  name: string;
  email: string;
  budget: string;
  status: string;
  trafficSource: string;
  createdAt: string;
}

const OrderManagement = () => {
  const [data, setData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchProductsFromAPI(): Promise<Order[]> {
    const url = "/api/order";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }

  const handleDataChange = (newData: Order[]) => {
    setData(newData);
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const order = await fetchProductsFromAPI();
        // console.log(order, "order");
  
        // Transform the data to match the expected Order type
        const orders: Order[] = order.map((product: Order) => ({
          id: product.id,
          name: product.name,
          email: product.email,
          budget: product.budget,
          status: product.status,
          trafficSource: product.trafficSource,
          createdAt: product.createdAt
        }));
  
        setData(orders);
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
        <Table 
          data={data} 
          onDataChange={handleDataChange}
        />
      </div>
    </section>
  );
};

export default OrderManagement;