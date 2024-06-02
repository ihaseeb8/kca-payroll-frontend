import { DataTable } from '../data-table';
import { columns } from '@/app/dashboard/employees/[id]/bonuses/columns'
import { fetchBonuses } from '@/app/lib/actions/bonuses';

export default async function BonusesTable({
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

  const bonuses = await fetchBonuses(id,pageSize,currentPage,month,year,name);

  return (
    <div className="mt-6 flow-root">
      <DataTable columns={columns} data={bonuses} />
    </div>
  );
}
