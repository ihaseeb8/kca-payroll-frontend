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


// ------------------------------------- Create Rig Location
const RigLocationFormSchema = z.object({
    locationName: z.string().min(1, "Location Name is required"),
    locationType: z.string().min(1, "Location Type is required"),
})

export type RigLocationFormState = {
    errors?: {
        locationName?: string[];
        locationType?: string[];
    };
    message?: string | null;
};

export async function CreateRigLocation(prevState: RigLocationFormState, formData: FormData) {
    noStore();

    // validate form fields using Zod
    const validatedFields = RigLocationFormSchema.safeParse({
        locationName: formData.get('locationName'),
        locationType: formData.get('locationType'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Rig Location.',
        };
    }

    try {
        const response = await fetch(`${endpoint}/api/rigLocation/`, {
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
    revalidatePath('/dashboard/rigs');
    redirect('/dashboard/rigs')

}

// ---------------------------------- Total Pages Fetching --------------------------------------
export async function fetchRigLocationPages(pageSize: number = 10, query: string) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/rigLocation?pageSize=${pageSize}&query=${query}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const object = await response.json();

        if (object?.data?.totalPages) {
            return object.data.totalPages
        } else {
            return 0;
        }


    } catch (error) {

        console.error('Database Error:', error);
        throw new Error('Failed to fetch Rig Location pages.');

    }
}

export async function fetchRigLocations(pageSize: number = 10, currentPage: number = 1, query: string) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/rigLocation?currentPage=${currentPage}&pageSize=${pageSize}&query=${query}`)

        if (!response.ok) {
            throw new Error(`Failed to fetch data, status: ${response.status}`)
        }
        const object = await response.json();

        if (object?.data?.rigLocations) {
            return object.data.rigLocations
        } else {
            return [];
        }

    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch designation table. error');
    }

}

export async function fetchActiveRigLocations(pageSize: number = 10, currentPage: number = 1){
    noStore();
  
    try{
      const response = await fetch(`${endpoint}/api/rigLocation?currentPage=${currentPage}&pageSize=${pageSize}&status=active`)
  
      if(!response.ok){
        throw new Error(`Failed to fetch data, status: ${response.status}`)
      }
      const object = await response.json();
  
      if(object?.data?.rigLocations){
        return object.data.rigLocations
      } else {
        return [];
      }
  
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch designation table. error');
    }
  
  }

export async function getRigLocation(id: number) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/rigLocation/${id}`)

        const body = await response.json()

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (body?.data) {
            return body.data
        }

    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch Rig Location for the given id');
    }
}

//   export async function deactivateRigLocation(id: number , formData: FormData) {
//     noStore();

//     const validatedFields = RigLocationFormSchema.safeParse({
//         rigStatus: formData.get('rigStatus'),
//       })

//       if (!validatedFields.success) {
//         return {
//           errors: validatedFields.error.flatten().fieldErrors,
//           message: "Missing Fields. Failed to Update Rig Location's Status.",
//         };
//       }


//     try{
//       const response = await fetch(`${endpoint}/api/rigLocation/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(validatedFields.data)
//       })

//       const body = await response.json()

//       if(!response.ok){
//         throw new Error(`Database Error: ${body?.message}`);
//       }

//       revalidatePath('/dashboard/rigs')
//       return {message: "Rig Location Deactivated Successfully!"}

//     } catch( error : Error | any ) {
//       console.error(error)
//       return { message: error.message}
//     }

//   }

export async function toggleStatus(id: number, status: string) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/rigLocation/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "locationStatus": status })
        });

        const body = await response.json();

        console.log(status)
        console.log(body)

        if (!response.ok) {
            throw new Error(`Database Error: ${body?.message}`);
        }

        revalidatePath('/dashboard/rigs'); // Revalidate the path to update the UI
        return { message: "Rig Location's Status Updated Successfully!" };
    } catch (error: Error | any) {
        console.error(error)
        return { message: error.message }
    }
}


// ------------------------------- Update Rig Location ------------------ 
export async function updateRigLocation(id: number, prevState: RigLocationFormState, formData: FormData) {
    noStore();

    // validate form fields using Zod
    const validatedFields = RigLocationFormSchema.safeParse({
        locationName: formData.get('locationName'),
        locationType: formData.get('locationType'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Rig Location.',
        };
    }

    try {
        const response = await fetch(`${endpoint}/api/rigLocation/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedFields.data)
        });

        const body = await response.json()

        // console.log(body)

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
    revalidatePath('/dashboard/rigs');
    redirect('/dashboard/rigs')

}
