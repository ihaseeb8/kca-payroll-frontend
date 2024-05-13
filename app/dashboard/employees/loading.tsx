import { Skeleton } from "@/components/ui/skeleton"
import { lusitana } from "@/app/ui/fonts"
import { EmployeesTableSkeleton, PaginationSkeleton } from "@/app/ui/skeletons"

export default function Loading(){
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Employees</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <div className="relative flex flex-1 flex-shrink-0 gap-2 w-full">
                    <Skeleton className="h-10 w-[90%]"/>
                    <Skeleton className="w-10 h-10"/>
                </div>
                <Skeleton className="flex h-10 w-12 md:w-28"/>
            </div>
            <EmployeesTableSkeleton />
            <div className="mt-5 flex w-full justify-center">
                <PaginationSkeleton />
            </div>
        </div>
    )
}