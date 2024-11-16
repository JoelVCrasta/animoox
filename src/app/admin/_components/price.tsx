import React, { useEffect, useState } from "react";
import { RxUpload } from "react-icons/rx";
import PricingCard from "./pricing-card";
import { toast } from "sonner";

interface PricingPlan {
  id: string;
  type: string;
  price: number;
  save: number;
  duration: string;
  discount: number;
  description: string;
  features: string[];
  status: string;
}
interface PricingFormData {
  mainPrice: string;
  price: string;
  description: string;
  duration: "Annual" | "Monthly" | "Quarterly";
  savePercent: string;
  features: string[];
}

const Price = () => {
  const [data, setData] = useState<PricingPlan[]>([]);
  const [formData, setFormData] = useState<Record<string, PricingFormData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPricingPlans = async (): Promise<PricingPlan[]> => {
    const response = await fetch("/api/pricing");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  const handleFormDataChange = (type: string, data: PricingFormData) => {
    setFormData((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  const updateAllPlansStatus = async (status: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const updates = Object.entries(formData).map(async ([type, form]) => {
        const planData = {
          type,
          price: parseFloat(form.mainPrice) || 0,
          save: parseInt(form.savePercent) || 0,
          duration: form.duration,
          discount: parseFloat(form.price) || 0,
          description: form.description,
          features: form.features,
          status: status,
        };

        const response = await fetch("/api/pricing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(planData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update ${type}`);
        }

        return await response.json();
      });

      await Promise.all(updates);
      await getData(); // Refresh the data
      toast.success(
        `All plans ${
          status === "draft" ? "saved as draft" : "published"
        } successfully`
      );
    } catch (error) {
      toast.error("Failed to update plans");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusUpdate = (type: string, status: string) => {
    setData((prev) =>
      prev.map((plan) => (plan.type === type ? { ...plan, status } : plan))
    );
  };

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
                <button
                  onClick={() => updateAllPlansStatus("draft")}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-[5px] cursor-pointer border border-[#73748A] text-[#73748A] px-5 py-2.5 rounded-[40px]"
                >
                  <span>{isSubmitting ? "Saving..." : "Save as draft"}</span>
                </button>

                <button
                  onClick={() => updateAllPlansStatus("published")}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-[5px] cursor-pointer bg-[#4F73FF] text-white px-5 py-2.5 rounded-[40px]"
                >
                  <RxUpload className="text-lg" />
                  <span>
                    {isSubmitting ? "Publishing..." : "Publish product"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <PricingCard
            title="Basic"
            initialData={getPlanByType("Basic")}
            onFormDataChange={handleFormDataChange}
            onStatusUpdate={handleStatusUpdate}
          />
          <PricingCard
            title="Premium"
            initialData={getPlanByType("Premium")}
            onFormDataChange={handleFormDataChange}
            onStatusUpdate={handleStatusUpdate}
          />
          <PricingCard
            title="Team"
            initialData={getPlanByType("Team")}
            onFormDataChange={handleFormDataChange}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      </div>
    </>
  );
};

export default Price;
