import React from 'react';
import { HiOutlineDownload } from 'react-icons/hi'; // Using Heroicons for download icon



const TableComponent = ({data}:any) => {
  return (
    <div className=" overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 border-b border-brand">
            <th className="px-6 py-3 text-sm font-extralight">Name</th>
            <th className="px-6 py-3 text-sm font-extralight">Image</th>
            <th className="px-6 py-3 text-sm font-extralight">File Size</th>
            <th className="px-6 py-3 text-sm font-extralight text-right">Download</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item:any, index:number) => (
            <tr key={index} className="border-b border-brand hover:bg-gray-50">
              <td className="px-6 py-4 text-blue-600 font-medium">{item.name}</td>
              <td className="px-6 py-4">
                <div className="w-10 h-10 bg-gray-300 rounded-lg"></div> {/* Placeholder for image */}
              </td>
              <td className="px-6 py-4 text-gray-700">{item.fileSize}</td>
              <td className="px-6 py-4 text-right">
                <a href={item.downloadLink} className="text-blue-600 hover:text-blue-800">
                  <HiOutlineDownload className="inline w-5 h-5" /> {/* Download icon */}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
