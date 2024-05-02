import Form from "@/app/ui/designations/edit-form";
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { getDesignation } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({
    params
}: {
    params: {id: string}
}){
    const id = Number(params.id);
    const designation = await getDesignation(id);
    
    if(!designation){
        notFound();
    }

    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Designations', href: '/dashboard/designations' },
                {
                    label: 'Edit Designation',
                    href: `/dashboard/designations/${id}/edit`,
                    active: true,
                },
                ]}
            />
            <Form designation={designation} />
        </main>
    )
}