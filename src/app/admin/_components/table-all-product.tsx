import React from "react";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { RxCaretSort } from "react-icons/rx";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface Product {
  productName: string;
  category: string;
  src?: StaticImageData;
  status: number;
  price: string;
  pageViews: string;
  increment: boolean;
}

interface TableProps {
  data: Product[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="w-full p-5 rounded-[20px] bg-white mt-[30px] shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[#2C2F50] text-lg font-semibold">Product list</h3>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center justify-center gap-[5px] cursor-pointer bg-[#2C2F50] text-white px-5 py-2.5 rounded-[40px]">
            <CiFilter className="text-lg" />
            <span>Filter By</span>
          </button>
          <Link href="/admin/add-pack">
            <button className="flex items-center justify-center gap-[5px] cursor-pointer bg-[#4F73FF] text-white px-5 py-2.5 rounded-[40px]">
              <FiPlus className="text-lg" />
              <span>New Product</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="w-full h-[600px] overflow-y-auto rounded-lg">
          <table className="w-full border-collapse text-sm text-left">
            <thead className="sticky top-0 bg-[#EDF1FF] text-[#2C2F50]">
              <tr>
                <th className="p-3 font-semibold">
                  <span className="flex items-center">
                    Product Name <RxCaretSort />
                  </span>
                </th>
                <th className="p-3 font-semibold">
                  <span className="flex items-center">
                    Category <RxCaretSort />
                  </span>
                </th>
                <th className="p-3 font-semibold">
                  <span className="flex items-center">
                    Status <RxCaretSort />
                  </span>
                </th>
                <th className="p-3 font-semibold">
                  <span className="flex items-center">
                    Price <RxCaretSort />
                  </span>
                </th>
                <th className="p-3 font-semibold">
                  <span className="flex items-center">
                    Page views <RxCaretSort />
                  </span>
                </th>
                <th className="p-3 font-semibold">
                  <span className="flex items-center">
                    Action <RxCaretSort />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {data?.map((item, i) => (
                <tr
                  key={i}
                  style={{borderBottom:"1px solid #E8E8EC"}}
                  className="border-b border-[#E8E8EC] hover:bg-[rgba(230,244,255,0.5)]"
                >
                  <td className="p-3 align-middle">
                    <div className="flex items-center gap-2">
                      {item.src && (
                        <Image src={item.src} alt="img" height={40} width={40} />
                      )}
                      <span>{item.productName}</span>
                    </div>
                  </td>
                  <td className="p-3 align-middle">{item.category}</td>
                  <td className="p-3 align-middle">
                    {item.status === 1 ? (
                      <div className="border border-[#89D62A] text-[#89D62A] bg-[#F3FBEA] rounded-[20px] px-2 py-1 text-center w-[80px]">
                        Active
                      </div>
                    ) : item.status === 2 ? (
                      <div className="border border-[#FFC13D] text-[#FFC13D] bg-[#FFF9EC] rounded-[20px] px-2 py-1 text-center w-[80px]">
                        Pending
                      </div>
                    ) : (
                      <div className="border border-[#FF4326] text-[#FF4326] bg-[#FFECE9] rounded-[20px] px-2 py-1 text-center w-[80px]">
                        Rejected
                      </div>
                    )}
                  </td>
                  <td className="p-3 align-middle">{item.price}</td>
                  <td className="p-3 align-middle">
                    <div className="flex items-center gap-2">
                      {item.pageViews}
                      {item.increment ? (
                        <IoMdArrowDropup className="text-[#89D62A] text-lg" />
                      ) : (
                        <IoMdArrowDropdown className="text-[#FF4326] text-lg" />
                      )}
                    </div>
                  </td>
                  <td className="p-3 align-middle">
                    <div className="flex items-center gap-3">
                      <LuPencil className="text-base cursor-pointer" />
                      <IoCopyOutline className="text-base cursor-pointer" />
                      <RiDeleteBin2Line className="text-base cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs font-normal text-[#8A8B9E]">Showing 1 to 6 of 100 entries</p>
        <div className="flex items-center gap-2.5">
          <div className="bg-[#E8E8EC] h-[30px] w-[30px] flex items-center justify-center rounded text-black cursor-pointer">
            1
          </div>
          {[2, 3, 4, 5].map((page) => (
            <div
              key={page}
              className="bg-[#E8E8EC] h-[30px] w-[30px] flex items-center justify-center rounded text-[#8A8B9E] cursor-pointer"
            >
              {page}
            </div>
          ))}
          <div className="bg-[#E8E8EC] h-[30px] w-[30px] flex items-center justify-center rounded text-[#8A8B9E] cursor-pointer">
            <FaArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
