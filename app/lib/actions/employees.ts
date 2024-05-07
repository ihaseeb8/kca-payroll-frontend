'use server';

import {z} from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// fetching endpoint form env
const endpoint = process.env.API_URL;


// ------------------------------------- Create Employee
const EmployeeFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    dateOfBirth: z.date().refine(date => date <= new Date(), {message: 'Date of Birth cannot be in the future'}),
    cnic: z.string()
      .refine(cnic => /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(cnic), "Missing/Invalid CNIC. Please enter in the format XXXXX-XXXXXXX-X"),
    fatherName: z.string().min(1, "Father's Name is required"),
    fkDesignationId: z.string({ invalid_type_error: 'This field is required'}),
    emailAddress: z.string().email('Missing/Invalid email'),
    permanentAddress: z.string().min(1, 'Permanent Address is required'),
    mobileNumber: z.string().min(1, "Mobile number is required"),
    landlineNumber: z.string(),
    profileImage: z.any()
    .refine(file => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
    isMarried: z.enum(["Yes","No"]),
    haveChildren: z.enum(["Yes", "No"]),
    emergencyContactName: z.string(),
    relationOfEmergencyContact: z.string(),
    emergencyContactNumber: z.string()
  })
  
  const EmployeeWifeSchema = z.object({
    wifeName: z.string().min(1, 'Name is required'),
    wifeCnic: z.string()
      .refine(cnic => /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(cnic), "Missing/Invalid CNIC. Please enter in the format XXXXX-XXXXXXX-X"),
  })
  
  const EmployeeChildSchema = z.object({
    childName: z.string().min(1, 'Name is required'),
    dateOfBirth: z.date().refine(date => date <= new Date(), {message: 'Date of Birth cannot be in the future'}),
  })
  
  export type EmployeeFormState = {
    errors?: {
      name?: string[];
      dateOfBirth?: string[];
      cnic?: string[];
      fkDesignationId?: string[];
      fatherName?: string[];
      emailAddress?: string[];
      permanentAddress?: string[];
      mobileNumber?: string[];
      landlineNumber?: string[];
      profileImage?: string[];
      isMarried?: string[];
      wifeCnic?: string[];
      wifeName?: string[];
      haveChildren?: string[];
    };
    message?: string | null;
  };
  
  export async function createEmployee(prevState: EmployeeFormState, formData: FormData) {
    noStore();
  
    // validate form fields using Zod
    const validatedFields = EmployeeFormSchema.safeParse({
      name: formData.get('name'),
      dateOfBirth: new Date(formData.get('dateOfBirth') as string),
      cnic: formData.get('cnic'),
      fatherName: formData.get('fatherName'),
      fkDesignationId: formData.get('fkDesignationId'),
      emailAddress: formData.get('emailAddress'),
      permanentAddress: formData.get('permanentAddress'),
      mobileNumber: formData.get('mobileNumber'),
      landlineNumber: formData.get('landlineNumber'),
      profileImage: formData.get('profileImage'),
      isMarried: formData.get('isMarried'),
      haveChildren: formData.get('haveChildren'),
      emergencyContactName: formData.get('emergencyContactName'),
      relationOfEmergencyContact: formData.get('relationOfEmergencyContact'),
      emergencyContactNumber: formData.get('emergencyContactNumber')
    })
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Employee.',
      };
    }
  
    let reqbody: any = {...validatedFields.data}
  
    if(validatedFields.data.isMarried === 'Yes'){
      const validateWifeFields = EmployeeWifeSchema.safeParse({
        wifeCnic: formData.get('wifeCnic'),
        wifeName: formData.get('wifeName')
      })
  
      if (!validateWifeFields.success) {
        return {
          errors: validateWifeFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Employee.',
        };
      }
      
      reqbody = {...validatedFields.data, ...validateWifeFields.data}
    }
  
    
  
    if(validatedFields.data.haveChildren === 'Yes'){
      // Extract all the children from formData
      let children = [];
      for (let i = 0; formData.has(`childName${i}`) && formData.has(`childDateOfBirth${i}`); i++) {
        children.push({
          childName: formData.get(`childName${i}`),
          dateOfBirth: new Date(formData.get(`childDateOfBirth${i}`) as string),
        });
      }
  
      reqbody["employeeChildren"] = children
    }
  
  
    try {
      const response = await fetch(`${endpoint}/api/employees/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqbody)
      });
  
      const body = await response.json()
      console.log(body)
      
      if (!response.ok) {
        throw new Error(`${body?.message}`);
      }
  
    } catch (error: any) {
      console.log(error.message)
      return {
        message: error.message,
      };
    }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/employees');
    redirect('/dashboard/employees')
  
  }


  // ---------------------------------- Data Fetching --------------------------------------
  export async function fetchEmployeesPages(pageSize: number = 10, name: string = '' , cnic: string = '', mobileNumber: string = '' , status = ''){
    noStore();

    let endpointWithQuery = `${endpoint}/api/employees?pageSize=${pageSize}`;

    if (name) endpointWithQuery += `&name=${name}`
    if (cnic) endpointWithQuery += `&cnic=${cnic}`
    if (mobileNumber) endpointWithQuery += `&mobileNumber=${mobileNumber}`
    if (status) endpointWithQuery += `&status=${status}`
    
    try{
        const response = await fetch(endpointWithQuery)

        const body = await response.json();
        
        return (body?.data?.totalPages || 0)

    } catch (e){
        console.error(e)
        throw new Error('Failed to fetch employees pages')
    }

  }

  export async function fetchEmployees(pageSize: number = 10, currentPage: number = 1, name: string = '' , cnic: string = '', mobileNumber: string = '' , status = ''){
    noStore();

    let endpointWithQuery = `${endpoint}/api/employees?pageSize=${pageSize}&currentPage=${currentPage}`;

    if (name) endpointWithQuery += `&name=${name}`
    if (cnic) endpointWithQuery += `&cnic=${cnic}`
    if (mobileNumber) endpointWithQuery += `&mobileNumber=${mobileNumber}`
    if (status) endpointWithQuery += `&status=${status}`
    
    try{
        const response = await fetch(endpointWithQuery)

        const body = await response.json();

        return (body?.data?.employees || [])

    } catch (e){
        console.error(e)
        throw new Error('Failed to fetch employees pages')
    }

  }

  