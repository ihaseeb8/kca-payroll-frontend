'use client';

import Link from 'next/link';
import { PromoteEmployee } from '@/app/lib/actions/promotions';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import { Employee, Designation } from '@/app/lib/definitions';

import { avatarFallbackstring } from '@/app/lib/utils';

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"


import {z} from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"


export default function Form({
    employee,
    designations
} : {
    employee: Employee
    designations: Designation[]
}) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(PromoteEmployee, initialState);
  const endpoint = process.env.API_URL

  return (
    <main className="w-full max-w-3xl mx-auto py-12 px-4 md:px-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="Employee Photo" src={`${endpoint}${employee.profileImage}`} />
          <AvatarFallback>{avatarFallbackstring(employee.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{employee.name}</h1>
          <div className="text-gray-500 dark:text-gray-400">
            <p>ID: {employee.id}</p>
            <p>{employee.gender}</p>
          </div>
        </div>
      </div>
      <Separator className="my-8" />

      <form action={dispatch} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          
          <div className='flex flex-col gap-2'>
            <Label htmlFor="Prev-Designation">Current Designation</Label>
            <Input id="Prev-Designation" readOnly value={employee.designations.designationName}/>
          </div>


             {/* read only and hidden */}
            <input id="id" name='id' hidden readOnly value={employee.id}/>
            <input id="fkPrevDesignationId" name='fkPrevDesignationId' hidden readOnly value={employee.designations.id}/>
          

          <div className='flex flex-col gap-2'>
            <Label htmlFor="fkPromotedDesignationId">New Designation</Label>
            <Select name="fkPromotedDesignationId">
              <SelectTrigger>
                <SelectValue placeholder="Select new designation" />
              </SelectTrigger>
              <SelectContent>
                  {designations.map((designation) => (
                    <SelectItem key={designation.id} value={String(designation.id)}>
                      {designation.designationName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div id="fkPromotedDesignationId-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.fkPromotedDesignationId &&
                  state.errors.fkPromotedDesignationId.map((error: string) => (
                    <p className="mt-1 ml-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor="incrementLetter">Increment Letter</Label>
          <Input id="incrementLetter" name='incrementLetter' type="file" />
          <div id="incrementLetter-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.incrementLetter &&
                  state.errors.incrementLetter.map((error: string) => (
                    <p className="mt-1 ml-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor="incrementSalary">Increment Salary</Label>
          <Input id="incrementSalary" name='incrementSalary' placeholder="Enter new salary" type="number" min='1'/>
          <div id="incrementSalary-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.incrementSalary &&
                  state.errors.incrementSalary.map((error: string) => (
                    <p className="mt-1 ml-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit">
            Promote Employee
          </Button>
        </div>
      </form>
    </main>
  );
}
