"use client";

import Link from "next/link";
import Image from "next/image";

const networkServices = [
  {
    id: "mtn",
    label: "MTN",
    href: "/store?network=MTN",
    image: "/networks/mtn.svg",
    alt: "MTN",
  },
  {
    id: "telecel",
    label: "TELECEL",
    href: "/store?network=Telecel",
    image: "/networks/telecel.svg",
    alt: "Telecel",
  },
  {
    id: "airteltigo",
    label: "AirtelTigo",
    href: "/store?network=AirtelTigo",
    image: "/networks/airteltigo.svg",
    alt: "AirtelTigo",
  },
  {
    id: "afa",
    label: "MTN AFA",
    href: "/store?category=afa",
    image: "/networks/mtn-afa.png",
    alt: "MTN AFA Registration",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-white">
      {/* Fast Delivery notice — matches reference layout */}
      <div className="border-b border-slate-200 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Fast Delivery
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Delivery is between 5mins to 15mins, Maximum is 30mins. Make sure the
            beneficiary number is correct.
          </p>
        </div>
      </div>

      {/* NEW PRODUCT banner — crisp vector graphic */}
      <div className="border-b border-slate-100 px-4 py-6 sm:px-6">
        <div className="relative mx-auto h-[120px] w-full max-w-md sm:h-[150px] sm:max-w-lg">
          <Image
            src="/networks/new-product.svg"
            alt="New Product"
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 512px"
            className="object-contain object-center"
          />
        </div>
      </div>

      {/* OUR SERVICES 2x2 grid */}
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-8 text-center font-[family-name:var(--font-poppins)] text-2xl font-extrabold tracking-wide text-slate-900 sm:text-3xl">
            OUR SERVICES
          </h3>

          <div className="grid grid-cols-2 gap-5 sm:gap-8">
            {networkServices.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col items-center"
              >
                <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="object-cover"
                    priority
                    unoptimized={item.image.endsWith(".svg")}
                  />
                </div>
                <span className="mt-3 text-center font-[family-name:var(--font-poppins)] text-base font-extrabold tracking-wide text-slate-900 sm:text-lg">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
