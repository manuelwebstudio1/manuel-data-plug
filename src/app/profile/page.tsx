"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Wallet,
  Bell,
  Heart,
  Phone,
  Gift,
  User,
  Shield,
  Moon,
  Sun,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const tabs = [
  "Overview",
  "Personal Info",
  "Security",
  "Saved Numbers",
  "Notifications",
] as const;

export default function ProfilePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A2A66] text-2xl font-bold text-white shadow-lg">
            M
            <button
              type="button"
              className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 text-[10px] font-semibold text-[#0A2A66] shadow"
              onClick={() => toast.message("Avatar upload coming soon")}
            >
              Edit
            </button>
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
              Manuel Customer
            </h1>
            <p className="text-sm text-slate-500">@manuel · Profile 80% complete</p>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === t
                ? "bg-[#0A2A66] text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Wallet balance",
              value: formatCurrency(125.5),
              icon: Wallet,
              color: "bg-sky-50 text-sky-600",
            },
            {
              label: "Referral earnings",
              value: formatCurrency(48),
              icon: Gift,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Favourite bundles",
              value: "4",
              icon: Heart,
              color: "bg-rose-50 text-rose-600",
            },
            {
              label: "Saved numbers",
              value: "3",
              icon: Phone,
              color: "bg-orange-50 text-orange-600",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="p-5">
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-1 font-[family-name:var(--font-poppins)] text-2xl font-bold text-slate-900">
                  {item.value}
                </p>
              </Card>
            );
          })}

          <Card className="p-5 md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-sky-500" />
              <h2 className="font-semibold">Recent activity</h2>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "MTN 5GB delivered to 024****891",
                "Payment verification pending · REF-882640",
                "Promo MANUEL10 applied on checkout",
              ].map((a) => (
                <li
                  key={a}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
                >
                  <span>{a}</span>
                  <Badge variant="muted">Today</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 md:col-span-2">
            <h2 className="mb-4 font-semibold">Profile completion</h2>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-4/5 rounded-full bg-[#0A2A66]" />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Add a profile photo and verify your phone to reach 100%.
            </p>
          </Card>
        </div>
      )}

      {tab === "Personal Info" && (
        <Card className="max-w-xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-sky-500" />
            <h2 className="font-semibold">Personal information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Full name</Label>
              <Input defaultValue="Manuel Customer" />
            </div>
            <div>
              <Label>Email</Label>
              <Input defaultValue="manuel@example.com" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input defaultValue="0240000000" />
            </div>
            <Button onClick={() => toast.success("Profile updated")}>
              Save changes
            </Button>
          </div>
        </Card>
      )}

      {tab === "Security" && (
        <Card className="max-w-xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-sky-500" />
            <h2 className="font-semibold">Security settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Current password</Label>
              <Input type="password" />
            </div>
            <div>
              <Label>New password</Label>
              <Input type="password" />
            </div>
            <div>
              <Label>Confirm new password</Label>
              <Input type="password" />
            </div>
            <Button onClick={() => toast.success("Password updated")}>
              Update password
            </Button>
          </div>
        </Card>
      )}

      {tab === "Saved Numbers" && (
        <Card className="max-w-xl p-6">
          <h2 className="mb-4 font-semibold">Saved numbers</h2>
          <ul className="space-y-2">
            {["024****891", "020****442", "027****119"].map((n) => (
              <li
                key={n}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"
              >
                <span className="font-medium">{n}</span>
                <Button size="sm" variant="ghost">
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <Input placeholder="Add phone number" />
            <Button onClick={() => toast.success("Number saved")}>Add</Button>
          </div>
        </Card>
      )}

      {tab === "Notifications" && (
        <Card className="max-w-xl p-6">
          <h2 className="mb-4 font-semibold">Notification settings</h2>
          {[
            "Order updates",
            "Payment verification",
            "Promotions & deals",
            "Login alerts",
          ].map((item) => (
            <label
              key={item}
              className="mb-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"
            >
              <span>{item}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
          ))}
          <Button onClick={() => toast.success("Preferences saved")}>
            Save preferences
          </Button>
        </Card>
      )}
    </div>
  );
}
