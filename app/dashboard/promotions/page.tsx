import { fetchPromotionsPages } from "@/app/lib/actions/promotions"
import Pagination from "@/app/ui/invoices/pagination"
import { Suspense } from "react"
import { lusitana } from "@/app/ui/fonts"
import Search from "@/app/ui/search";
import PromotionsTable from "@/app/ui/promotions/table"
import { PromotionsTableSkeleton } from "@/app/ui/skeletons";

export default async function Page({
    searchParams
} : {
    searchParams : {
        currentPage: string
        pageSize: string
        query: string
    }
}){

    
    const currentPage = Number(searchParams?.currentPage || 1);
    const pageSize = Number(searchParams?.pageSize || 10)
    const query = searchParams?.query || '';

    // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // // Use it like this
    // await delay(4000); // delay for 1 second
    
    const totalPages = await fetchPromotionsPages();

    return(
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Promotions</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search by Employee ID or Name"/>
                {/* <CreateEmployee /> */}
            </div>
            <Suspense key={currentPage + pageSize + query} fallback={<PromotionsTableSkeleton />}>
                <PromotionsTable currentPage={currentPage} pageSize={pageSize} query={query}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>

        
    )
}