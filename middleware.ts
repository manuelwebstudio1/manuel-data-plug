import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/storefront",
    "/storefront/:path*",
    "/checkout",
    "/checkout/:path*",
    "/orders",
    "/orders/:path*",
    "/verify-payment",
    "/verify-payment/:path*",
    "/profile",
    "/profile/:path*",
  ],
};
