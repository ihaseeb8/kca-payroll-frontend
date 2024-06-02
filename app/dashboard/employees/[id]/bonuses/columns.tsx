"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Bonus } from "@/app/lib/definitions"
import { EditBonus, DeleteBonus } from "@/app/ui/bonuses/actions"
import {MoreHorizontal, BadgeCheckIcon, Badge, BadgeXIcon} from "lucide-react"
import { formattedDate } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// import { View, Edit, Deactivate, AddBankAccount, Promote, Bonuses } from "@/app/ui/employees/buttons"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Bonus>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: 'Amount'
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({row}) => {
      return(
        <>{formattedDate(row.original.date)}</>
      )
    }
  },
  {
    id: "actions",
    size: 2,
    cell: ({ row }) => {
      const bonus = row.original
 
      return (
        <>
          <EditBonus id={bonus.id} name={bonus.name} amount={bonus.amount} date={bonus.date} employeeId={bonus.fkEmployeeId}/>
          <DeleteBonus id={bonus.id} />
        </>
      )
    },
  },

]
