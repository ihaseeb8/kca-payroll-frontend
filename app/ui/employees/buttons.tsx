import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deactivateEmployee } from '@/app/lib/actions/employees';

import Link from "next/link";

export function CreateEmployee(){
    return(
        <Link
            href="/dashboard/employees/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
            <span className="hidden md:block">Create Employee</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    )   
}

export function View({id}: {id: number}){
    return(
        <Link
            href={`/dashboard/employees/${id}/view`}
            className='w-full'
        >
            View
        </Link>
    )
}

export function Edit({id}: {id :number}){
    return(
        <Link 
            href={`/dashboard/employees/${id}/edit`}
            className='w-full'
        >
            Edit
        </Link>
    )
}

export function Deactivate({id}: {id :number}){

    const deactivateEmployeewithId = deactivateEmployee.bind(null,id);
    return(
        <form action={deactivateEmployeewithId}>
            <button>Deactivate</button>
        </form>
    )
}

export function AddBankAccount({id}: {id :number}){
    return(
        <Link 
            href={`/dashboard/employees/${id}/addBank`}
            className='w-full'
        >
            Add Bank Account
        </Link>
    )
}