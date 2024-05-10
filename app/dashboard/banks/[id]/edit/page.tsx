import Form from "@/app/ui/banks/edit-form";
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { getBankDetail } from "@/app/lib/actions/banks";
import { notFound } from "next/navigation";

export default async function Page({
    params
}: {
    params: {id: string}
}){
    const id = Number(params.id);
    const bankDetail = await getBankDetail(id);
    
    if(!bankDetail){
        notFound();
    }

    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Banks', href: '/dashboard/banks' },
                {
                    label: 'Edit Bank Details',
                    href: `/dashboard/banks/${id}/edit`,
                    active: true,
                },
                ]}
            />
            <Form bankDetail={bankDetail} />
        </main>
    )
}