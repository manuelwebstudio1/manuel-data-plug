"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  packages as fallbackPackages,
  networks,
  type Network,
  type PackageItem,
} from "@/lib/data/packages";
import { formatCurrency, cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function StoreClient({
  initialPackages,
}: {
  initialPackages?: PackageItem[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setPackage = useCart((s) => s.setPackage);
  const catalog =
    initialPackages && initialPackages.length > 0
      ? initialPackages
      : fallbackPackages;

  const initialNetwork = (searchParams.get("network") as Network) || "All";
  const initialCategory = searchParams.get("category") || "all";

  const [query, setQuery] = useState("");
  const [network, setNetwork] = useState<Network | "All">(
    networks.some((n) => n.id === initialNetwork) ? initialNetwork : "All"
  );
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">(
    "popular"
  );

  const filtered = useMemo(() => {
    let list = [...catalog];
    if (network !== "All") list = list.filter((p) => p.network === network);
    if (category !== "all")
      list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.dataSize.toLowerCase().includes(q) ||
          p.network.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => Number(b.popular) - Number(a.popular));
    return list;
  }, [catalog, network, category, query, sort]);

  const buy = (pkg: PackageItem) => {
    setPackage(pkg);
    toast.success(`${pkg.name} selected`);
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0A2A66] sm:text-4xl">
          Store Front
        </h1>
        <p className="mt-2 text-slate-600">
          Browse packages, filter by network, and checkout in seconds.
        </p>
      </div>

      <Card className="mb-8 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10"
              placeholder="Search packages, data size, network…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="hidden h-4 w-4 text-slate-400 sm:block" />
            <select
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-sky-400/30"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="data">Data Bundles</option>
              <option value="airtime">Airtime</option>
              <option value="afa">AFA Registration</option>
            </select>
            <select
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-sky-400/30"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "popular" | "price-asc" | "price-desc")
              }
            >
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setNetwork("All")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition",
              network === "All"
                ? "bg-[#0A2A66] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            All Networks
          </button>
          {networks.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setNetwork(n.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition",
                network === n.id
                  ? "bg-[#0A2A66] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {n.label}
            </button>
          ))}
        </div>
      </Card>

      <div className="mb-4 text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
        packages
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.4) }}
          >
            <Card className="group relative flex h-full flex-col overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white",
                      pkg.network === "MTN" && "bg-amber-400 text-slate-900",
                      pkg.network === "Telecel" && "bg-red-600",
                      pkg.network === "AirtelTigo" && "bg-rose-600"
                    )}
                  >
                    {pkg.network.slice(0, 3).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {pkg.network}
                    </p>
                    <p className="font-semibold text-slate-900">{pkg.dataSize}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {pkg.discount ? (
                    <Badge variant="danger">-{pkg.discount}%</Badge>
                  ) : null}
                  {pkg.popular ? <Badge variant="info">Popular</Badge> : null}
                </div>
              </div>

              <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-slate-900">
                {pkg.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Validity: {pkg.validity}
              </p>

              <div className="mt-auto pt-5">
                <div className="mb-3 flex items-end gap-2">
                  <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
                    {formatCurrency(pkg.price)}
                  </span>
                  {pkg.originalPrice ? (
                    <span className="mb-1 text-sm text-slate-400 line-through">
                      {formatCurrency(pkg.originalPrice)}
                    </span>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Badge variant={pkg.inStock ? "success" : "danger"}>
                    {pkg.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <Button
                  className="w-full"
                  disabled={!pkg.inStock}
                  onClick={() => buy(pkg)}
                >
                  Buy Now
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-slate-500">
          No packages match your filters.
        </div>
      )}
    </div>
  );
}
