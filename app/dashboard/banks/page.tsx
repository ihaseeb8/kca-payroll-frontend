import { DataTable } from "../../ui/data-table"
import { Designation } from "@/app/lib/definitions"
import { lusitana } from '@/app/ui/fonts';
import { CreateRigLocation } from "@/app/ui/rigs/buttons";
import { fetchBankDetailsPages } from "@/app/lib/actions/banks";
import Pagination from "@/app/ui/invoices/pagination";
import Table from "@/app/ui/banks/table"
import { Suspense } from "react";
import { BankTableSkeleton } from "@/app/ui/skeletons";
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

  // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // // Use it like this
  // await delay(4000); // delay for 1 second

  const totalPages = await fetchBankDetailsPages(pageSize, query);

  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Bank Accounts</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search Bank Account..." />
        </div>
        <Suspense key={query + currentPage} fallback={<BankTableSkeleton />}>
          <Table currentPage={currentPage} query={query}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  )
}
