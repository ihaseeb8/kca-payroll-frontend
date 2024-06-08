import Form from '@/app/ui/employees/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchActiveDesignations } from '@/app/lib/data';
import { fetchActiveRigLocations } from '@/app/lib/actions/rigs';

export default async function Page() {

  const [designations,locations] = await Promise.all([fetchActiveDesignations(1000,1), fetchActiveRigLocations(1000,1)])
  // console.log(locations) 
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
      <Form designations={designations} locations={locations}/>
    </main>
  );
}