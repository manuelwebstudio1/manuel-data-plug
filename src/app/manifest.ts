import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Manuel Data Plug",
    short_name: "Manuel Data",
    description: "Fast • Affordable • Reliable Data packages",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0A2A66",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
