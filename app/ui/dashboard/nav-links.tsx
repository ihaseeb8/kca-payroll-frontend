'use client'

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  MapPinIcon

} from '@heroicons/react/24/outline';

import { HomeIcon, UsersIcon, BriefcaseBusiness, MapPinned, Landmark, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Employees', href: '/dashboard/employees', icon: UsersIcon},
  { name: 'Designations', href: '/dashboard/designations', icon: BriefcaseBusiness},
  { name: 'Locations', href: '/dashboard/rigs', icon: MapPinned},
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Bank Accounts', href: '/dashboard/banks', icon: Landmark},
  { name: 'Promotions', href: '/dashboard/promotions', icon: TrendingUp}

];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Button 
            asChild
            key={link.name} 
            variant={'secondary'} 
            color='black'
            className={clsx(
            "flex h-[48px] grow items-center hover:bg-slate-300 justify-center gap-2 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3",
            {'bg-slate-300 text-black': pathname === link.href}
          )}>
            <Link
              key={link.name}
              href={link.href}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </Button>
          
        );
      })}
    </>
  );
}
