import { DataTable } from '../data-table';
import { columns } from '@/app/dashboard/employees/[id]/expenses/columns'
import { fetchExpenses } from '@/app/lib/actions/expenses';

export default async function ExpenseTable({
  currentPage,
  pageSize,
  id,
  name,
  month,
  year
}: {
  currentPage: number;
  pageSize: number;
  id: number;
  name: string;
  month: string;
  year: string;
}) {

  const expensees = await fetchExpenses(id,pageSize,currentPage,month,year,name);

  return (
    <div className="mt-6 flow-root">
      <DataTable columns={columns} data={expensees} />
    </div>
  );
}
