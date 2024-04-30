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

async function getData(): Promise<Designation[]> {
  // Fetch data from your API here.

  return [
    {
        id: 1,
        designationName: "Software Engineer",
        shortName: "SE",
        description: "A software engineer is a person who applies the principles of software engineering to the design, development, maintenance, testing, and evaluation of computer software.",
        status: "active"
      },
      {
        id: 2,
        designationName: "Product Manager",
        shortName: "PM",
        description: "A product manager is a professional role that is responsible for the development of products for an organization, known as the practice of product management.",
        status: "inactive"
      },
    // ...
  ]
}

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

    const totalPages = await fetchDesignationsPages(10);


  const data = await getData()

  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Designations</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search invoices..." /> */}
            <CreateDesignation />
        </div>
        <Suspense key={query + currentPage} fallback={<DesignationTableSkeleton />}>
          <Table currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
        
    </div>
  )
}
