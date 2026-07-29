"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  LayoutGrid,
  ClipboardList,
  ShieldCheck,
  UserRound,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";

const links = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/store", label: "Store Front", icon: ShoppingBag },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/verify-payment", label: "Verify Payment", icon: ShieldCheck },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo size={40} className="transition group-hover:opacity-95" />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-[#0A2A66]/08 text-[#0A2A66]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0A2A66]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Create Account</Button>
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0A2A66] lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(100%,320px)] flex-col bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
                <span className="font-[family-name:var(--font-poppins)] font-semibold text-[#0A2A66]">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 p-4">
                {links.map((link, i) => {
                  const Icon = link.icon;
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                          active
                            ? "bg-[#0A2A66] text-white"
                            : "text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="space-y-2 border-t border-slate-100 p-4">
                <Link href="/login" className="block">
                  <Button variant="secondary" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full">Create Account</Button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
