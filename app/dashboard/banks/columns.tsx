"use client"

import { ColumnDef } from "@tanstack/react-table"
import { BankDetails } from "@/app/lib/definitions"
import { MoreHorizontal, BadgeCheckIcon, BadgeXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeactivateBankDetails, UpdateBankDetails } from "@/app/ui/banks/buttons"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<BankDetails>[] = [
  {
    accessorKey: "bankUser.id",
    header: "ID",
  },
  {
    accessorKey: "bankUser.name",
    header: "Name",
  },
  {
    accessorKey: "bankName",
    header: "Bank",
  },
  {
    accessorKey: "accountNumber",
    header: "IBAN",
  },
  {
    accessorKey: "bankStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue('bankStatus')
      const icon = status === 'active' ? <BadgeCheckIcon className="text-success" /> : <BadgeXIcon className="text-destructive" />;
      return <>{icon} </>
    }
  },
  {
    id: "actions",
    size: 2,
    cell: ({ row }) => {
      const bank = row.original

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
              <UpdateBankDetails id={bank.id} />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <DeactivateBankDetails id={bank.id} />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(bank.accountNumber))}
            >
              Copy IBAN
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

