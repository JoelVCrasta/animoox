"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Price from "../_components/price";


const PriceManagement = () => {

  return (
    <section className="flex">
      <Toaster />
      <div className="w-full p-4 md:py-4 md:px-8">
        <Price/>
      </div>
    </section>
  );
};

export default PriceManagement;