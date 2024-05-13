"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Employee } from "@/app/lib/definitions"
import {MoreHorizontal, BadgeCheckIcon, Badge, BadgeXIcon} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { View, Edit, Deactivate, AddBankAccount } from "@/app/ui/employees/buttons"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
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
      const icon = status === 'active' ? <BadgeCheckIcon className="text-success"/> : <BadgeXIcon className="text-destructive"/>;
      return <>{icon}</>
    },
  },
  {
    id: "actions",
    size: 2,
    cell: ({ row }) => {
      const employee = row.original
 
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

            <DropdownMenuItem>
              <View id={employee.id}/>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Edit id={employee.id}/>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem disabled={employee.status === 'inactive'}>
              <Deactivate id={employee.id}/>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <AddBankAccount id={employee.id}/>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(employee.id))}
            >
              Copy ID
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]
