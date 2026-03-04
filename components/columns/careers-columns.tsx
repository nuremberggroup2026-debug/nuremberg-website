"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewCareer } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const CareersColumns: ColumnDef<NewCareer>[] = [
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
    accessorKey: "position_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Position (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("position_en") as string;
      return <div className=" font-medium">{name}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "posistion_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Position (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.original.position_ar;
      return <div className=" font-medium">{name}</div>;
    },
    enableSorting: true,
    meta:{ hiddenByDefault: true }
  },

  {
    accessorKey: "description_en",
    header: "Description (EN)",
    cell: ({ row }) => {
      const name = row.getValue("description_en") as string;

      return <div className="flex items-center gap-2">{name}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "description_ar",
    header: "Description (AR)",
    cell: ({ row }) => {
      const name = row.original.description_ar;
      return <div>{name}</div>;
    },
    enableSorting: false,
    meta:{ hiddenByDefault: true }
  },
  {
    accessorKey: "experience_en",
    header: "Experience (EN)",
    cell: ({ row }) => {
      const name = row.original.experience_en;
      return <div>{name}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "experience_ar",
    header: "Experience (AR)",
    cell: ({ row }) => {
      const name = row.original.experience_ar;
      return <div>{name}</div>;
    },
    enableSorting: false,
    meta:{ hiddenByDefault: true }
  },
  {
    accessorKey: "role_en",
    header: "Role (EN)",
    cell: ({ row }) => {
      const name = row.original.role_en;
      return <div>{name}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "role_ar",
    header: "Role (AR)",
    cell: ({ row }) => {
      const name = row.original.role_ar;
      return <div>{name}</div>;
    },
    enableSorting: false,
    meta:{ hiddenByDefault: true }
  },
  
];
