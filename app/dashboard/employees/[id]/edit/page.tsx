import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchEmployee } from "@/app/lib/actions/employees"
import { fetchActiveDesignations } from "@/app/lib/data"
import EditForm from '@/app/ui/employees/edit-form'

export default async function Page({
    params
}: {
    params : {
        id: string
    }
}){

    const id = Number(params.id)

    const response = await Promise.all([fetchEmployee(id),fetchActiveDesignations(1000,1)])

    const employee = response[0]
    const designations = response[1]
    
    return(
        <main className="z-10">
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Employees', href: '/dashboard/employees' },
                { label: 'Edit Information', href: `/dashboard/employees/${id}/edit`, active: true}
                ]}
            />
            <EditForm employee={employee} designations={designations}/>
        </main>
    )
}