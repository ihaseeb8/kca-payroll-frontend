import { CreateEmployee } from "@/app/ui/employees/buttons"
import Pagination from "@/app/ui/invoices/pagination"
import { fetchEmployeesPages } from "@/app/lib/actions/employees"
import EmployeesTable from "@/app/ui/employees/table"
import { EmployeesTableSkeleton } from "@/app/ui/skeletons"
import Search from "@/app/ui/employees/search"
import { Suspense } from "react"
import { lusitana } from '@/app/ui/fonts';

export default async function Page({searchParams}: {searchParams : {
    currentPage: string
    pageSize: string
    id: string
    name: string
    status: string
    cnic: string
    mobileNumber: string
}}){

    const currentPage = Number(searchParams?.currentPage || 1);
    const pageSize = Number(searchParams?.pageSize || 10);
    const id = Number(searchParams?.id || undefined)
    const name = searchParams?.name || '';
    const status = searchParams?.status || '';
    const cnic = searchParams?.cnic || '';
    const mobileNumber = searchParams?.mobileNumber || '';

    const totalPages = await fetchEmployeesPages(pageSize,name,cnic,mobileNumber,status);
    
    return(


        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Employees</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search />
                <CreateEmployee />
            </div>
            <Suspense key={name + currentPage + pageSize + id + status + cnic + mobileNumber} fallback={<EmployeesTableSkeleton />}>
                <EmployeesTable currentPage={currentPage} pageSize={pageSize} id={id} name={name} status={status} cnic={cnic} mobileNumber={mobileNumber}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}