"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { demoOrders, type OrderStatus } from "@/lib/data/packages";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const statusVariant: Record<
  OrderStatus,
  "success" | "warning" | "danger" | "info" | "muted"
> = {
  delivered: "success",
  processing: "info",
  pending: "warning",
  failed: "danger",
  refunded: "muted",
};

export default function OrdersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "amount">("newest");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    let list = [...demoOrders];
    if (status !== "all") list = list.filter((o) => o.status === status);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.package.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          o.reference.toLowerCase().includes(q)
      );
    }
    if (sort === "newest")
      list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    else if (sort === "oldest")
      list.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    else list.sort((a, b) => b.amount - a.amount);
    return list;
  }, [query, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0A2A66]">
          My Orders
        </h1>
        <p className="mt-2 text-slate-600">
          Track deliveries, download receipts, and filter your purchase history.
        </p>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10"
              placeholder="Search order ID, package, phone, reference…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as "all" | OrderStatus);
              setPage(1);
            }}
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "newest" | "oldest" | "amount")
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="amount">Highest amount</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Network</th>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-50 transition hover:bg-slate-50/80"
                >
                  <td className="px-4 py-3.5 font-mono text-xs font-medium text-slate-800">
                    {order.id}
                  </td>
                  <td className="px-4 py-3.5">{order.network}</td>
                  <td className="px-4 py-3.5">{order.package}</td>
                  <td className="px-4 py-3.5">{order.phone}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={statusVariant[order.status]}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-4 py-3.5 font-semibold">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="px-4 py-3.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        toast.success(`Receipt ${order.reference} ready`)
                      }
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            No orders yet. Your purchases will appear here.
          </div>
        )}
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-500">
            Page {page} of {totalPages} · {filtered.length} orders
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
