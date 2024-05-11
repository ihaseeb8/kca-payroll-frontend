'use client';

import { useFormState } from "react-dom";
import React, { useState } from "react";
import Link from 'next/link';
import { updateEmployee } from "@/app/lib/actions/employees";
import { Employee, Designation } from "@/app/lib/definitions";

//utils
import { formattedDOB, avatarFallbackstring } from "@/app/lib/utils";

// React Date Picker
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// shadcn compomnents
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

//icons
import { CalendarDaysIcon, XIcon } from "lucide-react";

// ... other imports ...

export default function 
({
    employee,
    designations
}: {
    employee: Employee
    designations: Designation[]
}) {

  

  const noOfChildren = employee?.employeeChildrenDetails?.length || 0

  const endpoint = process.env.API_URL

  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(updateEmployee, initialState);

  const [haveChildren, setHaveChildren] = useState(false);
  const [children, setChildren] = useState(employee.employeeChildrenDetails);
  const [isMarried, setIsMarried] = useState(employee.isMarried as string);

  // date
  const [value, onChange] = useState<Value>(new Date(employee.dateOfBirth));

  const handleAddChild = () => {
    setChildren([...children, { childName: '', dateOfBirth: '' }]);
  };

  const handleChildNameChange = (e: any, index: any) => {
    const newChildren = [...children];
    newChildren[index].childName = e.target.value;
    setChildren(newChildren);
  };
  
  const handleChildDateOfBirthChange = (date: any, index: any) => {
    const newChildren = [...children];
    newChildren[index].dateOfBirth = date;
    setChildren(newChildren);
  };

  const handleRemoveChild = (index: any) => {
    console.log(index)
    const list = [...children];
    list.splice(index, 1);
    setChildren(list);
  };
  
  return (
    <form action={dispatch}>
      <div className="mx-auto max-w-8xl space-y-6">

        <div className="space-y-2">
          <p className="text-gray-500 dark:text-gray-400">Update the employee's personal and professional details.</p>
        </div>

        <Card>

          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <div className="grid gap-2">
              <Label htmlFor="id">ID</Label>
              <Input id="id" name="id" placeholder="Enter father's name" defaultValue={employee.id} readOnly/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fkDesignationId">Designation</Label>
              <Select name="fkDesignationId" defaultValue={String(employee.fkDesignationId)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {designations.map((designation) => (
                    <SelectItem key={designation.id} value={String(designation.id)}>{designation.designationName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage alt="Employee" src={`${endpoint}${employee.profileImage}`} />
                  <AvatarFallback>{avatarFallbackstring(employee.name)}</AvatarFallback>
                </Avatar>
                <Input id="profileImage" name='profileImage' type="file" />
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter name" defaultValue={employee.name}/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fatherName">Father's Name</Label>
              <Input id="fatherName" name="fatherName" placeholder="Enter father's name" defaultValue={employee.fatherName}/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cnic">CNIC</Label>
              <Input id="cnic" name="cnic" defaultValue={employee.cnic} placeholder="Enter CNIC in the format XXXXX-XXXXXXX-X" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
                
              <DatePicker format="dd-MM-y" className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' name='dateOfBirth' onChange={onChange} value={value} />
                
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" defaultValue={employee.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  {/* <SelectItem value="other">Other</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="marital-status">Marital Status</Label>
                <Select name="isMarried" value={isMarried} onValueChange={(value)=>{setIsMarried(value)}}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">Single</SelectItem>
                    <SelectItem value="Yes">Married</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            <Input id="noOfChildren" defaultValue={noOfChildren} readOnly/>

            <div className="grid gap-2">
              <Label htmlFor="haveChildren">Children</Label>
              <Input id="haveChildren" name="haveChildren" value={employee.haveChildren} hidden readOnly/>
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
              <Input id="emailAddress" name="emailAddress" placeholder="Enter email address" type="email" defaultValue={employee.emailAddress}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input id="mobileNumber" name="mobileNumber" type="number" placeholder="Enter mobile number" defaultValue={employee.mobileNumber}/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="landlineNumber">Landline Number</Label>
              <Input id="landlineNumber" name="landlineNumber" type="number" placeholder="Enter landline number" defaultValue={employee.landlineNumber}/>
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Textarea id="permanentAddress" name="permanentAddress" placeholder="Enter permanent address" defaultValue={employee.permanentAddress}/>
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
              <Input id="emergencyContactName" name="emergencyContactName" placeholder="Enter emergency contact name" defaultValue={employee.emergencyContactName}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="relationOfEmergencyContact">Relationship</Label>
              <Input id="relationOfEmergencyContact" name="relationOfEmergencyContact" placeholder="Enter relationship" defaultValue={employee.relationOfEmergencyContact}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
              <Input id="emergencyContactNumber" name="emergencyContactNumber" type="number" placeholder="Enter emergency contact number" defaultValue={employee.emergencyContactNumber}/>
            </div>
          </CardContent>

        </Card>

        {(isMarried === 'Yes' || employee.haveChildren === 'Yes') && (
 
        <Card>

          <CardHeader>
            <CardTitle>Family Information</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <h5 className="grid col-span-2 font-bold">Spouse Details</h5>

            {isMarried === 'Yes' && (
              <>
                <div className="grid gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="spouseName">Spouse Name</Label>
                  <Input id="spouseName" name="spouseName" placeholder="Enter spouse name" defaultValue={employee.spouseName} />
                </div>
                <div className="grid gap-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="spouseCnic">Spouse CNIC</Label>
                  <Input id="spouseCnic" name="spouseCnic" placeholder="Enter spouse CNIC in the format XXXXX-XXXXXXX-X" defaultValue={employee.spouseCnic}/>
                </div>
              </>
            )}

            <h5 className="grid col-span-2 font-bold">Children Details</h5>
            
            {noOfChildren > 0 && 
              children.map((child, index)=>{
                return(
                    <React.Fragment key={`child${index}`}>
                        <div key={`divchild${index}`} className="flex col-span-2 gap-4">
                          <h6 className="inline-flex">Child {index+1}</h6>
                          <Button type="button" className="inline-flex p-1 h-6" onClick={() => handleRemoveChild(index)}>
                            <XIcon className="h-4 w-4"/>
                          </Button>
                        </div>
                        <div key={`childName${index}`} className="grid gap-2 col-span-2 sm:col-span-1">
                            <Label htmlFor={`childName${index}`}>Name</Label>
                            <Input id={`childName${index}`} name={`childName${index}`} placeholder="Enter child name" value={child.childName} required onChange={(e) => handleChildNameChange(e, index)} />
                        </div>
                        <div key={`childDateOfBirth${index}`} className="grid gap-2 col-span-2 sm:col-span-1">
                            <Label htmlFor={`childDateOfBirth${index}`}>Date of Birth</Label>
                            <DatePicker 
                              format="dd-MM-y" 
                              id={`childDateOfBirth${index}`} 
                              name={`childDateOfBirth${index}`}
                              value={child.dateOfBirth}
                              required
                              onChange={(date) => handleChildDateOfBirthChange(date, index)} 
                              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'/>
                        </div>
                    </React.Fragment>
                )
              })
            }
            <div className="flex justify-center col-span-2">
              <Button type="button" variant={'ghost'} onClick={handleAddChild}>Add another child</Button>
            </div>
            
            
            {/* <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="children">Have Children</Label>
              <div className="flex items-center gap-2">
                <Checkbox id="children" />
                <span>Yes</span>
              </div>
            </div> */}
          </CardContent>

        </Card>

      )}

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </div>
    </form>
  );
}
