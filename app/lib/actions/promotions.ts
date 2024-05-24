'use server';

import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// fetching endpoint form env
const endpoint = process.env.API_URL;

// ------------------------------------- Create a Promotion -------------------------------------------------

const PromotionFormSchema = z.object({
    fkPrevDesignationId: z.coerce.number(),
    fkPromotedDesignationId: z.coerce.number().refine(value => value !==-1 , {message: 'This field is required'}),
    incrementSalary: z.coerce.number().refine(value => value !==-1 , {message: 'This field is required'}),
    incrementLetter: z.any().refine(value => value instanceof File && value.size > 0, {
        message: 'This field is required',
      }),
})

export type PormotionFormState = {
    errors?: {
        fkPrevDesignationId?: string[];
        fkPromotedDesignationId?: string[];
        incrementSalary?: string[];
        incrementLetter?: string[];
    };
    message?: string | null;
};

export async function PromoteEmployee(prevState: PormotionFormState, formData: FormData) {
    noStore();

    // console.log(formData)

    // validate form fields using Zod
    const validatedFields = PromotionFormSchema.safeParse({
        fkPrevDesignationId: formData.get('fkPrevDesignationId'),
        fkPromotedDesignationId: formData.get('fkPromotedDesignationId') === '' ? '-1' : formData.get('fkPromotedDesignationId'),
        incrementSalary: formData.get('incrementSalary') === '' ? '-1' : formData.get('incrementSalary'),
        incrementLetter: formData.get('incrementLetter') 
    })
    
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Prmote Employee.',
        };
    }

    const employeeId = formData.get('id')

    // console.log(validatedFields.data)
    const reqbody = new FormData();
    reqbody.append('fkPrevDesignationId', validatedFields.data.fkPrevDesignationId.toString());
    reqbody.append('fkPromotedDesignationId', validatedFields.data.fkPromotedDesignationId.toString());
    reqbody.append('incrementSalary', validatedFields.data.incrementSalary.toString());
    reqbody.append('incrementLetter', validatedFields.data.incrementLetter);

    // console.log(reqbody)

    try {
        const response = await fetch(`${endpoint}/api/promotions/${employeeId}`, {
            method: 'POST',
            body: reqbody
        });

        const body = await response.json()

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
    revalidatePath('/dashboard/promotions');
    revalidatePath('/dashboard/employees');
    redirect('/dashboard/employees')

}


export async function fetchPromotions(currentPage : number = 1, pageSize : number = 10, query : string = '') {
    noStore();

    let endpointWithQuery = `${endpoint}/api/promotions?currentPage=${currentPage}&pageSize=${pageSize}`
    if (query ){
        endpointWithQuery += `&query=${query}`
    }

    // console.log(endpointWithQuery)

    try{
        const response = await fetch(endpointWithQuery)

        if(!response.ok){
            const message = (await response.json()).message

            throw new Error(`${response.status} ${response.statusText} | message : ${message}`)
        }
        
        const data = await response.json();

        return (data?.data?.promotions || [])

    } catch (e: Error | any ) {
        console.log(e.message)
        throw new Error('Failed to fetch Promotions')
    }
}

export async function fetchPromotionsPages(currentPage : number = 1, pageSize : number = 10, query : string = ''){
    noStore();

    let endpointWithQuery = `${endpoint}/api/promotions?currentPage=${currentPage}&pageSize=${pageSize}`
    if (query){
        endpointWithQuery += `&query=${query}`
    }

    try {
        const response = await fetch(endpointWithQuery)

        if(!response.ok){
            const message = (await response.json()).message

            throw new Error(`${response.status} ${response.statusText} | message : ${message}`)
        }

        const data = await response.json()

        return (data?.data?.totalPages || 0)

    } catch (e : Error | any) {
        console.log(e.message)
        throw new Error('Failed to fetch Promotion Pages')
    }

}