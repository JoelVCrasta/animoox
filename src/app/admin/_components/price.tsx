import React, { useEffect, useState } from "react";
import { RxUpload } from "react-icons/rx";
import PricingCard from "./pricing-card";

interface PricingPlan {
  id: string;
  type: string;
  price: number;
  save: number;
  duration: string;
  discount: number;
  description: string;
  features: string[];
}

const Price = () => {
  const [data, setData] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getPricingPlans(): Promise<PricingPlan[]> {
    const response = await fetch("/api/pricing");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Remove the extra .json() call
  }

  const getData = async () => {
    try {
      setIsLoading(true);
      const pricing = await getPricingPlans();
      setData(pricing);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch pricing data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Find pricing plan by type
  const getPlanByType = (type: string) => {
    return data.find((plan) => plan.type.toLowerCase() === type.toLowerCase());
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white p-6 rounded-lg shadow mt-8">
        <div className="flex justify-between gap-4">
          <h3 className="text-[#2C2F50] text-lg font-semibold">
            Manage your pricing
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <button className="flex items-center justify-center gap-[5px] cursor-pointer border border-[#73748A] text-[#73748A] px-5 py-2.5 rounded-[40px]">
                  <span>Save as draft</span>
                </button>

                <button className="flex items-center justify-center gap-[5px] cursor-pointer bg-[#4F73FF] text-white px-5 py-2.5 rounded-[40px]">
                  <RxUpload className="text-lg" />
                  <span>Publish product</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <PricingCard title="Basic" initialData={getPlanByType("Basic")} />
          <PricingCard title="Premium" initialData={getPlanByType("Premium")} />
          <PricingCard title="Team" initialData={getPlanByType("Team")} />
        </div>
      </div>
    </>
  );
};

export default Price;
