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
  dayTrading: string;
  src?: StaticImageData;
  weeklyTrading: string;
  avgSales: string;
  pageViews: string;
  increment: boolean;
}

// Define the interface for the props accepted by the Table component
interface TableProps {
  dataTraffic: Product[];
}

const Table: React.FC<TableProps> = ({ dataTraffic }) => {
  return (
    <div className="w-full p-5 rounded-[20px] bg-white mt-[30px] shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[#2C2F50] text-lg font-semibold">Tending product list</h3>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center justify-center gap-[5px] cursor-pointer bg-[#2C2F50] text-white px-5 py-2.5 rounded-[40px]">
            <CiFilter className="text-lg" />
            <span>Filter By</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="w-full h-[600px] overflow-y-auto rounded-lg">
          <table className="w-full border-collapse text-sm text-left">
            <thead className="sticky top-0 bg-[#EDF1FF] text-[#2C2F50]">
              <tr>
              <th>
              <span className="flex items-center">
                Product Name <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="flex items-center">
                Day Trading <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="flex items-center">
                Weekly Treading <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="flex items-center">
                Avg. Sales <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="flex items-center">
                Page views <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="flex items-center">
                Action <RxCaretSort />
              </span>
            </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {dataTraffic?.map((item, i) => (
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
                  <td className="p-3 align-middle">{item.dayTrading}</td>
                  <td className="p-3 align-middle">
                  {item.weeklyTrading}
                  </td>
                  <td className="p-3 align-middle">{item.avgSales}</td>
                  <td className="p-3 align-middle">
                  <span className="flex item-center gap-[5px]">
                    {item.pageViews}{" "}
                    {item.increment ? (
                      <IoMdArrowDropup
                        style={{ color: "#89D62A", fontSize: "18px" }}
                      />
                    ) : (
                      <IoMdArrowDropdown
                        style={{ color: "#FF4326", fontSize: "18px" }}
                      />
                    )}
                  </span>
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
