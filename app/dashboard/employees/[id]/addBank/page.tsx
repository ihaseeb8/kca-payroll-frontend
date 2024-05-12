import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchEmployee } from "@/app/lib/actions/employees"
import { fetchActiveDesignations } from "@/app/lib/data"
import Form from '@/app/ui/banks/create-form'

export default async function Page({
    params
}: {
    params : {
        id: string
    }
}){

    const id = Number(params.id)

    const response = await Promise.all([fetchEmployee(id)])

    const employee = response[0]    
    return(
        <main className="z-10">
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Employees', href: '/dashboard/employees' },
                { label: 'Add Bank Account', href: `/dashboard/employees/${id}/addBank`, active: true}
                ]}
            />
            <Form employee={employee}/>
        </main>
    )
}