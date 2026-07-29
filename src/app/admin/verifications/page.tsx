"use client";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const queue: {
  id: string;
  user: string;
  amount: number;
  network: string;
  ref: string;
  status: "pending";
}[] = [];

export default function AdminVerificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
          Payment verification
        </h1>
        <p className="text-sm text-slate-500">
          Approve or reject manual payment submissions.
        </p>
      </div>

      {queue.length === 0 ? (
        <Card className="p-8 text-center text-sm text-slate-500">
          No pending payment verifications.
        </Card>
      ) : (
        <div className="space-y-3">
          {queue.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <p className="font-semibold text-slate-900">{item.id}</p>
                  <Badge variant="warning">{item.status}</Badge>
                </div>
                <p className="text-sm text-slate-600">
                  {item.user} · {item.network} · {item.ref}
                </p>
                <p className="mt-1 font-semibold text-[#0A2A66]">
                  {formatCurrency(item.amount)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => toast.success(`${item.id} approved`)}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => toast.error(`${item.id} rejected`)}
                >
                  Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
