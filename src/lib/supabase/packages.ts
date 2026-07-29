import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { BundleRow, NetworkCode } from "@/types/database";
import type { Network, PackageItem } from "@/lib/data/packages";

function mapNetwork(code: NetworkCode): Network {
  if (code === "TELECEL") return "Telecel";
  if (code === "AIRTELTIGO") return "AirtelTigo";
  return "MTN";
}

export function mapBundleToPackage(row: BundleRow): PackageItem {
  const networkCode = row.networks?.code ?? "MTN";
  return {
    id: row.id,
    network: mapNetwork(networkCode),
    name: row.name,
    dataSize: row.data_size,
    validity: row.validity,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    discount: row.discount ?? undefined,
    popular: row.popular,
    inStock: row.in_stock,
    category: (row.category as PackageItem["category"]) || "data",
  };
}

export async function fetchPackagesFromDb(): Promise<PackageItem[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bundles")
    .select("*, networks(code, name)")
    .eq("in_stock", true)
    .order("popular", { ascending: false })
    .order("price", { ascending: true });

  if (error) {
    console.error("Failed to fetch bundles:", error.message);
    return [];
  }

  return (data as BundleRow[]).map(mapBundleToPackage);
}

export async function fetchAllPackagesFromDb(): Promise<PackageItem[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bundles")
    .select("*, networks(code, name)")
    .order("popular", { ascending: false })
    .order("price", { ascending: true });

  if (error) {
    console.error("Failed to fetch bundles:", error.message);
    return [];
  }

  return (data as BundleRow[]).map(mapBundleToPackage);
}
