'use server';

import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// fetching endpoint form env
const endpoint = process.env.API_URL;


export async function fetchBonusesPages(employeeId : number, pageSize : number = 10, month: string, year: string, name: string){
    noStore();

    let endpointWithQuery = `${endpoint}/api/bonuses?pageSize=${pageSize}`
    if (name) endpointWithQuery += `&name=${name}`
    if (month) endpointWithQuery += `&month=${month}`
    if (year) endpointWithQuery += `&year=${year}`
    if (employeeId) endpointWithQuery += `&employeeId=${employeeId}`

    try {
        const response = await fetch(endpointWithQuery)
    
        const body = await response.json();
    
        return (body?.data?.totalPages || 0)
    
      } catch (e) {
        console.error(e)
        throw new Error('Failed to fetch bonuses pages')
      }
}

export async function fetchBonuses(employeeId: number,pageSize: number = 10, currentPage: number = 1, month: string, year: string, name: string) {
    noStore();
  
    let endpointWithQuery = `${endpoint}/api/bonuses?pageSize=${pageSize}&currentPage=${currentPage}`;
  
    if (employeeId) endpointWithQuery += `&employeeId=${employeeId}`
    if (name) endpointWithQuery += `&name=${name}`
    if (month) endpointWithQuery += `&month=${month}`
    if (year) endpointWithQuery += `&year=${year}`
  
    // console.log(endpointWithQuery)
  
    try {
      const response = await fetch(endpointWithQuery)
  
      const body = await response.json();
      // console.log(body)
  
      return (body?.data?.bonuses || [])
  
    } catch (e) {
      console.error(e)
      throw new Error('Failed to fetch bonuses')
    }
  
  }

  const BonusSchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    amount: z.union([
      z.string().refine(val => val !== '', { message: 'Required' }).transform(val => parseFloat(val)),
      z.number({ required_error: 'Required' })
    ]),
    date: z.union([
      z.string().refine(val => val !== '', { message: 'Required' }).transform(val => new Date(val)),
      z.date({ required_error: 'Required' })
    ])
  });
  
  export type BonusFormState = {
    errors?: {
      name?: string[],
      amount?: string[],
      date?: string[]
    },
    message?: string | null
  }
  

  export async function updateBonus(prevState: BonusFormState, formdata: FormData){
    const employeeId = formdata.get('fkEmployeeId');
    const bonusId = formdata.get('id')

    

    const validatedFields = BonusSchema.safeParse({
      name: formdata.get('name'),
      amount: formdata.get('amount'),
      date: formdata.get('date')
    })

    if(!validatedFields.success){
      console.log(validatedFields.error.flatten().fieldErrors)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields, Failed to update bonus.'
      }
    }

    const reqbody ={
      ...validatedFields.data,
      fkEmployeeId: Number(formdata.get('fkEmployeeId'))
    }

    try {
      const response = await fetch(`${endpoint}/api/bonuses/${bonusId}`, {
        method: 'PUT',
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

      // Before redirecting, update the state with no errors.
      return {
        errors: {},
        message: "Bonus updated successfully!",
      };
  
    } catch (error: any) {
      console.log(error.message)
      return {
        errors: {},
        message: error.message,
      };
    }

  }

  export async function addBonus(prevState: BonusFormState, formdata: FormData){
    
    const employeeId = formdata.get('fkEmployeeId');

    const validatedFields = BonusSchema.safeParse({
      name: formdata.get('name'),
      amount: formdata.get('amount'),
      date: formdata.get('date')
    })

    if(!validatedFields.success){
      console.log(validatedFields.error.flatten().fieldErrors)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields, Failed to add bonus.'
      }
    }

    const reqbody ={
      ...validatedFields.data,
      fkEmployeeId: Number(formdata.get('fkEmployeeId'))
    }

    try {
      const response = await fetch(`${endpoint}/api/bonuses/`, {
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

      // Before redirecting, update the state with no errors.
      return {
        errors: {},
        message: "Bonus added successfully!",
      };
  
    } catch (error: any) {
      console.log(error.message)
      return {
        errors: {},
        message: error.message,
      };
    }
    
  }

  export async function deleteBonus(id: number){
    try {
      const response = await fetch(`${endpoint}/api/bonuses/${id}`, {
        method: 'DELETE',
      });
  
      const body = await response.json()
      console.log(body)
  
      if (!response.ok) {
        throw new Error(`${body?.message}`);
      }

      // Before redirecting, update the state with no errors.
      return {
        errors: {},
        message: "Bonus deleted successfully!",
      };
  
    } catch (error: any) {
      console.log(error.message)
      return {
        errors: {},
        message: error.message,
      };
    }
  }