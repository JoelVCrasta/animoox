"use client";

import * as React from "react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { Pencil, Trash2, Copy } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import ProductCell from "../_components/product-cell";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = {
  productName: string;
  category: string;
  src?: string;
  status: number;
  price: string;
  pageViews: string;
  increment: boolean;
};

const data: Product[] = [
  {
    productName: "iPhone 16 Pro",
    category: "Smart Phone",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 1,
    price: "$1099",
    pageViews: "1475.5K",
    increment: true,
  },
  {
    productName: "MacBook Pro",
    category: "Laptop, Notebook",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 1,
    price: "$1099",
    pageViews: "1500.5K",
    increment: false,
  },
  {
    productName: "Apple Watch 10",
    category: "Smart Watch",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 0,
    price: "$2099",
    pageViews: "200.47K",
    increment: true,
  },
  {
    productName: "Amd Ryzen 9",
    category: "Processor",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 2,
    price: "$999.99",
    pageViews: "1475.5K",
    increment: true,
  },
  {
    productName: "iPhone 16 Pro",
    category: "Smart Phone",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 1,
    price: "$1099",
    pageViews: "1475.5K",
    increment: true,
  },
  {
    productName: "MacBook Pro",
    category: "Laptop, Notebook",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 1,
    price: "$1099",
    pageViews: "1500.5K",
    increment: false,
  },
  {
    productName: "Apple Watch 10",
    category: "Smart Watch",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 0,
    price: "$2099",
    pageViews: "200.47K",
    increment: true,
  },
  {
    productName: "Amd Ryzen 9",
    category: "Processor",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 2,
    price: "$999.99",
    pageViews: "1475.5K",
    increment: true,
  },
  {
    productName: "iPhone 16 Pro",
    category: "Smart Phone",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 1,
    price: "$1099",
    pageViews: "1475.5K",
    increment: true,
  },
  {
    productName: "MacBook Pro",
    category: "Laptop, Notebook",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 1,
    price: "$1099",
    pageViews: "1500.5K",
    increment: false,
  },
  {
    productName: "Apple Watch 10",
    category: "Smart Watch",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 0,
    price: "$2099",
    pageViews: "200.47K",
    increment: true,
  },
  {
    productName: "Amd Ryzen 9",
    category: "Processor",
    src: "https://res.cloudinary.com/dhlsvwpny/image/upload/v1731668101/iphone_ezxxoe.png",
    status: 2,
    price: "$999.99",
    pageViews: "1475.5K",
    increment: true,
  },
];

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <ProductCell
        imageUrl={row.original.src}
        productName={row.original.productName}
      />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as number;
      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${
            status === 0
              ? "bg-[#FFECE9] text-[#FF4326] border border-[#FF4326]"
              : status === 1
              ? "bg-[#F3FBEA] text-[#89D62A] border border-[#89D62A]"
              : "bg-[#FFF9EC] text-[#FFC13D] border border-[#FFC13D]"
          }`}
        >
          {status === 0 ? "Rejected" : status === 1 ? "Active" : "Pending"}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "pageViews",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Page Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const increment = row.original.increment;
      return (
        <div className="flex items-center justify-center gap-2">
          {row.getValue("pageViews")}
          {increment ? (
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions", // Static header without sorting functionality
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          {/* Edit Icon */}
          <button
            onClick={() => console.log("Edit", row.original)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          {/* Delete Icon */}
          <button
            onClick={() => console.log("Delete", row.original)}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {/* Copy Icon */}
          <button
            onClick={() => console.log("Copy", row.original)}
            className="text-gray-500 hover:text-gray-700"
            title="Copy"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      );
    },
  },
];

const DataTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow mt-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <Input
              placeholder="Search product"
              value={
                (table.getColumn("productName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("productName")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          {/* Here */}
          <div className="flex items-center justify-between mb-5">
            
            <div className="flex items-center gap-2.5">
              <button className="flex items-center justify-center gap-[5px] cursor-pointer bg-[#2C2F50] text-white px-5 py-2.5 rounded-[40px]">
                <CiFilter className="text-lg" />
                <span>Filter By</span>
              </button>
              <Link href="/admin/add-pack">
                <button className="flex items-center justify-center gap-[5px] cursor-pointer bg-[#4F73FF] text-white px-5 py-2.5 rounded-[40px]">
                  <FiPlus className="text-lg" />
                  <span>New New Post</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader className="bg-[#EDF1FF]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-4 py-2 text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-4 text-left">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronFirst className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium">Page</p>
            <span className="text-sm font-medium">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronLast className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
