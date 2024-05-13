'use client'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toggleStatus } from '@/app/lib/actions/rigs';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function CreateRigLocation() {
  return (
    <Button asChild>
      <Link
        href="/dashboard/rigs/create"
        className="flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="hidden md:block">Create</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
    
  );
}

export function ToggleStatus({ id, status }: { id: number, status: string }) {
  
    const toggleStatuswithId = toggleStatus.bind(null,id,status === 'active' ? 'inactive' : 'active');
  
    return (
      <form action={toggleStatuswithId} className='w-full'>
        <button type="submit" className='w-full text-start px-2 py-1.5'>
          {status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      </form>
    );
}

export function UpdateRigLocation({id}: {id: number}){
  return(
    <Link
      href={`/dashboard/rigs/${id}/edit`}
      className='w-full text-start px-2 py-1.5'
    >
      Edit
    </Link>
  )
}