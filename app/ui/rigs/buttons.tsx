'use client'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deactivateRigLocation } from '@/app/lib/actions/rigs';
import React, { useState } from 'react';

export function CreateRigLocation() {
  return (
    <Link
      href="/dashboard/rigs/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Rig Location</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeactivateRigLocation({ id, rigStatus }: { id: number, rigStatus: string }) {
    const [currentStatus, setCurrentStatus] = useState(rigStatus);
    
    const toggleStatus = () => {
      return currentStatus === 'active' ? 'inactive' : 'active';
    };
  
    const deactivateRigLocationwithId = async (e: any) => {
      e.preventDefault();
      const newStatus = toggleStatus();
       await deactivateRigLocation(id, newStatus);
      setCurrentStatus(newStatus); // Update the status after API call
    };
  
    return (
      <form onSubmit={deactivateRigLocationwithId}>
        <button type="submit">
          {currentStatus === 'active' ? 'Deactivate Rig Location' : 'Activate Rig Location'}
        </button>
      </form>
    );
  }

export function UpdateRigLocation({id}: {id: number}){
  return(
    <Link
      href={`/dashboard/rigs/${id}/edit`}
    >
      Edit Rig Location
    </Link>
  )
}