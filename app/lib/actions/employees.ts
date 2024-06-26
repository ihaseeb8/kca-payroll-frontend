'use server';

import { z } from 'zod'
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
  id: z.coerce.number().min(1, 'Invalid/Missing Field').max(999999, 'Employee number cannot be longer than 6 characters.'),
  name: z.string().min(1, 'Name is required'),
  gender: z.enum(["Male", "Female"]),
  dateOfBirth: z.date().refine(date => date <= new Date(), { message: 'Date of Birth cannot be in the future' }),
  cnic: z.string()
    .refine(cnic => /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(cnic), "Missing/Invalid CNIC. Please enter in the format XXXXX-XXXXXXX-X"),
  fatherName: z.string().min(1, "Father's Name is required"),
  fkDesignationId: z.string().min(1, 'This field is required'),
  emailAddress: z.string().email('Missing/Invalid email'),
  currentAddress: z.string().min(1, 'Current Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required'),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  landlineNumber: z.string(),
  profileImage: z.any()
    .refine(file => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
  isMarried: z.enum(["Yes", "No"], {required_error: 'Marital Status is required'}),
  haveChildren: z.enum(["Yes", "No"], {required_error: 'Children Information is required'}),
  emergencyContactName: z.string(),
  relationOfEmergencyContact: z.string(),
  emergencyContactNumber: z.string(),

  //Bank information
  bankName: z.string().min(1, 'Bank Name is required'),
  accountNumber: z.string().refine(iban => iban.length === 24, 'IBAN must be exactly 24 characters long'),
  
  // Joining Information
  dateOfJoining: z.string().refine(date => date !== '', { message: 'Date of Joining is required' }),
  joiningLetter: z.any().refine(file => file instanceof File && file.name !=='undefined', 'Joining letter is required'),
  basicSalary: z.string().min(1, 'Basic Salary is required').refine(value => {
    const number = parseFloat(value);
    return !isNaN(number) && number > 0;
  }, 'Basic Salary must be a positive number'),
  percentage: z.string().min(1, 'Percentage is required').refine(value => {
    const number = parseFloat(value);
    return !isNaN(number) && number >= 0 && number <= 100 && /^\d+(\.\d{1,2})?$/.test(value);
  }, 'Percentage must be between 0 and 100 and have up to two decimal points'),
  rotation: z.string().min(1, 'Rotation is required').refine(value => {
    return /^[0-9]+:[0-9]+$/.test(value);
  }, 'Rotation must be in the format number:number'),

  // First Delpoyment
  dateOfDeployment: z.string().refine(date => date !== '', { message: 'Date of Deployment is required' }),
  fkLocationId: z.string().refine(value => value !== '', { message: 'Location is required'}),
  travelAllowance: z.string().min(1, 'Travel Allowance is required').refine(value => {
    const number = parseFloat(value);
    return !isNaN(number) && number > 0;
  }, 'Travel Allowance must be a positive number'),
  hardshipAllowance: z.string().min(1, 'Hardship Allowance is required').refine(value => {
    const number = parseFloat(value);
    return !isNaN(number) && number > 0;
  }, 'Hardship Allowance must be a positive number'),

})

const EmployeeSpouseSchema = z.object({
  spouseName: z.string().min(1, 'Name is required'),
  spouseGender: z.enum(["Male", "Female"], {required_error: 'Spouse Gender is required'}),
  spouseCnic: z.string()
    .refine(cnic => /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(cnic), "Missing/Invalid CNIC. Please enter in the format XXXXX-XXXXXXX-X"),
  spouseDateOfBirth: z.string().refine(date => date !== '', { message: 'Date of Birth is required' }),

})

const EmployeeChildSchema = z.object({
  childName: z.string().min(1, 'Name is required'),
  childGender: z.enum(["Male", "Female"]),
  dateOfBirth: z.date().refine(date => date <= new Date(), { message: 'Date of Birth cannot be in the future' }),
  childCnic: z.string()
    .refine(cnic => /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(cnic), "Missing/Invalid CNIC. Please enter in the format XXXXX-XXXXXXX-X"),
})

export type EmployeeFormState = {
  errors?: {
    id?: string[];
    name?: string[];
    gender?: string[];
    dateOfBirth?: string[];
    cnic?: string[];
    fkDesignationId?: string[];
    fatherName?: string[];
    emailAddress?: string[];
    currentAddress?: string[];
    permanentAddress?: string[];
    mobileNumber?: string[];
    landlineNumber?: string[];
    profileImage?: string[];
    isMarried?: string[];
    spouseCnic?: string[];
    spouseGender?: string[];
    spouseName?: string[];
    spouseDateOfBirth?: string[];
    haveChildren?: string[];
    bankName?: string[];
    accountNumber?: string[];
    dateOfJoining?: string[];
    joiningLetter?: string[];
    basicSalary?: string[];
    percentage?: string[];
    rotation?: string[];
    dateOfDeployment?: string[];
    fkLocationId?: string[];
    travelAllowance?: string[];
    hardshipAllowance?: string[];
  };
  message?: string | null;
};

export async function createEmployee(prevState: EmployeeFormState, formData: FormData) {
  noStore();

  console.log(formData)

  // validate form fields using Zod
  const validatedFields = EmployeeFormSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    gender: formData.get('gender') || undefined,
    dateOfBirth: new Date(formData.get('dateOfBirth') as string),
    cnic: formData.get('cnic'),
    fatherName: formData.get('fatherName'),
    fkDesignationId: formData.get('fkDesignationId'),
    emailAddress: formData.get('emailAddress'),
    currentAddress: formData.get('currentAddress'),
    permanentAddress: formData.get('permanentAddress'),
    mobileNumber: formData.get('mobileNumber'),
    landlineNumber: formData.get('landlineNumber'),
    profileImage: formData.get('profileImage'),
    isMarried: formData.get('isMarried') || undefined,
    haveChildren: formData.get('haveChildren') || undefined,
    emergencyContactName: formData.get('emergencyContactName'),
    relationOfEmergencyContact: formData.get('relationOfEmergencyContact'),
    emergencyContactNumber: formData.get('emergencyContactNumber'),
    bankName: formData.get('bankName'),
    accountNumber: formData.get('accountNumber'),
    dateOfJoining: formData.get('dateOfJoining'),
    joiningLetter: formData.get('joiningLetter'),
    basicSalary: formData.get('basicSalary'),
    percentage: formData.get('percentage'),
    rotation: formData.get('rotation'),
    dateOfDeployment: formData.get('dateOfDeployment'),
    fkLocationId: formData.get('fkLocationId'),
    travelAllowance: formData.get('travelAllowance'),
    hardshipAllowance: formData.get('hardshipAllowance')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Employee.',
    };
  }

  let reqbody: any = { ...validatedFields.data }

  if (validatedFields.data.isMarried === 'Yes') {
    const validateWifeFields = EmployeeSpouseSchema.safeParse({
      spouseCnic: formData.get('spouseCnic'),
      spouseGender: formData.get('spouseGender') || undefined,
      spouseName: formData.get('spouseName'),
      spouseDateOfBirth: formData.get('spouseDateOfBirth')
    })

    if (!validateWifeFields.success) {
      return {
        errors: validateWifeFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Employee.',
      };
    }

    reqbody = { ...validatedFields.data, ...validateWifeFields.data }
  }



  if (validatedFields.data.haveChildren === 'Yes') {
    // Extract all the children from formData
    let children = [];
    for (let i = 0; formData.has(`childName${i}`) && formData.has(`childGender${i}`) && formData.has(`childDateOfBirth${i}`) && formData.has(`childCnic${i}`); i++) {
      children.push({
        childName: formData.get(`childName${i}`),
        childGender: formData.get(`childGender${i}`),
        dateOfBirth: new Date(formData.get(`childDateOfBirth${i}`) as string),
        childCnic: formData.get(`childCnic${i}`)
      });
    }

    reqbody["employeeChildren"] = JSON.stringify(children)
  }

  const formdata = new FormData()

  for (let key in reqbody) {
    formdata.append(key, reqbody[key])
  }

  //console.log(formdata)

  try {
    const response = await fetch(`${endpoint}/api/employees/`, {
      method: 'POST',
      body: formdata
    });

    const body = await response.json()
    console.log(body)

    if (!response.ok) {
      throw new Error(`${body?.message}`);
    }

  } catch (error: any) {
    console.log(error.message)
    return {
      errors: {},
      message: error.message,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/employees');
  redirect('/dashboard/employees')

}

export async function updateEmployee(prevState: EmployeeFormState, formData: FormData) {
  noStore();

  // validate form fields using Zod
  const validatedFields = EmployeeFormSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    gender: formData.get('gender') || undefined,
    dateOfBirth: new Date(formData.get('dateOfBirth') as string),
    cnic: formData.get('cnic'),
    fatherName: formData.get('fatherName'),
    fkDesignationId: formData.get('fkDesignationId'),
    emailAddress: formData.get('emailAddress'),
    currentAddress: formData.get('currentAddress'),
    permanentAddress: formData.get('permanentAddress'),
    mobileNumber: formData.get('mobileNumber'),
    landlineNumber: formData.get('landlineNumber'),
    profileImage: formData.get('profileImage'),
    isMarried: formData.get('isMarried') || undefined,
    haveChildren: formData.get('haveChildren') || undefined,
    emergencyContactName: formData.get('emergencyContactName'),
    relationOfEmergencyContact: formData.get('relationOfEmergencyContact'),
    emergencyContactNumber: formData.get('emergencyContactNumber'),
  })

  if (!validatedFields.success) {
    // console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Employee.',
    };
  }

  let reqbody: any = { ...validatedFields.data }

  delete reqbody.bankName;
  delete reqbody.accountNumber;

  console.log(formData.get('spouseGender'))
  if (validatedFields.data.isMarried === 'Yes') {
    const validateWifeFields = EmployeeSpouseSchema.safeParse({
      spouseCnic: formData.get('spouseCnic'),
      spouseName: formData.get('spouseName'),
      spouseGender: formData.get('spouseGender') || undefined,
      spouseDateOfBirth: new Date(formData.get('spouseDateOfBirth') as string)
    })

   // console.log(validateWifeFields)

    if (!validateWifeFields.success) {
      return {
        errors: validateWifeFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Employee.',
      };
    }

    reqbody = { ...validatedFields.data, ...validateWifeFields.data }
  }



  if (validatedFields.data.haveChildren === 'Yes') {
    // Extract all the children from formData
    let children = [];
    for (let i = 0; formData.has(`childName${i}`) && formData.has(`childDateOfBirth${i}`); i++) {
      children.push({
        childName: formData.get(`childName${i}`),
        childGender: formData.get(`childGender${i}`),
        dateOfBirth: new Date(formData.get(`childDateOfBirth${i}`) as string),
        childCnic: formData.get(`childCnic${i}`)
      });
    }

    reqbody["employeeChildren"] = JSON.stringify(children)
  }

  const formdata = new FormData()

  for (let key in reqbody) {
    formdata.append(key, reqbody[key])
  }


  try {
    const response = await fetch(`${endpoint}/api/employees/${formdata.get('id')}`, {
      method: 'PUT',
      body: formdata
    });

    const body = await response.json()
    console.log(body)

    if (!response.ok) {
      throw new Error(`${body?.message}`);
    }

  } catch (error: any) {
    console.log(error.message)
    return {
      errors: {},
      message: error.message,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/employees');
  redirect('/dashboard/employees')

}

export async function deactivateEmployee(id: number) {
  noStore();

  try {
    const response = await fetch(`${endpoint}/api/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const body = await response.json()

    if (!response.ok) {
      throw new Error(`Database Error: ${body?.message}`);
    }

    revalidatePath('/dashboard/designations')
    return { message: "Designation Deactivated Successfully" }

  } catch (error: Error | any) {
    console.error(error)
    return { message: error.message }
  }

}



// ---------------------------------- Data Fetching --------------------------------------
export async function fetchEmployeesPages(pageSize: number = 10, name: string = '', cnic: string = '', mobileNumber: string = '', status = '') {
  noStore();

  let endpointWithQuery = `${endpoint}/api/employees?pageSize=${pageSize}`;

  if (name) endpointWithQuery += `&name=${name}`
  if (cnic) endpointWithQuery += `&cnic=${cnic}`
  if (mobileNumber) endpointWithQuery += `&mobileNumber=${mobileNumber}`
  if (status) endpointWithQuery += `&status=${status}`

  try {
    const response = await fetch(endpointWithQuery)

    const body = await response.json();

    return (body?.data?.totalPages || 0)

  } catch (e) {
    console.error(e)
    throw new Error('Failed to fetch employees pages')
  }

}

export async function fetchEmployees(pageSize: number = 10, currentPage: number = 1, id: number | undefined, name: string = '', cnic: string = '', mobileNumber: string = '', status = '') {
  noStore();

  let endpointWithQuery = `${endpoint}/api/employees?pageSize=${pageSize}&currentPage=${currentPage}`;

  if (id) endpointWithQuery += `&id=${id}`
  if (name) endpointWithQuery += `&name=${name}`
  if (cnic) endpointWithQuery += `&cnic=${cnic}`
  if (mobileNumber) endpointWithQuery += `&mobileNumber=${mobileNumber}`
  if (status) endpointWithQuery += `&status=${status}`

  // console.log(endpointWithQuery)

  try {
    const response = await fetch(endpointWithQuery)

    const body = await response.json();

    return (body?.data?.employees || [])

  } catch (e) {
    console.error(e)
    throw new Error('Failed to fetch employees')
  }

}

export async function fetchEmployee(id: number) {
  noStore();

  try {

    const response = await fetch(`${endpoint}/api/employees/${id}`)

    const body = await response.json()

    return (body?.data || undefined)

  } catch (e) {
    console.error(e)
    throw new Error('Failed to fetch Employee')
  }
}
