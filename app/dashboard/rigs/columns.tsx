"use client"

import { ColumnDef } from "@tanstack/react-table"
import { RigLocation } from "@/app/lib/definitions"
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

import { DeactivateRigLocation, UpdateRigLocation } from "@/app/ui/rigs/buttons"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


 export const columns: ColumnDef<RigLocation>[] = [
  {
    accessorKey: "rigBase",
    header: "Rig Base",
  },
  {
    accessorKey: "rigBaseOffice",
    header: "Rig Base Office",
  },
  {
    accessorKey: "rigStatus",
    header: "Status",
    cell: ({row}) => {
      const status = row.getValue('rigStatus')
      const icon = status === 'active' ? <BadgeCheckIcon className="text-green-600"/> : <Badge />;
      return <>{icon}</>
    }
  },
  {
    id: "actions",
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(rigLocation.id))}
            >
              Copy Rig Location ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <DeactivateRigLocation id={rigLocation.id} rigStatus={rigLocation.rigStatus}/>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UpdateRigLocation id={rigLocation.id}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// disabled={rigLocation.rigStatus === 'inactive'}