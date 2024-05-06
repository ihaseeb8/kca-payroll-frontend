import { columns } from "./columns"
import { DataTable } from "../../ui/data-table"
import { Designation } from "@/app/lib/definitions"
import { lusitana } from '@/app/ui/fonts';
import { CreateDesignation } from "@/app/ui/designations/buttons";
import { fetchDesignationsPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import Table from "@/app/ui/designations/table"
import { Suspense } from "react";
import { DesignationTableSkeleton } from "@/app/ui/skeletons";
import Search from "@/app/ui/search";

export default async function Page({
    searchParams
}: {
    searchParams: {
        query: string,
        currentPage: string,
        pageSize: string
    }
}) {

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.currentPage) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  const totalPages = await fetchDesignationsPages(pageSize, query);

  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Designations</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search designations..." />
            <CreateDesignation />
        </div>
        <Suspense key={query + currentPage} fallback={<DesignationTableSkeleton />}>
          <Table currentPage={currentPage} query={query}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
        
    </div>
  )
}
