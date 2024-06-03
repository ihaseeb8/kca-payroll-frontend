import Form from "@/app/ui/rigs/edit-form";
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { getRigLocation } from "@/app/lib/actions/rigs";
import { notFound } from "next/navigation";

export default async function Page({
    params
}: {
    params: {id: string}
}){
    const id = Number(params.id);
    const rigLocation = await getRigLocation(id);
    
    if(!rigLocation){
        notFound();
    }

    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Locations', href: '/dashboard/rigs' },
                {
                    label: 'Edit Location',
                    href: `/dashboard/rigs/${id}/edit`,
                    active: true,
                },
                ]}
            />
            <Form rigLocation={rigLocation} />
        </main>
    )
}