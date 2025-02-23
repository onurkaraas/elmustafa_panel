'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/sidebar';
import UsersTable from '../components/users-table';
import { Button } from '@/components/ui/button'; // We'll use this for the sidebar trigger

export default function UsersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a237e]">Kullanıcı Yönetimi</h1>
            <Button
              className="md:hidden"
              onClick={() => document.dispatchEvent(new Event('toggleSidebar'))}>
              Menu
            </Button>
          </div>
          <UsersTable />
        </div>
      </main>
    </div>
  );
}
