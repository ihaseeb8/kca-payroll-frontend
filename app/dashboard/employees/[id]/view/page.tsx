import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import EmployeeInformation from "@/app/ui/employees/view-form"
import { fetchEmployee } from "@/app/lib/actions/employees"
import { notFound } from "next/navigation"

export default async function Page({
    params
}: {
    params : {
        id: string
    }
}){

    const id = Number(params.id)
    const employee = await fetchEmployee(id);

    if(!employee){
        notFound();
    }


    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Employees', href: '/dashboard/employees' },
                { label: 'Employee Information', href: `/dashboard/employees/${id}/view`, active: true}
                ]}
            />
            <EmployeeInformation employee={employee}/>
        </main>
    )
    
}