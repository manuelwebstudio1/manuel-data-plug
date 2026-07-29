"use client";

import { demoOrders } from "@/lib/data/packages";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
            Orders
          </h1>
          <p className="text-sm text-slate-500">
            Refund, reprocess, and export customer orders.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => toast.success("CSV exported")}>
            Export CSV
          </Button>
          <Button variant="secondary" onClick={() => toast.success("Excel exported")}>
            Export Excel
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoOrders.map((o) => (
                <tr key={o.id} className="border-b border-slate-50">
                  <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                  <td className="px-4 py-3">{o.package}</td>
                  <td className="px-4 py-3">{o.phone}</td>
                  <td className="px-4 py-3">
                    <Badge>{o.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(o.date)}</td>
                  <td className="px-4 py-3 font-semibold">
                    {formatCurrency(o.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.message(`Refund queued for ${o.id}`)}
                    >
                      Refund
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
