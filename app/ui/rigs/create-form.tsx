'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';
import { CreateRigLocation } from '@/app/lib/actions/rigs';
import { useFormState } from 'react-dom';
import clsx from 'clsx';

export default function Form() {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(CreateRigLocation, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Rig Base*/}
        <div className="mb-4">
          <label htmlFor="rigBase" className="mb-2 block text-sm font-medium">
            Rig Base
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="rigBase"
                name="rigBase"
                type="text"
                placeholder="Enter Rig Base"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="rigBase-error"
              />
            </div>
          </div>
        </div>
        <div id="rigBase-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.rigBase &&
            state.errors.rigBase.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        {/* Rig Base Office */}

        <div className="mb-4">
          <label htmlFor="rigBaseOffice" className="mb-2 block text-sm font-medium">
           Rig Base Office
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="rigBaseOffice"
                name="rigBaseOffice"
                type="text"
                placeholder="Enter Rig Base Office"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='rigBaseOffice-error'
              />
            </div>
          </div>
        </div>
        <div id="rigBaseOffice-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.rigBaseOffice &&
            state.errors.rigBaseOffice.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>


     
        <div id="form-response" aria-live="polite" aria-atomic="true" className='mb-4 md:flex justify-center'>
            {state.message && (
                <p className={"mt-4 text-lg text-red-500"} >
                {state.message}
                </p>
            )}
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/rigs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Rig Location</Button>
      </div>
    </form>
  );
}
