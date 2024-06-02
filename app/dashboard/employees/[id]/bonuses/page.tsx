import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import Search from "@/app/ui/search"
import MonthSelector from "@/app/ui/month-selector"
import YearSelector from "@/app/ui/year-selector"
import { fetchBonusesPages } from "@/app/lib/actions/bonuses"
import BonusesTable from "@/app/ui/bonuses/table"
import { Suspense } from "react"
import Pagination from "@/app/ui/invoices/pagination"
import { AddBonus } from "@/app/ui/bonuses/actions"

export default async function Page({
    params,
    searchParams
} : {
    params: {id: string}
    searchParams: { year: string, month: string, currentPage: string, pageSize: string, query: string}
}){
    const currentPage = Number(searchParams?.currentPage || 1);
    const pageSize = Number(searchParams?.pageSize || 10);
    const month = searchParams?.month || String(new Date().getMonth());
    const year = searchParams?.year || String(new Date().getFullYear());
    const name = searchParams?.query || '';
    const id = Number(params.id)


    const totalPages = await fetchBonusesPages(id,pageSize,month,year,name);
    
    return(
        <main className="z-10">
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Employees', href: '/dashboard/employees' },
                { label: 'Bonuses', href: `/dashboard/employees/${id}/bonuses`, active: true}
                ]}
            />
            
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search bonus by name"/>
                <MonthSelector />
                <div>
                    <YearSelector />
                </div>
                <AddBonus employeeId={id}/>

            </div>
            <Suspense key={name + currentPage + pageSize + id + year + month} fallback={<>Loading...</>}>
                <BonusesTable currentPage={currentPage} pageSize={pageSize} id={id} name={name} month={month} year={year}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    )
}