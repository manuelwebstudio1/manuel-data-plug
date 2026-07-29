import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manueldataplug.com"),
  title: {
    default: "Manuel Data Plug | Fast • Affordable • Reliable Data",
    template: "%s | Manuel Data Plug",
  },
  description:
    "Buy affordable MTN, Telecel & AirtelTigo data bundles with instant delivery. Secure payments, 24/7 support, premium digital products.",
  keywords: [
    "MTN data",
    "Telecel data",
    "AirtelTigo data",
    "Ghana data bundles",
    "AFA registration",
    "airtime",
    "Manuel Data Plug",
  ],
  authors: [{ name: "Manuel Data Plug" }],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://manueldataplug.com",
    siteName: "Manuel Data Plug",
    title: "Manuel Data Plug | Affordable Data Bundles Delivered Instantly",
    description:
      "Fast • Affordable • Reliable Data packages across MTN, Telecel & AirtelTigo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Data Plug",
    description: "Affordable Data Bundles Delivered Instantly.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://manueldataplug.com" },
};

export const viewport: Viewport = {
  themeColor: "#0A2A66",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
