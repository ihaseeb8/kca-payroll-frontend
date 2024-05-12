import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { DataTable } from '../data-table';
import { columns } from '@/app/dashboard/banks/columns'
import { fetchBankDetails } from '@/app/lib/actions/banks';

export default async function BankDetailsTable({
  currentPage,
  query
}: {
  currentPage: number,
  query: string
}) {
  const bankDetails = await fetchBankDetails(undefined, currentPage, query);

  return (
    <div className="mt-6 flow-root">
      <DataTable columns={columns} data={bankDetails} />
    </div>
  );
}
