"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  BellIcon,
  ChevronDownIcon,
  Search,
  Settings,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const AdminHeader = () => {
  const session = useSession();
  const user = session.data?.user;
  const pathname = usePathname();
  const pathSegment = pathname.split("/").pop();

  let title;
  if (pathSegment === "add-icon") {
    title = "Add new Icon";
  }
  if (pathSegment === "add-pack") {
    title = "Add New Product";
  }
  if (pathSegment === "product-management") {
    title = "Product Management";
  }
  if (pathSegment === "order-management") {
    title = "Order Management";
  }

  return (
    <div className="flex flex-row justify-between items-center pt-8 w-full px-10">
      <div className="space-y-2 py-2 ">
        <p className="text-sm text-gray-700/80">Pages / Add Product</p>
        <p className="text-3xl font-bold text-[#15183D] whitespace-nowrap">
          {title}
        </p>
      </div>
      <div className="flex space-x-3 justify-end">
        <div className="h-14 bg-white flex justify-between items-center p-2 rounded-full relative">
          <img
            src="/searchIcon.svg"
            alt="search"
            width={15}
            height={15}
            className="absolute left-6 top-6.5"
          ></img>
          <Input
            type="search"
            placeholder="Search..."
            className="h-full w-48 rounded-full pl-10 pr-4 text-sm "
          />
        </div>

        <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full relative aspect-square">
          <BellIcon className=" w-6 h-6" strokeWidth={1.1} />
          <div className="w-3 h-3 p-2 bg-orange-600 rounded-full absolute top-2 right-2 flex justify-center items-center text-white font-thin">
            <span className="text-xs">0</span>
          </div>
        </div>

        <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full relative aspect-square">
          <SettingsIcon className=" w-6 h-6" strokeWidth={1} />
        </div>

        <div className="h-14 w-fit bg-white flex items-center p-2 rounded-full relative">
          {/* <img src="/searchIcon.svg" alt="search" width={20} height={20} className="absolute left-6 top-6" ></img> */}
          <div className="h-full aspect-square bg-neutral-500 rounded-full"></div>
          <div className="flex flex-col items-start pl-3 justify-center space-y-1">
            <p className="text-base font-semibold tracking-wider whitespace-nowrap truncate">
              {user?.name}
            </p>
            <p className="text-xs text-neutral-500">Product Manager </p>{" "}
            {/* {user?.role} should be there */}
          </div>

          <div className="h-full flex items-center rounded-full px-2">
            <ChevronDownIcon
              className="w-6 h-6 text-neutral-500"
              strokeWidth={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
