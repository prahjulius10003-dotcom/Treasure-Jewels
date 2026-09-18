import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Redirect to products by default for the dashboard
  redirect('/admin/products');
}
