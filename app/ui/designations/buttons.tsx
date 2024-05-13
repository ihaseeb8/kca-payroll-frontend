import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deactivateDesignation } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';

export function CreateDesignation() {
  return (
    <Button asChild>
      <Link
        href="/dashboard/designations/create"
        className="flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="hidden md:block">Create</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function DeactivateDesignation({ id }: { id: number }){

  const deactivateDesignationwithId = deactivateDesignation.bind(null, id);
  return(
    <form action={deactivateDesignationwithId}>
        <button>Deactivate</button>
    </form>
  )
}

export function UpdateDesination({id}: {id: number}){
  return(
    <Link
      href={`/dashboard/designations/${id}/edit`}
    >
      Edit
    </Link>
  )
}