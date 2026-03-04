"use client";
import { ColumnDef } from "@tanstack/react-table";
import {  NewCategory } from "@/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";



export const CategoriesColumns: ColumnDef<NewCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "category_name_en",
    header: "Name (EN)",
    cell: ({ row }) => {
      const name = row.getValue("category_name_en") as string;
      return (
        <div className="font-medium">{name}</div>
      );
    },
  },
   {
    accessorKey: "category_name_ar",
    header: "Name (AR)",
    cell: ({ row }) => {
      const name = row.getValue("category_name_ar") as string;
      return (
        <div className="font-medium">{name}</div>
      );
    },
    meta:{hiddenByDefault:true}
  },
  
  {
    accessorKey: "category_description_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const description_en = row.getValue("category_description_en") as string;
      return (
        <div className="text-gray-800 font-medium">
          {description_en.slice(0, 35) + "..."}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "category_description_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const description_ar = row.getValue("category_description_ar") as string;
      return (
        <div className="text-gray-800 font-medium " dir="ltr">
          {description_ar.slice(0, 35) + "..."}
        </div>
      );
    },
    enableSorting: true,
    meta:{hiddenByDefault:true}
  },
  {
    accessorKey: "category_logo",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("category_logo") as string;
      const name = row.getValue("category_name_en") as string;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={image || "/placeholder-logo.png"}
            alt={name}
            width={50}
            height={50}
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
      );
    },
    enableSorting: false,
  },
];
