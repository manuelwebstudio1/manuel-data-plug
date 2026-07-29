import { NextResponse } from "next/server";
import { fetchAllPackagesFromDb } from "@/lib/supabase/packages";

export async function GET() {
  const packages = await fetchAllPackagesFromDb();
  return NextResponse.json({ packages, source: "supabase" });
}
