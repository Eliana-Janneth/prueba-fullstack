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
  SidebarTrigger,
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
        <SidebarHeader className="p-4 font-bold">LOGO</SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <Link href={item.href}>
                  <SidebarMenuButton tooltip={item.name} isActive={false}>
                    {item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
  
      </Sidebar>
    </SidebarProvider>
  );
}
