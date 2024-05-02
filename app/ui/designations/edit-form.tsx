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
import { updateDesignation } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import { Designation } from '@/app/lib/definitions';

export default function Form({
  designation
}: {
  designation: Designation
}) {

  const id = designation.id
  const initialState = { message: null, errors: {} };

  // Define a new function that takes an id and formData, and calls updateDesignation with the correct arguments.
  const updateDesignationWithId = updateDesignation.bind(null,  id)

  const [state, dispatch] = useFormState(updateDesignationWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Designation Name */}
        <div className="mb-4">
          <label htmlFor="designationName" className="mb-2 block text-sm font-medium">
            Designation name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="designationName"
                name="designationName"
                type="text"
                defaultValue={designation.designationName}
                placeholder="Enter designation name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="desgination-name-error"
              />
            </div>
          </div>
        </div>
        <div id="desgination-name-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.designationName &&
            state.errors.designationName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        {/* Designation Short Name */}

        <div className="mb-4">
          <label htmlFor="shortName" className="mb-2 block text-sm font-medium">
            Choose a short name for the designation
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="shortName"
                name="shortName"
                type="text"
                defaultValue={designation.shortName}
                placeholder="Enter designation's short name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='designation-shortname-error'
              />
            </div>
          </div>
        </div>
        <div id="designation-shortname-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.shortName &&
            state.errors.shortName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        {/* Designatio Description */}

        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Choose a short description for the designation
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                defaultValue={designation.description}
                placeholder="Enter designation's description (optional)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='designation-description-error'
              />
            </div>
          </div>
        </div>
        <div id="designation-description-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.description &&
            state.errors.description.map((error: string) => (
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
          href="/dashboard/designations"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Designation</Button>
      </div>
    </form>
  );
}
