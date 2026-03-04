"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GetProject } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const ProjectsColumns: ColumnDef<GetProject>[] = [

  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
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
    id: "category_name_en",
    header: "Category",
    accessorFn: (row) => row.categories?.category_name_en,
    cell: ({ row }) => {
      const name = row.original.categories?.category_name_en;
      return <div className="font-medium">{name}</div>;
    },
  },


  {
    accessorKey: "project_name_en",
    header: "Project Name (EN)",
    cell: ({ row }) => {
      const name = row.getValue("project_name_en") as string;
      return <div className="font-medium">{name}</div>;
    },
  },


  {
    accessorKey: "project_description_en",
    header: ({ column }) => (
      <button
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const desc = row.getValue("project_description_en") as string;
      return (
        <div className="text-gray-800 font-medium">
          {desc.slice(0, 35)}...
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "project_name_ar",
    header: "Project Name (AR)",
    cell: ({ row }) => {
      const name = row.getValue("project_name_ar") as string;
      return <div className="font-medium">{name}</div>;
    },
    meta: { hiddenByDefault: true },
  },
  {
    accessorKey: "project_description_ar",
    header: "Description (AR)",
    cell: ({ row }) => {
      const desc = row.getValue("project_description_ar") as string;
      return (
        <div className="text-gray-800 font-medium" dir="rtl">
          {desc.slice(0, 35)}...
        </div>
      );
    },
    meta: { hiddenByDefault: true },
  },
  {
    accessorKey: "project_image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("project_image") as string;
      const name = row.getValue("project_name_en") as string;

      return (
        <Image
          src={image || "/placeholder.png"}
          alt={name}
          width={50}
          height={50}
          className="rounded-md object-cover"
          unoptimized
        />
      );
    },
    enableSorting: false,
    meta: { hiddenByDefault: true },
  },
];
