'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function MonthSelector(){

    
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const month = searchParams.get('month') || String(new Date().getMonth() + 1)

    const setMonth = (month: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('currentPage', "1")
        params.set('month', month)
        router.replace(`${pathname}?${params.toString()}`)
    }
    


    return(
        <Select defaultValue={month} onValueChange={(value) => setMonth(value)}>
            <SelectTrigger>
                <SelectValue placeholder="Select a Month" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Months</SelectLabel>
                    {months.map((month) => (
                        <SelectItem key={month.label} value={String(month.value)}>{month.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}