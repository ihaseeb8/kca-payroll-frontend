"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Employee } from "@/app/lib/definitions"
import {MoreHorizontal, BadgeCheckIcon, Badge} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeactivateDesignation, UpdateDesination } from "@/app/ui/designations/buttons"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "designations.designationName",
    header: 'Designation'
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile No",
  },
  {
    accessorKey: "emailAddress",
    header: "Email"
  },
  {
    accessorKey: "cnic",
    header: "CNIC"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const status = row.getValue('status')
      const icon = status === 'active' ? <BadgeCheckIcon className="text-green-600"/> : <Badge />;
      return <>{icon}</>
    },
  },
  
]
