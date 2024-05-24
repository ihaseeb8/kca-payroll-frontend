import { Skeleton } from "@/components/ui/skeleton"
import { lusitana } from "@/app/ui/fonts"
import { PromotionsTableSkeleton, PaginationSkeleton } from "@/app/ui/skeletons"

export default function Loading(){
    return(
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Promotions</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <div className="relative flex flex-1 flex-shrink-0 gap-2 w-full">
                    <Skeleton className="h-10 w-full"/>
                </div>
            </div>
            <PromotionsTableSkeleton />
            <div className="mt-5 flex w-full justify-center">
                <PaginationSkeleton />
            </div>
        </div>
    )
}