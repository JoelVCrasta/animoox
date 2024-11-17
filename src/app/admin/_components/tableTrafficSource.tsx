import React from "react";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { RxCaretSort } from "react-icons/rx";
import { IoMdArrowDropup } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import Image, { StaticImageData } from "next/image";
import { FaArrowRight } from "react-icons/fa6";

// Define the interface for a single product item
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
    <div className="table-main">
      <div className="table-head">
        <h3 className="head">Tending product list</h3>
        <div className="table-head-right">
          <button className="btn-secondary">
            <CiFilter className="plusSvg" />
            <span>Filter By</span>
          </button>
        </div>
      </div>

      <table className="table product">
        <thead>
          <tr>
            <th>
              <span className="theadlist">
                Product Name <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="theadlist">
                Day Trading <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="theadlist">
                Weekly Treading <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="theadlist">
                Avg. Sales <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="theadlist">
                Page views <RxCaretSort />
              </span>
            </th>
            <th>
              <span className="theadlist">
                Action <RxCaretSort />
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="tbody">
          {dataTraffic &&
            dataTraffic.map((item, i) => (
              <tr key={i}>
                <td className="prod-name">
                  {item.src && (
                    <Image src={item.src} alt="img" height={40} width={40} />
                  )}
                  <span>{item.productName}</span>
                </td>
                <td>{item.dayTrading}</td>
                <td>
                  {item.weeklyTrading}
                </td>
                <td>{item.avgSales}</td>
                <td>
                  <span className="prod-name">
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
                <td>
                  <div className="actions">
                    <LuPencil className="actionSvg" />
                    <IoCopyOutline className="actionSvg" />
                    <RiDeleteBin2Line className="actionSvg" />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="footer-table">
        <p className="footer-p">Showing 1 to 6 of 100 entries</p>
        <div className="pagination">
          <div className="pages page-active">1</div>
          <div className="pages">2</div>
          <div className="pages">3</div>
          <div className="pages">4</div>
          <div className="pages">5</div>
          <div className="pages"><FaArrowRight/></div>
        </div>
      </div>
    </div>
  );
};

export default Table;
