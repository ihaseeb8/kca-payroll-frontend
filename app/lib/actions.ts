'use server';

import {z} from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


// definning out endpoint
const endpoint = process.env.API_URL;

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};


const CreateInvoice = FormSchema.omit({id: true, date: true})

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

  export async function deleteInvoice(id: string) {
    throw new Error('Failed to Delete Invoice');
   
    // Unreachable code block
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice' };
    }
  }



  /// --------------------------- Create Designation --------------------------------
  const DesignationFormSchema = z.object({
    designationName: z.string().min(1,"Designation's name is required"),
    shortName: z.string().min(1, "Designation's short name is required"),
    description: z.string({
      invalid_type_error: 'Invalid Type'
    })
  })

  export type DesignationFormState = {
    errors?: {
      designationName?: string[];
      shortName?: string[];
      description?: string[];
    };
    message?: string | null;
  };

  export async function createDesignation(prevState: DesignationFormState, formData: FormData) {
    noStore();

    // validate form fields using Zod
    const validatedFields = DesignationFormSchema.safeParse({
      designationName: formData.get('designationName'),
      shortName: formData.get('shortName'),
      description: formData.get('description')
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }

    try {
      const response = await fetch(`${endpoint}/api/designations/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
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
    revalidatePath('/dashboard/designations');
    redirect('/dashboard/designations')

}

  // ----------------------------------- Deactivate Designation --------------------------------------------------------------

  export async function deactivateDesignation(id: number) {
    noStore();

    try{
      const response = await fetch(`${endpoint}/api/designations/deactivateDesignation/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const body = await response.json()

      if(!response.ok){
        throw new Error(`Database Error: ${body?.message}`);
      }

      revalidatePath('/dashboard/designations')
      return {message: "Designation Deactivated Successfully"}

    } catch( error : Error | any ) {
      console.error(error)
      return { message: error.message}
    }

  }

  // ------------------------------- Update Designation ------------------ 
  export async function updateDesignation(id: number, prevState: DesignationFormState, formData: FormData) {
    noStore();

    // validate form fields using Zod
    const validatedFields = DesignationFormSchema.safeParse({
      designationName: formData.get('designationName'),
      shortName: formData.get('shortName'),
      description: formData.get('description')
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
      };
    }

    try {
      const response = await fetch(`${endpoint}/api/designations/updateDesignation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedFields.data)
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
    revalidatePath('/dashboard/designations');
    redirect('/dashboard/designations')

}
