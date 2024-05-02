"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Designation } from "@/app/lib/definitions"
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


export const columns: ColumnDef<Designation>[] = [
  {
    accessorKey: "designationName",
    header: "Name",
  },
  {
    accessorKey: "shortName",
    header: "Short Name",
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const status = row.getValue('status')
      const icon = status === 'active' ? <BadgeCheckIcon className="text-green-600"/> : <Badge />;
      return <>{icon}</>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const designation = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(designation.id))}
            >
              Copy designation ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={designation.status === 'inactive'}>
              <DeactivateDesignation id={designation.id}/>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UpdateDesination id={designation.id}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
