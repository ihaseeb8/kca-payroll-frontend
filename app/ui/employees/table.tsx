import { DataTable } from '../data-table';
import { columns } from '@/app/dashboard/employees/columns'
import { fetchEmployees } from '@/app/lib/actions/employees';

export default async function EmployeesTable({
  currentPage,
  pageSize,
  id,
  name,
  status,
  cnic,
  mobileNumber
}: {
  currentPage: number;
  pageSize: number;
  id: number | undefined;
  name: string;
  status: string;
  mobileNumber: string;
  cnic: string;
}) {

  const employees = await fetchEmployees(pageSize,currentPage,id,name,cnic,mobileNumber);

  return (
    <div className="mt-6 flow-root">
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
