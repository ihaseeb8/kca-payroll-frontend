import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deactivateBankDetails } from '@/app/lib/actions/banks';



export function DeactivateBankDetails({ id }: { id: number }){

  const deactivateBankDetailswithId = deactivateBankDetails.bind(null, id);
  return(
    <form action={deactivateBankDetailswithId}>
        <button>Deactivate Bank Account</button>
    </form>
  )
}

export function UpdateBankDetails({id}: {id: number}){
  return(
    <Link
      href={`/dashboard/banks/${id}/edit`}
    >
      Edit Bank Details
    </Link>
  )
}