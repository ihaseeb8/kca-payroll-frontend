import { DataTable } from '../data-table';
import { columns } from '@/app/dashboard/employees/columns'
import { fetchEmployees } from '@/app/lib/actions/employees';

export default async function EmployeesTable({
  currentPage,
  pageSize,
  name,
  status,
  cnic,
  mobileNumber
}: {
  currentPage: number
  pageSize: number
  name: string
  status: string
  mobileNumber: string
  cnic: string
}) {
  const employees = await fetchEmployees(pageSize,currentPage,name,cnic,mobileNumber);

  return (
    <div className="mt-6 flow-root">
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
