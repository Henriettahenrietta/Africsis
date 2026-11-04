import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminEditor from './admin-editor';

export default function AdminDashboardPage() {
  if (cookies().get('africsis_admin')?.value !== 'authenticated') {
    redirect('/admin/login');
  }

  return <AdminEditor />;
}
