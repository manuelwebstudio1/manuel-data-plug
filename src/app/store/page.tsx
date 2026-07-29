import { Suspense } from "react";
import type { Metadata } from "next";
import { StoreClient } from "@/components/store/store-client";
import { fetchAllPackagesFromDb } from "@/lib/supabase/packages";
import { packages as fallbackPackages } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "Store Front",
  description: "Browse affordable MTN, Telecel and AirtelTigo data packages.",
};

export const dynamic = "force-dynamic";

export default async function StorePage() {
  let packages = await fetchAllPackagesFromDb();
  if (packages.length === 0) packages = fallbackPackages;

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="skeleton h-10 w-64 rounded-xl" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      }
    >
      <StoreClient initialPackages={packages} />
    </Suspense>
  );
}
