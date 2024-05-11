'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FilterIcon } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { DropdownMenuTrigger,DropdownMenuContent, DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react';

export default function Search() {

  const placeholder = "Search Employees"
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({
    name: true,
    id: false,
    cnic: false,
    mobileNumber: false,
  });
  const [term, setTerm] = useState('')
  
  function Search(term: string){
    const params = new URLSearchParams(searchParams)
    params.set('currentPage', '1');

    Object.keys(filters).forEach((key) => {
        if (filters[key] && term) {
          params.set(key, term);
        } else {
          params.delete(key);
        }
      });

    router.replace(`${pathname}?${params.toString()}`)
  }

  useEffect(()=>{
    Search(term)
  }, [filters])

  const handleSearch = useDebouncedCallback((term: string) => {

    setTerm(term)

    Search(term)
  
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0 gap-2">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-[90%] rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(event)=>{handleSearch(event.target.value)}}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-md" size="icon" variant="outline">
            <FilterIcon className="w-5 h-5" />
            <span className="sr-only">Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[240px] p-4 mt-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 z-10"
        >
          <div className="space-y-4 bg-white">
            <div className="flex justify-between align-middle">
              <Label className="text-sm font-medium" htmlFor="name">
                Name
              </Label>
              <Checkbox id="name" checked={filters.name} onCheckedChange={(e: boolean)=>{setFilters({ ...filters, ["name"]: e })}}/>
            </div>
            <div className="flex justify-between align-middle">
              <Label className="text-sm font-medium" htmlFor="id">
                Employee No/ID
              </Label>
              <Checkbox id="id" checked={filters.id} onCheckedChange={(e: boolean)=>{setFilters({ ...filters, ["id"]: e })}}/>
            </div>
            <div className="flex justify-between align-middle">
              <Label className="text-sm font-medium" htmlFor="filter-cnic">
                CNIC
              </Label>
              <Checkbox id="cnic" checked={filters.cnic} onCheckedChange={(e: boolean)=>{setFilters({ ...filters, ["cnic"]: e })}} />
            </div>
            <div className="flex justify-between align-middle">
              <Label className="text-sm font-medium" htmlFor="filter-mobile">
                Mobile Number
              </Label>
              <Checkbox id="mobileNumber" checked={filters.mobileNumber} onCheckedChange={(e: boolean)=>{setFilters({ ...filters, ["mobileNumber"]: e })}} />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
