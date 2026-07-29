"use client";

import { packages } from "@/lib/data/packages";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminPackagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
            Packages & pricing
          </h1>
          <p className="text-sm text-slate-500">
            Manage networks, bundles, discounts, and stock.
          </p>
        </div>
        <Button onClick={() => toast.message("Package editor coming soon")}>
          Add package
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Network</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-slate-50">
                  <td className="px-4 py-3 font-medium">{pkg.name}</td>
                  <td className="px-4 py-3">{pkg.network}</td>
                  <td className="px-4 py-3">{pkg.dataSize}</td>
                  <td className="px-4 py-3">{formatCurrency(pkg.price)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={pkg.inStock ? "success" : "danger"}>
                      {pkg.inStock ? "In stock" : "Out"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.message(`Edit ${pkg.name}`)}
                    >
                      Edit
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
