import React, { useState, useMemo, useRef } from "react";
import { RxUpload } from "react-icons/rx";
import PricingCard from "./priceing-card";

const Price = () => {
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
          <PricingCard title="Basic" />
          <PricingCard title="Premium" />
          <PricingCard title="Team" />
        </div>
      </div>
    </>
  );
};

export default Price;
