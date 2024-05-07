'use client';

import { useFormState } from "react-dom";
import { useState } from "react";
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createEmployee } from "@/app/lib/actions/employees";
import { Designation } from "@/app/lib/definitions";

// ... other imports ...

export default function EmployeeForm({designations}: {designations: Designation[]}) {
  const initialState = { message: null, errors: {} };
  const [isMarried, setIsMarried] = useState(false);

  const [state, dispatch] = useFormState(createEmployee, initialState);

  const [haveChildren, setHaveChildren] = useState(false);
  const [children, setChildren] = useState([{ name: '', dateOfBirth: '' }]);

  const handleAddChild = () => {
    setChildren([...children, { name: '', dateOfBirth: '' }]);
  };

  const handleChildNameChange = (e: any, index: any) => {
    const newChildren = [...children];
    newChildren[index].name = e.target.value;
    setChildren(newChildren);
  };
  
  const handleChildDateOfBirthChange = (e: any, index: any) => {
    const newChildren = [...children];
    newChildren[index].dateOfBirth = e.target.value;
    setChildren(newChildren);
  };

  const handleRemoveChild = (index: any) => {
    const list = [...children];
    list.splice(index, 1);
    setChildren(list);
  };

  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Employees Name */}

        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter employee's name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="desgination-name-error"
              />
            </div>
          </div>
        </div>
        <div id="name-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.name &&
            state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        {/* Employees Date of Birth */}

        <div className="mb-4">
            <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-medium">
                Date of Birth
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    placeholder="Enter employee's date of birth"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="dateOfBirth-error"
                />
                </div>
            </div>
            </div>
            <div id="dateOfBirth-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.dateOfBirth &&
                state.errors.dateOfBirth.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
        </div>

        {/* Employees CNIC */}

        <div className="mb-4">
            <label htmlFor="cnic" className="mb-2 block text-sm font-medium">
                CNIC
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <input
                    id="cnic"
                    name="cnic"
                    type="text"
                    placeholder="Enter employee's CNIC in the format XXXXX-XXXXXXX-X"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="cnic-error"
                />
                </div>
            </div>
            </div>
            <div id="cnic-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.cnic &&
                state.errors.cnic.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
        </div>

        <div className="mb-4">
        <label htmlFor="fatherName" className="mb-2 block text-sm font-medium">
            {"Father's Name"}
        </label>
        <input
            id="fatherName"
            name="fatherName"
            type="text"
            placeholder="Enter father's name"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="fatherName-error"
        />
        </div>
        <div id="fatherName-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.fatherName &&
            state.errors.fatherName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        <div className="mb-4">
          <label htmlFor="fkDesignationId" className="mb-2 block text-sm font-medium">
            {"Employee's Designation"}
          </label>
          <div className="relative">
            <select
              id="fkDesignationId"
              name="fkDesignationId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a designation
              </option>
              {designations.map((designation) => (
                <option key={designation.id} value={designation.id}>
                  {designation.designationName}
                </option>
              ))}
            </select>
          </div>

          <div id="fkDesignationId-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.fkDesignationId &&
            state.errors.fkDesignationId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        </div>

        <div className="mb-4">
        <label htmlFor="emailAddress" className="mb-2 block text-sm font-medium">
            Email Address
        </label>
        <input
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter email address"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="emailAddress-error"
        />
        </div>
        <div id="emailAddress-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.emailAddress &&
            state.errors.emailAddress.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        <div className="mb-4">
        <label htmlFor="permanentAddress" className="mb-2 block text-sm font-medium">
            Permanent Address
        </label>
        <input
            id="permanentAddress"
            name="permanentAddress"
            type="text"
            placeholder="Enter permanent address"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="permanentAddress-error"
        />
        </div>
        <div id="permanentAddress-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.permanentAddress &&
            state.errors.permanentAddress.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        <div className="mb-4">
        <label htmlFor="mobileNumber" className="mb-2 block text-sm font-medium">
            Mobile Number
        </label>
        <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            placeholder="Enter mobile number"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="mobileNumber-error"
        />
        </div>
        <div id="mobileNumber-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.mobileNumber &&
            state.errors.mobileNumber.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        <div className="mb-4">
        <label htmlFor="landlineNumber" className="mb-2 block text-sm font-medium">
            Landline Number
        </label>
        <input
            id="landlineNumber"
            name="landlineNumber"
            type="tel"
            placeholder="Enter landline number (optional)"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="landlineNumber-error"
        />
        </div>
        <div id="landlineNumber-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.landlineNumber &&
            state.errors.landlineNumber.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>

        <div className="mb-4">
            <label htmlFor="profileImage" className="mb-2 block text-sm font-medium">
                Profile Image
            </label>
            <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="profileImage-error"
            />
            </div>
            <div id="profileImage-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.profileImage &&
                state.errors.profileImage.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
        </div>

        <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
            Is Married?
            </label>
            <div>
            <input
                id="marriedYes"
                name="isMarried"
                type="radio"
                value="Yes"
                onChange={(e) => setIsMarried(e.target.value === 'Yes')}
            />
            <label htmlFor="marriedYes" className="ml-2">Yes</label>
            </div>
            <div>
            <input
                id="marriedNo"
                name="isMarried"
                type="radio"
                value="No"
                onChange={(e) => setIsMarried(e.target.value === 'Yes')}
            />
            <label htmlFor="marriedNo" className="ml-2">No</label>
            </div>

            <div id="isMarried-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.isMarried &&
            state.errors.isMarried.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
            </div>
            
        </div>

        {isMarried && (
        <>
          <div className="mb-4">
            <label htmlFor="wifeName" className="mb-2 block text-sm font-medium">
              {"Wife's Name"}
            </label>
            <input
              id="wifeName"
              name="wifeName"
              type="text"
              placeholder="Enter wife's name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="wifeName-error"
            />
          </div>
          <div id="wifeName-error" aria-live="polite" aria-atomic="true" className='mb-4'>
              {state.errors?.wifeName &&
              state.errors.wifeName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                  </p>
              ))}
          </div>

          <div className="mb-4">
            <label htmlFor="wifeCnic" className="mb-2 block text-sm font-medium">
              {"Wife's CNIC"}
            </label>
            <input
              id="wifeCnic"
              name="wifeCnic"
              type="text"
              placeholder="Enter wife's CNIC in the format XXXXX-XXXXXXX-X"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="wifeCnic-error"
            />
          </div>
          <div id="wifeCnic-error" aria-live="polite" aria-atomic="true" className='mb-4'>
              {state.errors?.wifeCnic &&
              state.errors.wifeCnic.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                  </p>
              ))}
          </div>
        </>
        )}

        <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Have Children?
        </label>
        <div>
          <input
            id="haveChildrenYes"
            name="haveChildren"
            type="radio"
            value="Yes"
            onChange={(e) => setHaveChildren(e.target.value === 'Yes')}
          />
          <label htmlFor="haveChildrenYes" className="ml-2">Yes</label>
        </div>
        <div>
          <input
            id="haveChildrenNo"
            name="haveChildren"
            type="radio"
            value="No"
            onChange={(e) => setHaveChildren(e.target.value === 'Yes')}
          />
          <label htmlFor="haveChildrenNo" className="ml-2">No</label>
        </div>
        <div id="haveChildren-error" aria-live="polite" aria-atomic="true" className='mb-4'>
            {state.errors?.haveChildren &&
            state.errors.haveChildren.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
                </p>
            ))}
        </div>
      </div>

      {haveChildren && (
        <>
          {children.map((child, index) => (
            <div key={index}>
              <div className="mb-4">
                <div className="flex justify-between">
                    <label htmlFor={`childName${index}`} className="mb-2 block text-sm font-medium">
                      {"Child's Name"}
                    </label>

                    <button
                    type='button' 
                    className="flex h-6 items-center rounded-lg bg-blue-600 px-4 mb-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={() => handleRemoveChild(index)}>Remove Child</button>
                </div>
                
                <input
                    id={`childName${index}`}
                    name={`childName${index}`}
                    type="text"
                    placeholder="Enter child's name"
                    required
                    value={child.name}
                    onChange={(e) => handleChildNameChange(e, index)}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby={`childName${index}-error`}
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`childDateOfBirth${index}`} className="mb-2 block text-sm font-medium">
                  {"Child's Date of Birth"}
                </label>
                <input
                    id={`childDateOfBirth${index}`}
                    name={`childDateOfBirth${index}`}
                    type="date"
                    required
                    placeholder="Enter child's date of birth"
                    value={child.dateOfBirth}
                    onChange={(e) => handleChildDateOfBirthChange(e, index)}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby={`childDateOfBirth${index}-error`}
                />
              </div>
              
            </div>
          ))}
                <button   
                className="flex mb-4 h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" 
                type="button" 
                onClick={handleAddChild}>Add Another Child</button>
        </>
      )}


        <div className="mb-4">
        <label htmlFor="emergencyContactName" className="mb-2 block text-sm font-medium">
            Emergency Contact Name
        </label>
        <input
            id="emergencyContactName"
            name="emergencyContactName"
            type="text"
            placeholder="Enter emergency contact name"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="emergencyContactName-error"
        />
        </div>

        <div className="mb-4">
        <label htmlFor="relationOfEmergencyContact" className="mb-2 block text-sm font-medium">
            Relation of Emergency Contact
        </label>
        <input
            id="relationOfEmergencyContact"
            name="relationOfEmergencyContact"
            type="text"
            placeholder="Enter relation of emergency contact"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="relationOfEmergencyContact-error"
        />
        </div>

        <div className="mb-4">
        <label htmlFor="emergencyContactNumber" className="mb-2 block text-sm font-medium">
            Emergency Contact Number
        </label>
        <input
            id="emergencyContactNumber"
            name="emergencyContactNumber"
            type="tel"
            placeholder="Enter emergency contact number"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="emergencyContactNumber-error"
        />
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
          href="/dashboard/employees"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Employee</Button>
      </div>
    </form>
  );
}
