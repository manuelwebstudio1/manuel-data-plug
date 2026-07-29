import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store Front" },
  { href: "/orders", label: "My Orders" },
  { href: "/verify-payment", label: "Verify Payment" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { href: "/store?network=MTN", label: "MTN Data" },
  { href: "/store?network=Telecel", label: "Telecel Data" },
  { href: "/store?network=AirtelTigo", label: "AirtelTigo Data" },
  { href: "/store?category=afa", label: "AFA Registration" },
  { href: "/store?category=airtime", label: "Airtime" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#0A2A66] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4">
            <BrandLogo
              size={44}
              inverted
              wordmarkClassName="text-lg text-white"
            />
          </div>
          <p className="mb-4 max-w-xs text-sm leading-relaxed text-sky-100/80">
            Fast • Affordable • Reliable Data packages. Premium digital products
            delivered instantly across Ghana.
          </p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-sky-200">
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-sky-100/80 transition hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-sky-200">
            Services
          </h3>
          <ul className="space-y-2.5">
            {services.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-sky-100/80 transition hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-sky-200">
            Newsletter
          </h3>
          <p className="mb-3 text-sm text-sky-100/80">
            Get deals and delivery updates in your inbox.
          </p>
          <form className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="h-11 flex-1 rounded-xl border-0 bg-white/10 px-4 text-sm text-white placeholder:text-sky-100/50 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="submit"
              className="h-11 rounded-xl bg-sky-500 px-4 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Subscribe
            </button>
          </form>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-sky-100/70 transition hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-sky-100/60">
        © {new Date().getFullYear()} Manuel Data Plug. All rights reserved.
      </div>
    </footer>
  );
}
