import AppSidebar from '@/components/Sidebar';
import { ReactNode } from 'react';
import React from 'react';
import AlertComponent from '../AlertComponent';

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div className='flex'>
      <AppSidebar />
      <main className='flex-1 p-6'>
        <AlertComponent />
        {children}
      </main>
    </div>
  );
}
