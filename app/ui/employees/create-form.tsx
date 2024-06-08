'use client';

import { useFormState } from "react-dom";
import React, { useState } from "react";
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { createEmployee } from "@/app/lib/actions/employees";
import { Designation, RigLocation } from "@/app/lib/definitions";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import { DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu";
import { Radio, XIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
// ... other imports ...

export default function EmployeeForm({ designations, locations }: { designations: Designation[], locations: RigLocation[]}) {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(createEmployee, initialState);

  const [haveChildren, setHaveChildren] = useState("No");
  const [children, setChildren] = useState([{ name: '', gender: '', dateOfBirth: '', cnic: '' }]);
  const [isMarried, setIsMarried] = useState("No");

  const handleAddChild = () => {
    setChildren([...children, { name: '', gender: '', dateOfBirth: '', cnic: '' }]);
  };

  const handleChildNameChange = (e: any, index: any) => {
    const newChildren = [...children];
    newChildren[index].name = e.target.value;
    setChildren(newChildren);
  };

  const handleChildGenderChange = (e: any, index: any) => {
    const newChildren = [...children];
    newChildren[index].gender = e.target.value;
    setChildren(newChildren);
  };

  const handleChildDateOfBirthChange = (e: any, index: any) => {
    const newChildren = [...children];
    newChildren[index].dateOfBirth = e;
    setChildren(newChildren);
  };

  const handleChildCnicChange = (e: any, index: any) => {
    const newChildren = [...children];
    newChildren[index].cnic = e.target.value;
    setChildren(newChildren);
  };

  const handleRemoveChild = (index: any) => {
    const list = [...children];
    list.splice(index, 1);
    setChildren(list);
  };



  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [dob, onDobChange] = useState<Value>();
  const [dateOfJoining, onDateOfJoiningChange] = useState<Value>();
  const [dateOfDeployment, onDateOfDeploymentChange] = useState<Value>();
  const [spouseDateOfBirth, onSpouseDobChange] = useState<Value>()
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };




  return (
    <form action={dispatch}>
      <div className="mx-auto max-w-8xl space-y-6 overflow-hidden">

        {/* Employees ID */}

        <Card>

          <CardHeader>
            <CardTitle>Employee Joining Information</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <div className="grid gap-2">
              <Label htmlFor="id">ID</Label>
              <Input id="id"
                name="id"
                type="number"
                placeholder="Enter employee's number/id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="desgination-name-error" />
              <div id="id-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.id &&
                  state.errors.id.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>


            <div className="grid gap-2">
              <Label htmlFor="fkDesignationId">Designation</Label>
              <Select name="fkDesignationId">
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {designations.map((designation) => (
                    <SelectItem key={designation.id} value={String(designation.id)}>
                      {designation.designationName}
                    </SelectItem>
                  ))}


                </SelectContent>
              </Select>
              <div id="fkDesignationId-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.fkDesignationId &&
                  state.errors.fkDesignationId.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateOfJoining">Date of Joining</Label>

              <DatePicker format="dd-MM-y" className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' name='dateOfJoining' onChange={onDateOfJoiningChange} value={dateOfJoining} />
              <div id="dateOfJoining-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.dateOfJoining &&
                  state.errors.dateOfJoining.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="joiningLetter">Joining Letter</Label>

              <Input type="file" id="joiningLetter" name="joiningLetter" />

              <div id="joiningLetter-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.joiningLetter &&
                  state.errors.joiningLetter.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="basicSalary">Basic Salary</Label>

              <Input type="number" id="basicSalary" name="basicSalary" placeholder="Enter Basic Salary in PKR"/>

              <div id="basicSalary-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.basicSalary &&
                  state.errors.basicSalary.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="percentage">Percentage</Label>

              <Input type="number" id="percentage" name="percentage" step="0.01" placeholder="Enter Percentage upto two decimal points"/>

              <div id="percentage-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.percentage &&
                  state.errors.percentage.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="rotation">Rotation</Label>

              <Input type="text" id="rotation" name="rotation" placeholder="On Days : Off Days" />

              <div id="rotation-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.rotation &&
                  state.errors.rotation.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
   
          </CardContent>

        </Card>

        <Card>
          <CardHeader>
            <CardTitle>First Deployment Information</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <div className="grid gap-2">
              <Label htmlFor="dateOfDeployment">Date of Deployment</Label>

              <DatePicker format="dd-MM-y" className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' name='dateOfDeployment' onChange={onDateOfDeploymentChange} value={dateOfDeployment} />
              <div id="dateOfDeployment-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.dateOfDeployment &&
                  state.errors.dateOfDeployment.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fkLocationId">Location</Label>
              <Select name="fkLocationId">
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={String(location.id)}>
                      {location.locationName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div id="fkLocationId-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.fkLocationId &&
                  state.errors.fkLocationId.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="travelAllowance">Travel Allowance</Label>
              <Input id="travelAllowance" name="travelAllowance" type="number" placeholder="Enter Travel Allowance in PKR" />
              <div id="travelAllowance-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.travelAllowance &&
                  state.errors.travelAllowance.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="hardshipAllowance">Hardship Allowance</Label>
              <Input id="hardshipAllowance" name="hardshipAllowance" type="number" placeholder="Enter Hardship Allowance in PKR" />
              <div id="hardshipAllowance-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.hardshipAllowance &&
                  state.errors.hardshipAllowance.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            

          </CardContent>
        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Bank Account Information</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" name="bankName" placeholder="Enter bank name" />
              <div id="bankName-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.bankName &&
                  state.errors.bankName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">IBAN Number</Label>
              <Input id="accountNumber" name="accountNumber" placeholder="Enter 24 digits iban" />
              <div id="accountNumber-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.accountNumber &&
                  state.errors.accountNumber.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </CardContent>

        </Card>


        <Card>

          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <div className="grid gap-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {imagePreviewUrl ? (
                    <AvatarImage src={imagePreviewUrl} alt="Employee" />
                  ) : (
                    <AvatarFallback>Avatar</AvatarFallback>
                  )}
                </Avatar>
                <Input id="profileImage" name="profileImage" type="file" onChange={handleImageChange} />
              </div>
              <div id="profileImage-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.profileImage &&
                  state.errors.profileImage.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>


            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter name" />
              <div id="name-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>


            <div className="grid gap-2">
              <Label htmlFor="fatherName">{"Father's Name"}</Label>
              <Input id="fatherName" name="fatherName" placeholder="Enter father's name" />
              <div id="fatherName-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.fatherName &&
                  state.errors.fatherName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cnic">CNIC</Label>
              <Input id="cnic" name="cnic" placeholder="Enter CNIC in the format XXXXX-XXXXXXX-X" />
              <div id="cnic-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.cnic &&
                  state.errors.cnic.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>

              <DatePicker format="dd-MM-y" className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' name='dateOfBirth' onChange={onDobChange} value={dob} />
              <div id="dateOfBirth-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.dateOfBirth &&
                  state.errors.dateOfBirth.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender">
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  {/* <SelectItem value="other">Other</SelectItem> */}
                </SelectContent>
              </Select>
              <div id="gender-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.gender &&
                  state.errors.gender.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

          </CardContent>

        </Card>


        <Card>

          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input id="emailAddress" name="emailAddress" placeholder="Enter email address" type="email" />
              <div id="emailAddress-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.emailAddress &&
                  state.errors.emailAddress.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input id="mobileNumber" name="mobileNumber" type="text" placeholder="Enter mobile number" />
              <div id="mobileNumber-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.mobileNumber &&
                  state.errors.mobileNumber.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="landlineNumber">Landline Number</Label>
              <Input id="landlineNumber" name="landlineNumber" type="text" placeholder="Enter landline number" />
              <div id="mobileNumber-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.landlineNumber &&
                  state.errors.landlineNumber.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="currentAddress">Current Address</Label>
              <Textarea id="currentAddress" name="currentAddress" placeholder="Enter current address" />
              <div id="permanentAddress-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.currentAddress &&
                  state.errors.currentAddress.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Textarea id="permanentAddress" name="permanentAddress" placeholder="Enter permanent address" />
              <div id="permanentAddress-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.permanentAddress &&
                  state.errors.permanentAddress.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input id="emergencyContactName" name="emergencyContactName" placeholder="Enter emergency contact name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="relationOfEmergencyContact">Relationship</Label>
              <Input id="relationOfEmergencyContact" name="relationOfEmergencyContact" placeholder="Enter relationship" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
              <Input id="emergencyContactNumber" name="emergencyContactNumber" type="text" placeholder="Enter emergency contact number" />
            </div>
          </CardContent>

        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Family Information</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="grid gap-2">
              <Label htmlFor="marital-status">Is Married ?</Label>
              <Select name="isMarried" onValueChange={(value) => { setIsMarried(value) }}>
                <SelectTrigger>
                  <SelectValue placeholder="Is Married?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
              <div id="isMarried-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.isMarried &&
                  state.errors.isMarried.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {isMarried === 'Yes' && (
              <>

                <h5 className="grid col-span-2 font-bold">Spouse Details</h5>

                <div className="grid gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="spouseName">Spouse Name</Label>
                  <Input id="spouseName" name="spouseName" placeholder="Enter spouse name" />
                  <div id="spouseName-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                    {state.errors?.spouseName &&
                      state.errors.spouseName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="grid gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="spouseGender">Gender</Label>
                  <Select name="spouseGender">
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      {/* <SelectItem value="other">Other</SelectItem> */}
                    </SelectContent>
                  </Select>
                  <div id="spouseGender-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                    {state.errors?.spouseGender &&
                      state.errors.spouseGender.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>

                </div>
                <div className="grid gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="spouseCnic">Spouse CNIC</Label>
                  <Input id="spouseCnic" name="spouseCnic" placeholder="Enter spouse CNIC in the format XXXXX-XXXXXXX-X" />
                  <div id="spouseCnic-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                    {state.errors?.spouseCnic &&
                      state.errors.spouseCnic.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="grid gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="spouseDateOfBirth">Spouse Date of Birth</Label>

                  <DatePicker format="dd-MM-y" className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' name='spouseDateOfBirth' onChange={onSpouseDobChange} value={spouseDateOfBirth} />
                  <div id="spouseDateOfBirth-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                    {state.errors?.spouseDateOfBirth &&
                      state.errors.spouseDateOfBirth.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </>
            )}

            <div className="grid gap-2">
              <Label htmlFor="haveChildren">Have Children ?</Label>
              <Select name="haveChildren" onValueChange={(value) => {
                setHaveChildren(value);
                if (value === 'No') {
                  setChildren([]); // Optionally clear children when "No" is selected
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Have Children?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
              <div id="haveChildren-error" aria-live="polite" aria-atomic="true" className='mb-4'>
                {state.errors?.haveChildren &&
                  state.errors.haveChildren.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>


            {haveChildren === 'Yes' && (
              <>
                <h5 className="grid col-span-2 font-bold">Children Details</h5>

                {children.map((child, index) => (
                  <React.Fragment key={`child${index}`}>
                    <div key={`divchild${index}`} className="flex col-span-2 gap-4">
                      <h6 className="inline-flex">Child {index + 1}</h6>
                      <Button type="button" className="inline-flex p-1 h-6" onClick={() => handleRemoveChild(index)}>
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-2 col-span-2 sm:col-span-1">
                      <Label htmlFor={`childName${index}`}>Name</Label>

                      <Input id={`childName${index}`}
                        onChange={(e) => handleChildNameChange(e, index)}
                        name={`childName${index}`} placeholder="Enter Child Name" required/>

                    </div>
                    <div className="grid gap-2 col-span-2 sm:col-span-1">
                      <Label htmlFor={`childGender${index}`}>Gender</Label>
                      <Select name={`childGender${index}`} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem onChange={(e) => handleChildGenderChange(e, index)} value="Male">Male</SelectItem>
                          <SelectItem onChange={(e) => handleChildGenderChange(e, index)} value="Female">Female</SelectItem>
                          {/* <SelectItem value="Other">Other</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2 col-span-2 sm:col-span-1">
                      <Label htmlFor={`childCnic${index}`}>B-Form/CNIC</Label>
                      <Input id={`childCnic${index}`}
                        onChange={(e) => handleChildCnicChange(e, index)}
                        name={`childCnic${index}`} required placeholder="Enter child CNIC in the format XXXXX-XXXXXXX-X" />
                    </div>
                    <div className="grid gap-2 col-span-2 sm:col-span-1">
                      <Label htmlFor={`childDateOfBirth${index}`}>Date of Birth</Label>
                      <DatePicker
                        required
                        format="dd-MM-y"
                        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                        name={`childDateOfBirth${index}`}
                        onChange={(date) => handleChildDateOfBirthChange(date, index)}
                        value={children[index].dateOfBirth}
                      />
                    </div>
                  </React.Fragment>
                ))}
                <div className="flex justify-center col-span-2">
                  <Button type="button" onClick={handleAddChild}>Add another child</Button>
                </div>
              </>
            )}



          </CardContent>

        </Card>

        

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
            href="/dashboard/employees"
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
