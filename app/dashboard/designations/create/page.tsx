import Form from '@/app/ui/designations/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Designations', href: '/dashboard/designations' },
          {
            label: 'Create Designation',
            href: '/dashboard/designations/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}