'use client';

import { Input } from "@/components/ui/input"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

export default function YearSelector(){

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const year = searchParams.get("year") || String(new Date().getFullYear())

    const handleChange = useDebouncedCallback((year: string)=>{
        const params = new URLSearchParams(searchParams)
        params.set('currentPage', "1")
        params.set('year', year)
        router.replace(`${pathname}?${params.toString()}`)
    }, 300)


    return(
        <Input type="number" className="flex-shrink" defaultValue={year} placeholder="Year" onChange={(e)=>{handleChange(e.target.value)}}/>
    )
}