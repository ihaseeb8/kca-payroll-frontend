import Form from '@/app/ui/rigs/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Locations', href: '/dashboard/rigs' },
          {
            label: 'Create',
            href: '/dashboard/rigs/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}