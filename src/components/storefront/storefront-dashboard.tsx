"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Copy,
  Package,
  ShoppingBag,
  Wallet,
  Settings,
  LayoutDashboard,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";

const menu = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "withdrawals", label: "Withdrawals", icon: Wallet },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type MenuId = (typeof menu)[number]["id"];

function slugFromIdentity(value: string | null | undefined) {
  if (!value) return "seller";
  const base = value.includes("@") ? value.split("@")[0] : value;
  return (
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 16) || "seller"
  );
}

export function StorefrontDashboard() {
  const [tab, setTab] = useState<MenuId>("overview");
  const [slug, setSlug] = useState("seller");
  const [displayName, setDisplayName] = useState("Seller");
  const [showTop, setShowTop] = useState(false);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    (typeof window !== "undefined" ? window.location.origin : "https://manuel-data-plug.vercel.app");

  const storeLink = useMemo(
    () => `${appUrl}/store?ref=${slug}`,
    [appUrl, slug]
  );

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user || !active) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("username, full_name, email, phone")
        .eq("id", user.id)
        .maybeSingle();

      const row = profile as {
        username?: string | null;
        full_name?: string | null;
        email?: string | null;
        phone?: string | null;
      } | null;

      const identity =
        row?.username ||
        row?.email ||
        user.email ||
        row?.phone ||
        user.id.slice(0, 8);

      if (!active) return;
      setSlug(slugFromIdentity(identity));
      setDisplayName(row?.full_name || row?.username || identity || "Seller");
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(storeLink);
      toast.success("Store link copied");
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-sky-700">Welcome back</p>
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
          {displayName}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your Manuel Data Plug storefront.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Seller Menu
          </h2>
          <div className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition ${
                    active
                      ? "bg-[#0A2A66] text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </Card>

        {tab === "overview" && (
          <Card className="space-y-5 p-4 sm:p-6">
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-slate-900">
              Dashboard Overview
            </h2>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-800">
                Your Store Link
              </p>
              <Input
                readOnly
                value={storeLink}
                className="mb-3 bg-white font-mono text-xs sm:text-sm"
              />
              <Button
                variant="secondary"
                className="w-full border-[#0A2A66] text-[#0A2A66]"
                onClick={copyLink}
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
              <p className="mt-2 text-xs text-slate-500">
                Share this link with customers.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="mb-1 text-sm font-semibold text-slate-800">
                Wallet Balance
              </p>
              <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
                {formatCurrency(0)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="mb-1 text-sm font-semibold text-slate-800">
                Store Status
              </p>
              <Badge variant="success">Open</Badge>
            </div>
          </Card>
        )}

        {tab === "products" && (
          <Card className="space-y-4 p-4 sm:p-6">
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-slate-900">
              Products
            </h2>
            <p className="text-sm text-slate-500">
              Browse and sell Manuel Data Plug packages from your storefront.
            </p>
            <Link href="/store">
              <Button className="w-full sm:w-auto">View packages</Button>
            </Link>
          </Card>
        )}

        {tab === "orders" && (
          <Card className="space-y-4 p-4 sm:p-6">
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-slate-900">
              Orders
            </h2>
            <p className="text-sm text-slate-500">
              No storefront orders yet. New customer orders will appear here.
            </p>
            <Link href="/orders">
              <Button variant="secondary" className="w-full sm:w-auto">
                Open my orders
              </Button>
            </Link>
          </Card>
        )}

        {tab === "withdrawals" && (
          <Card className="space-y-4 p-4 sm:p-6">
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-slate-900">
              Withdrawals
            </h2>
            <p className="text-sm text-slate-500">
              Available balance: {formatCurrency(0)}
            </p>
            <Button
              className="w-full sm:w-auto"
              onClick={() => toast.message("Withdrawals will be enabled soon")}
            >
              Request withdrawal
            </Button>
          </Card>
        )}

        {tab === "settings" && (
          <Card className="space-y-4 p-4 sm:p-6">
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-slate-900">
              Settings
            </h2>
            <p className="text-sm text-slate-500">
              Update your profile, password, and notification preferences.
            </p>
            <Link href="/profile">
              <Button variant="secondary" className="w-full sm:w-auto">
                Go to profile settings
              </Button>
            </Link>
          </Card>
        )}
      </div>

      {showTop ? (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A2A66] text-white shadow-lg sm:bottom-6"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
