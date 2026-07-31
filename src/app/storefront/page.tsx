import type { Metadata } from "next";
import { StorefrontDashboard } from "@/components/storefront/storefront-dashboard";

export const metadata: Metadata = {
  title: "Storefront",
  description: "Manage your Manuel Data Plug seller storefront.",
};

export default function StorefrontPage() {
  return <StorefrontDashboard />;
}
