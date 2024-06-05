"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Expenses } from "@/app/lib/definitions"
import { EditExpense, DeleteExpense } from "@/app/ui/expenses/actions"
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


// import { View, Edit, Deactivate, AddBankAccount, Promote, expensees } from "@/app/ui/employees/buttons"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Expenses>[] = [
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
      const expense = row.original
 
      return (
        <>
          <EditExpense id={expense.id} name={expense.name} amount={expense.amount} date={expense.date} employeeId={expense.fkEmployeeId}/>
          <DeleteExpense id={expense.id} />
        </>
      )
    },
  },

]
