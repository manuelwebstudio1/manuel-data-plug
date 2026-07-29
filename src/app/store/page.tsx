import { Suspense } from "react";
import type { Metadata } from "next";
import { StoreClient } from "@/components/store/store-client";

export const metadata: Metadata = {
  title: "Store Front",
  description: "Browse affordable MTN, Telecel and AirtelTigo data packages.",
};

export default function StorePage() {
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
      <StoreClient />
    </Suspense>
  );
}
