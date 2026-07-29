"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Wallet,
  ShieldCheck,
  Ticket,
  Settings,
  Activity,
  BarChart3,
  FileText,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/verifications", label: "Payment Verify", icon: ShieldCheck },
  { href: "/admin/wallet", label: "Wallet", icon: Wallet },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/tickets", label: "Support", icon: Ticket },
  { href: "/admin/notifications", label: "Broadcasts", icon: Bell },
  { href: "/admin/logs", label: "Audit Logs", icon: FileText },
  { href: "/admin/health", label: "System Health", icon: Activity },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-[#0A2A66] text-white lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-5">
          <Image
            src="/logo.png"
            alt="Manuel Data Plug"
            width={36}
            height={36}
            className="shrink-0 rounded-full object-cover ring-1 ring-white/20"
            priority
          />
          <div>
            <p className="text-sm font-semibold">Manuel Admin</p>
            <p className="text-[10px] text-sky-200">Control Center</p>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-white text-[#0A2A66]"
                    : "text-sky-100/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="text-xs font-medium text-sky-200 hover:text-white"
          >
            ← Back to website
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-2 lg:hidden">
            <Image
              src="/logo.png"
              alt="Manuel Data Plug"
              width={28}
              height={28}
              className="rounded-full object-cover"
            />
            <p className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-[#0A2A66]">
              Admin
            </p>
          </div>
          <p className="hidden text-sm text-slate-500 lg:block">
            Manuel Data Plug · Operations
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              System healthy
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A2A66] text-xs font-bold text-white">
              A
            </span>
          </div>
        </header>
        <div className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 lg:hidden">
          {nav.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
