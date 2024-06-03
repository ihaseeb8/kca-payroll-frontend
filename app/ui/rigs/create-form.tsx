'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { createInvoice } from '@/app/lib/actions';
import { CreateRigLocation } from '@/app/lib/actions/rigs';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

export default function Form() {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(CreateRigLocation, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Location Name*/}
        <div className="mb-4">
          <label htmlFor="locationName" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="locationName"
                name="locationName"
                type="text"
                placeholder="Enter Rig Base"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="locationName-error"
              />
            </div>
          </div>
        </div>
        <div id="rigBase-error" aria-live="polite" aria-atomic="true" className='mb-4'>
          {state.errors?.locationName &&
            state.errors.locationName.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Location Type */}

        <div className="mb-4">
          <label htmlFor="locationType" className="mb-2 block text-sm font-medium">
            Type
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              {/* <input
                id="locationType"
                name="locationType"
                type="text"
                placeholder="Enter Rig Base Office"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='rigBaseOffice-error'
              /> */}
              <input
                id="rig"
                name="locationType"
                type="radio"
                value="Rig"
                className="peer mr-2"
                aria-describedby="rigBaseOffice-error"
              />
              <label htmlFor="rig" className="mr-4">Rig</label>

              <input
                id="office"
                name="locationType"
                type="radio"
                value="Office"
                className="peer mr-2"
                aria-describedby="rigBaseOffice-error"
              />
              <label htmlFor="office" className="mr-4">Office</label>
            </div>
          </div>
        </div>
        <div id="locationType-error" aria-live="polite" aria-atomic="true" className='mb-4'>
          {state.errors?.locationType &&
            state.errors.locationType.map((error: string) => (
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
      <div className="mt-6 flex justify-center gap-4">
        <Button asChild variant={'outline'}>
          <Link
            href="/dashboard/rigs"
            className="flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors"
          >
            Cancel
          </Link>
        </Button>

        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
