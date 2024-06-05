import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deactivateEmployee } from '@/app/lib/actions/employees';
import { Button } from '@/components/ui/button';
import Link from "next/link";

export function CreateEmployee(){
    return(
        <Button asChild>
            <Link
                href="/dashboard/employees/create"
                className="flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                <span className="hidden md:block">Create</span>{' '}
                <PlusIcon className="h-5 md:ml-4" />
            </Link>
        </Button>
    )   
}

export function View({id}: {id: number}){
    return(
        <Link
            href={`/dashboard/employees/${id}/view`}
            className='w-full text-start px-2 py-1.5'
        >
            View
        </Link>
    )
}

export function Edit({id}: {id :number}){
    return(
        <Link 
            href={`/dashboard/employees/${id}/edit`}
            className='w-full text-start px-2 py-1.5'
        >
            Edit
        </Link>
    )
}

export function Deactivate({id}: {id :number}){

    const deactivateEmployeewithId = deactivateEmployee.bind(null,id);
    return(
        <form action={deactivateEmployeewithId} className='w-full'>
            <button type="submit" className='w-full text-start px-2 py-1.5'>
                Deactivate
            </button>
        </form>
    )
}

export function AddBankAccount({id}: {id :number}){
    return(
        <Link 
            href={`/dashboard/employees/${id}/addBank`}
            className='w-full text-start px-2 py-1.5'
        >
            Add Bank Account
        </Link>
    )
}

export function Bonuses({id}: {id :number}){
    return(
        <Link 
            href={`/dashboard/employees/${id}/bonuses`}
            className='w-full text-start px-2 py-1.5'
        >
            Bonuses
        </Link>
    )
}

export function Expenses({id}: {id :number}){
    return(
        <Link 
            href={`/dashboard/employees/${id}/expenses`}
            className='w-full text-start px-2 py-1.5'
        >
            Expenses
        </Link>
    )
}

export function Promote({id}: {id :number}){
    return(
        <Link 
            href={`/dashboard/employees/${id}/promote`}
            className='w-full text-start px-2 py-1.5'
        >
            Promote
        </Link>
    )
}