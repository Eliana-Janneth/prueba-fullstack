'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from '@components/ui/sidebar';
import Link from 'next/link';
import { Home, Users, BarChart2, LogOut, LogIn } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
  { name: 'Ingresos y Egresos', href: '/movements', icon: <Home /> },
  { name: 'Usuarios', href: '/users', icon: <Users />, adminOnly: true },
  { name: 'Reportes', href: '/reports', icon: <BarChart2 />, adminOnly: true },
];
export default function AppSidebar() {
  const { session, isAdmin } = useAuth();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className='p-4 flex items-center'>
          <img src='/logo.svg' alt='Logo' className='w-20' />
        </SidebarHeader>
        <SidebarSeparator />

        <SidebarContent>
          <SidebarMenu>
            {menuItems.map(
              (item) =>
                (!item.adminOnly || isAdmin) && (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild tooltip={item.name}>
                      <Link
                        href={item.href}
                        className='flex items-center gap-2'
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
            )}
          </SidebarMenu>
          <SidebarMenuItem>
            {session ? (
              <SidebarMenuButton
                onClick={() => signOut({ callbackUrl: '/auth/login' })}
                className='flex items-center gap-2'
              >
                <LogOut />
                <span>Cerrar Sesión</span>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                onClick={() => signIn('auth0')}
                className='flex items-center gap-2'
              >
                <LogIn />
                <span>Iniciar Sesión</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarContent>

        <SidebarFooter className='p-4 text-sm text-center text-gray-500'>
          © 2025 FullStack App
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
