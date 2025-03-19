"use client";

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
} from "@components/ui/sidebar";
import Link from "next/link";
import { Home, Users, BarChart2 } from "lucide-react";

const menuItems = [
  { name: "Ingresos y egresos", href: "/movements", icon: <Home /> },
  { name: "Usuarios", href: "/users", icon: <Users /> },
  { name: "Reportes", href: "/reports", icon: <BarChart2 /> },
];

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 font-bold text-lg text-center">LOGO</SidebarHeader>
        <SidebarSeparator />

        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={item.name}>
                  <Link href={item.href} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 text-sm text-center text-gray-500">
          © 2025 FullStack App
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
