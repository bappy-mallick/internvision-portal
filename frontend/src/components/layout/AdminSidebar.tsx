"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Download,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Applications", href: "/admin/applications", icon: Users },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Export Reports", href: "/admin/export", icon: Download },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth(false);

  return (
    <aside className="w-64 min-h-screen border-r border-border bg-card text-card-foreground flex flex-col justify-between p-4 transition-colors">
      <div>
        {/* Brand */}
        <Link href="/admin/dashboard" className="flex items-center space-x-2.5 px-3 py-4 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight block text-foreground leading-none">
              InternVision
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">Admin Portal</span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-[10px] text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="border-t border-border pt-4">
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-3.5 py-2.5 rounded-[10px] text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
