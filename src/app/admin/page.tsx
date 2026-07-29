"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const revenue = [
  { day: "Mon", amount: 0 },
  { day: "Tue", amount: 0 },
  { day: "Wed", amount: 0 },
  { day: "Thu", amount: 0 },
  { day: "Fri", amount: 0 },
  { day: "Sat", amount: 0 },
  { day: "Sun", amount: 0 },
];

const kpis = [
  { label: "Today revenue", value: formatCurrency(0) },
  { label: "Orders today", value: "0" },
  { label: "Pending verifications", value: "0" },
  { label: "Active customers", value: "0" },
];

const attention = [
  { t: "0 payment verifications", s: "Clear" },
  { t: "0 failed deliveries", s: "Clear" },
  { t: "0 support tickets", s: "Clear" },
  { t: "0 stock warnings", s: "Clear" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Revenue, orders, and platform health at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <p className="text-sm text-slate-500">{k.label}</p>
            <p className="mt-1 font-[family-name:var(--font-poppins)] text-2xl font-bold text-slate-900">
              {k.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <h2 className="mb-4 font-semibold text-slate-900">Weekly revenue</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A2A66" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0A2A66" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#0A2A66"
                  fill="url(#rev)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 font-semibold text-slate-900">Needs attention</h2>
          <ul className="space-y-3 text-sm">
            {attention.map((item) => (
              <li
                key={item.t}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
              >
                <span>{item.t}</span>
                <Badge variant="success">{item.s}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
