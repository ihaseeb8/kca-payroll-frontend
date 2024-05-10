import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { DataTable } from '../data-table';
import { columns } from '@/app/dashboard/rigs/columns'
import { fetchRigLocations } from '@/app/lib/actions/rigs';

export default async function RigLocationTable({
  currentPage,
  query
}: {
  currentPage: number,
  query: string
}) {
  const rigLocations = await fetchRigLocations(undefined, currentPage, query);

  return (
    <div className="mt-6 flow-root">
      <DataTable columns={columns} data={rigLocations} />
    </div>
  );
}
