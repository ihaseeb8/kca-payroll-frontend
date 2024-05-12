import { columns } from "./columns"
import { DataTable } from "../../ui/data-table"
import { Designation } from "@/app/lib/definitions"
import { lusitana } from '@/app/ui/fonts';
import { CreateRigLocation } from "@/app/ui/rigs/buttons";
import { fetchRigLocationPages } from "@/app/lib/actions/rigs";
import Pagination from "@/app/ui/invoices/pagination";
import Table from "@/app/ui/rigs/table"
import { Suspense } from "react";
import { RigsTableSkeleton } from "@/app/ui/skeletons";
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

  const totalPages = await fetchRigLocationPages(pageSize, query);

  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Rig Locations</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search Rig Locations..." />
            <CreateRigLocation />
        </div>
        <Suspense key={query + currentPage} fallback={<RigsTableSkeleton />}>
          <Table currentPage={currentPage} query={query}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  )
}
