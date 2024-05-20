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
import { updateBankDetails } from '@/app/lib/actions/banks';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import { BankDetails } from '@/app/lib/definitions';

export default function Form({
  bankDetail
}: {
  bankDetail: BankDetails
}) {

  console.log(bankDetail)

  const id = bankDetail.id
  const initialState = { message: null, errors: {} };

  // Define a new function that takes an id and formData, and calls updateDesignation with the correct arguments.
  const updateBankDetailsWithId = updateBankDetails.bind(null, id)

  const [state, dispatch] = useFormState(updateBankDetailsWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Account Holder Number*/}

        <div className="mb-4">
          <label htmlFor="fkEmployeeId" className="mb-2 block text-sm font-medium">
            Employee Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fkEmployeeId"
                name="fkEmployeeId"
                type="text"
                readOnly
                defaultValue={bankDetail.fkEmployeeId}
                placeholder="Enter Account Number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='fkEmployeeId-error'
              />
            </div>
          </div>
        </div>
        <div id="fkEmployeeId-error" aria-live="polite" aria-atomic="true" className='mb-4'>
          {state.errors?.fkEmployeeId &&
            state.errors.fkEmployeeId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Account Holder Name*/}
        <div className="mb-4">
          <label htmlFor="fkEmployeeId" className="mb-2 block text-sm font-medium">
            Employee Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fkEmployeeId"
                name="fkEmployeeId"
                type="text"
                readOnly
                defaultValue={bankDetail.bankUser.name}
                placeholder="Enter Account Number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='fkEmployeeId-error'
              />
            </div>
          </div>
        </div>
        <div id="fkEmployeeId-error" aria-live="polite" aria-atomic="true" className='mb-4'>
          {state.errors?.fkEmployeeId &&
            state.errors.fkEmployeeId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>


        {/* Bank Name */}
        <div className="mb-4">
          <label htmlFor="bankName" className="mb-2 block text-sm font-medium">
            Bank Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="bankName"
                name="bankName"
                type="text"
                defaultValue={bankDetail.bankName}
                placeholder="Enter Bank Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="bankName-error"
              />
            </div>
          </div>
        </div>
        <div id="bankName-error" aria-live="polite" aria-atomic="true" className='mb-4'>
          {state.errors?.bankName &&
            state.errors.bankName.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Account Number */}

        <div className="mb-4">
          <label htmlFor="accountNumber" className="mb-2 block text-sm font-medium">
            Account Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                defaultValue={bankDetail.accountNumber}
                placeholder="Enter Account Number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='accountNumber-error'
              />
            </div>
          </div>
        </div>
        <div id="accountNumber-error" aria-live="polite" aria-atomic="true" className='mb-4'>
          {state.errors?.accountNumber &&
            state.errors.accountNumber.map((error: string) => (
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
        <Button type="submit">Update Bank Account</Button>
      </div>
    </form>
  );
}
