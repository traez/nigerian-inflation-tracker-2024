"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormEntryWithMongoId } from "@/lib/typeFormEntry";

export const TanColumns: ColumnDef<FormEntryWithMongoId>[] = [
  {
    accessorKey: "userEmail",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
  },
  {
    accessorKey: "datePurchased",
    header: "Date Purchased",
  },
  {
    accessorKey: "dateReported",
    header: "Date Reported",
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
    accessorKey: "item",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Item
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
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
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            State
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
