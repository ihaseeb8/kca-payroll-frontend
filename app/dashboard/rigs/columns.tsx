"use client"

import { ColumnDef } from "@tanstack/react-table"
import { RigLocation } from "@/app/lib/definitions"
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

import { ToggleStatus, UpdateRigLocation } from "@/app/ui/rigs/buttons"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


 export const columns: ColumnDef<RigLocation>[] = [
  {
    accessorKey: "rigBase",
    header: "Base",
  },
  {
    accessorKey: "rigBaseOffice",
    header: "Office",
  },
  {
    accessorKey: "rigStatus",
    header: "Status",
    cell: ({row}) => {
      const status = row.getValue('rigStatus')
      const icon = status === 'active' ? <BadgeCheckIcon className="text-success"/> : <BadgeXIcon className="text-destructive" />;
      return <>{icon}</>
    }
  },
  {
    id: "actions",
    size: 2,
    cell: ({ row }) => {
      const rigLocation = row.original 

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

            <DropdownMenuItem className="p-0">
              <UpdateRigLocation id={rigLocation.id}/>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />

            <DropdownMenuItem className="p-0">
              <ToggleStatus id={rigLocation.id} status={rigLocation.rigStatus}/>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(rigLocation.id))}
              className="cursor-pointer"
            >
              Copy Rig ID
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// disabled={rigLocation.rigStatus === 'inactive'}