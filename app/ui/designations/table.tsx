import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { DataTable } from '../data-table';
import { columns } from '@/app/dashboard/designations/columns'
import { fetchDesignations } from '@/app/lib/data';

export default async function DesignationsTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const designations = await fetchDesignations(undefined, currentPage);

  return (
    <div className="mt-6 flow-root">
      <DataTable columns={columns} data={designations} />
    </div>
  );
}
