import { DataTable } from '../data-table';
import { columns } from '@/app/dashboard/promotions/columns'
import { fetchPromotions } from '@/app/lib/actions/promotions';

export default async function PromotionsTable({
  currentPage,
  pageSize,
  query
}: {
  currentPage: number;
  pageSize: number;
  query: string;
}) {

  const promotions = await fetchPromotions(currentPage, pageSize, query);

  return (
    <div className="mt-6 flow-root">
      <DataTable columns={columns} data={promotions} />
    </div>
  );
}
