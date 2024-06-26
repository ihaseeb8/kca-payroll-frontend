import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import Search from "@/app/ui/search"
import MonthSelector from "@/app/ui/month-selector"
import YearSelector from "@/app/ui/year-selector"
import { fetchExpensesPages } from "@/app/lib/actions/expenses"
import ExpenseTable from "@/app/ui/expenses/table"
import { Suspense } from "react"
import Pagination from "@/app/ui/invoices/pagination"
import { AddExpense } from "@/app/ui/expenses/actions"

export default async function Page({
    params,
    searchParams
} : {
    params: {id: string}
    searchParams: { year: string, month: string, currentPage: string, pageSize: string, query: string}
}){
    const currentPage = Number(searchParams?.currentPage || 1);
    const pageSize = Number(searchParams?.pageSize || 10);
    const month = searchParams?.month || String(new Date().getMonth() + 1);
    const year = searchParams?.year || String(new Date().getFullYear());
    const name = searchParams?.query || '';
    const id = Number(params.id)


    const totalPages = await fetchExpensesPages(id,pageSize,month,year,name);
    
    return(
        <main className="z-10">
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Employees', href: '/dashboard/employees' },
                { label: 'Expenses', href: `/dashboard/employees/${id}/expenses`, active: true}
                ]}
            />
            
             <div className="mt-4 items-center justify-between gap-2 md:mt-8">
                <div className="flex items-center gap-4 w-full justify-between">
                    <Search placeholder="Search expense by name" className="max-w-[92%] flex-1"/>
                    <div className="gap-2 hidden lg:flex">
                        <div className="flex-[0.7]">
                            <MonthSelector />
                        </div>
                        
                        <div className="flex-[0.7]">
                            <YearSelector />
                        </div>
                    </div>
                    <AddExpense employeeId={id} />
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 w-full lg:hidden">
                    <div className="flex-1">
                        <MonthSelector />
                    </div>
                    
                    <div className="flex-1">
                        <YearSelector />
                    </div>
                </div>
            </div>
            <Suspense key={name + currentPage + pageSize + id + year + month} fallback={<>Loading...</>}>
                <ExpenseTable currentPage={currentPage} pageSize={pageSize} id={id} name={name} month={month} year={year}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    )
}