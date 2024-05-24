import { fetchEmployee } from "@/app/lib/actions/employees"
import { fetchActiveDesignations } from "@/app/lib/data"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import PromoteForm from "@/app/ui/promotions/promote-form"

export default async function Page({
    params
} : {
    params: {
        id: string
    }
}){
    const id = Number(params.id)
    const [employee , designations] = await Promise.all([fetchEmployee(id), fetchActiveDesignations(1000,1)])

    // console.log(employee)
    // console.log(desingations)
    
    return(
        <main className="z-10">
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Employees', href: '/dashboard/employees' },
                { label: 'Promote', href: `/dashboard/employees/${id}/promote`, active: true}
                ]}
            />
            <PromoteForm employee={employee} designations={designations}/>
        </main>
    )
}