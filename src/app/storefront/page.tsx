import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { StorefrontDashboard } from "@/components/storefront/storefront-dashboard";
import { createCookieSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Storefront",
  description: "Manage your Manuel Data Plug seller storefront.",
};

export default async function StorefrontPage() {
  const supabase = await createCookieSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/storefront&reason=login-required");
  }

  return <StorefrontDashboard />;
}
