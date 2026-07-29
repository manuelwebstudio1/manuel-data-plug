import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://manueldataplug.com";
  const routes = [
    "",
    "/store",
    "/orders",
    "/verify-payment",
    "/profile",
    "/login",
    "/register",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
