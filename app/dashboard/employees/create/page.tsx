import Form from '@/app/ui/employees/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchActiveDesignations } from '@/app/lib/data';

export default async function Page() {

  const designations = await fetchActiveDesignations(1000,1)
  // console.log(designations)
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Employees', href: '/dashboard/employees' },
          {
            label: 'Create Employee',
            href: '/dashboard/employees/create',
            active: true,
          },
        ]}
      />
      <Form designations={designations}/>
    </main>
  );
}