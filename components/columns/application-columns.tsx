"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewApplication } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Eye, EyeOff, View } from "lucide-react";
import { is } from "zod/v4/locales";
import { Check } from "lucide-react";

export const ApplicationColumns: ColumnDef<NewApplication>[] = [
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
    accessorKey: "first_name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        First Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),

    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-800">
            {row.original.first_name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Last Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-gray-800">{row.original.last_name}</div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Phone Number
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.phone_number}</div>
    ),
    meta: { hiddenByDefault: true },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Email
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "major",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Major
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.major}</div>
    ),
    meta: { hiddenByDefault: true },
  },
  {
    accessorKey: "Reviewed",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Reviewed
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">
        {row.original.is_shown ? (
          <div className="flex -space-x-1">
            <Check className="h-4 w-4 text-blue-500" />
            <Check className="h-4 w-4 text-blue-500" />
          </div>
        ) : (
          <Check className="h-4 w-4 text-gray-400" />
        )}
      </div>
    ),
  },
];
