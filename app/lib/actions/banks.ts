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


// ------------------------------------- Create Bank Details
const BankDetailsFormSchema = z.object({
    bankName: z.string().min(1, "Bank Name is required"),
    accountNumber: z.string().length(24, "Account Number is required and should be of 24 Digits"),
    fkEmployeeId: z.string(),
})

export type BankDetailsFormState = {
    errors?: {
        bankName?: string[];
        accountNumber?: string[];
        fkEmployeeId?: string[];
    };
    message?: string | null;
};

export async function addBankAccount(id: number, prevState: BankDetailsFormState, formData: FormData) {
    noStore();

    // validate form fields using Zod
    const validatedFields = BankDetailsFormSchema.safeParse({
        bankName: formData.get('bankName'),
        accountNumber: formData.get('accountNumber'),
        fkEmployeeId: id.toString()
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Add Bank Account.',
        };
    }

    try {
        const response = await fetch(`${endpoint}/api/bankDetails/${id}`, {
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
    revalidatePath('/dashboard/employees');
    redirect('/dashboard/employees')

}

// ---------------------------------- Total Pages Fetching --------------------------------------
export async function fetchBankDetailsPages(pageSize: number = 10, query: string) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/bankDetails?pageSize=${pageSize}&query=${query}`);

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
        throw new Error('Failed to fetch Bank Details pages.');

    }
}

export async function fetchBankDetails(pageSize: number = 10, currentPage: number = 1, query: string) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/bankDetails?currentPage=${currentPage}&pageSize=${pageSize}&query=${query}`)

        if (!response.ok) {
            throw new Error(`Failed to fetch data, status: ${response.status}`)
        }
        const object = await response.json();

        if (object?.data?.bankDetails) {
            return object.data.bankDetails
        } else {
            return [];
        }

    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch designation table. error');
    }

}

export async function getBankDetail(id: number) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/bankDetails/${id}`)

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

export async function fetchActiveBankDetails(pageSize: number = 10, currentPage: number = 1) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/bankDetails?currentPage=${currentPage}&pageSize=${pageSize}&status=active`)

        if (!response.ok) {
            throw new Error(`Failed to fetch data, status: ${response.status}`)
        }
        const object = await response.json();

        if (object?.data?.bankDetails) {
            return object.data.bankDetails
        } else {
            return [];
        }

    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch designation table. error');
    }

}

export async function updateBankDetails(id: number, prevState: BankDetailsFormState, formData: FormData) {
    noStore();

    // validate form fields using Zod
    const validatedFields = BankDetailsFormSchema.safeParse({
        bankName: formData.get('bankName'),
        accountNumber: formData.get('accountNumber'),
        fkEmployeeId: String(formData.get('fkEmployeeId'))
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Bank Account.',
        };
    }

    try {
        const response = await fetch(`${endpoint}/api/bankDetails/${id}`, {
            method: 'PUT',
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
    revalidatePath('/dashboard/banks');
    redirect('/dashboard/banks')

}

export async function deactivateBankDetails(id: number) {
    noStore();

    try {
        const response = await fetch(`${endpoint}/api/bankDetails/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const body = await response.json()

        if (!response.ok) {
            throw new Error(`Database Error: ${body?.message}`);
        }

        revalidatePath('/dashboard/banks')
        return { message: "Bank Details Deactivated Successfully" }

    } catch (error: Error | any) {
        console.error(error)
        return { message: error.message }
    }

}



