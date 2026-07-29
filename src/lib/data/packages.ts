export type Network = "MTN" | "Telecel" | "AirtelTigo";

export type PackageItem = {
  id: string;
  network: Network;
  name: string;
  dataSize: string;
  validity: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  popular?: boolean;
  inStock: boolean;
  category: "data" | "airtime" | "afa";
};

export const networks: { id: Network; label: string; color: string; bg: string }[] = [
  { id: "MTN", label: "MTN", color: "#FFCC00", bg: "bg-amber-400" },
  { id: "Telecel", label: "Telecel", color: "#E60000", bg: "bg-red-600" },
  { id: "AirtelTigo", label: "AirtelTigo", color: "#ED1C24", bg: "bg-rose-600" },
];

export const packages: PackageItem[] = [
  {
    id: "mtn-1gb",
    network: "MTN",
    name: "MTN 1GB Bundle",
    dataSize: "1GB",
    validity: "30 Days",
    price: 5.5,
    originalPrice: 7,
    discount: 21,
    popular: true,
    inStock: true,
    category: "data",
  },
  {
    id: "mtn-2gb",
    network: "MTN",
    name: "MTN 2GB Bundle",
    dataSize: "2GB",
    validity: "30 Days",
    price: 10,
    originalPrice: 12,
    discount: 17,
    popular: true,
    inStock: true,
    category: "data",
  },
  {
    id: "mtn-5gb",
    network: "MTN",
    name: "MTN 5GB Bundle",
    dataSize: "5GB",
    validity: "30 Days",
    price: 22,
    originalPrice: 28,
    discount: 21,
    inStock: true,
    category: "data",
  },
  {
    id: "mtn-10gb",
    network: "MTN",
    name: "MTN 10GB Bundle",
    dataSize: "10GB",
    validity: "30 Days",
    price: 40,
    originalPrice: 50,
    discount: 20,
    popular: true,
    inStock: true,
    category: "data",
  },
  {
    id: "mtn-20gb",
    network: "MTN",
    name: "MTN 20GB Bundle",
    dataSize: "20GB",
    validity: "30 Days",
    price: 75,
    originalPrice: 95,
    discount: 21,
    inStock: true,
    category: "data",
  },
  {
    id: "telecel-1gb",
    network: "Telecel",
    name: "Telecel 1GB Bundle",
    dataSize: "1GB",
    validity: "30 Days",
    price: 5,
    originalPrice: 6.5,
    discount: 23,
    popular: true,
    inStock: true,
    category: "data",
  },
  {
    id: "telecel-3gb",
    network: "Telecel",
    name: "Telecel 3GB Bundle",
    dataSize: "3GB",
    validity: "30 Days",
    price: 14,
    originalPrice: 18,
    discount: 22,
    inStock: true,
    category: "data",
  },
  {
    id: "telecel-5gb",
    network: "Telecel",
    name: "Telecel 5GB Bundle",
    dataSize: "5GB",
    validity: "30 Days",
    price: 20,
    originalPrice: 26,
    discount: 23,
    popular: true,
    inStock: true,
    category: "data",
  },
  {
    id: "telecel-10gb",
    network: "Telecel",
    name: "Telecel 10GB Bundle",
    dataSize: "10GB",
    validity: "30 Days",
    price: 38,
    originalPrice: 48,
    discount: 21,
    inStock: true,
    category: "data",
  },
  {
    id: "at-1gb",
    network: "AirtelTigo",
    name: "AirtelTigo 1GB Bundle",
    dataSize: "1GB",
    validity: "30 Days",
    price: 4.5,
    originalPrice: 6,
    discount: 25,
    popular: true,
    inStock: true,
    category: "data",
  },
  {
    id: "at-2gb",
    network: "AirtelTigo",
    name: "AirtelTigo 2GB Bundle",
    dataSize: "2GB",
    validity: "30 Days",
    price: 9,
    originalPrice: 11,
    discount: 18,
    inStock: true,
    category: "data",
  },
  {
    id: "at-5gb",
    network: "AirtelTigo",
    name: "AirtelTigo 5GB Bundle",
    dataSize: "5GB",
    validity: "30 Days",
    price: 20,
    originalPrice: 25,
    discount: 20,
    popular: true,
    inStock: true,
    category: "data",
  },
  {
    id: "at-10gb",
    network: "AirtelTigo",
    name: "AirtelTigo 10GB Bundle",
    dataSize: "10GB",
    validity: "30 Days",
    price: 36,
    originalPrice: 45,
    discount: 20,
    inStock: true,
    category: "data",
  },
  {
    id: "afa-reg",
    network: "MTN",
    name: "AFA Registration",
    dataSize: "AFA",
    validity: "Lifetime",
    price: 15,
    inStock: true,
    category: "afa",
  },
  {
    id: "airtime-mtn",
    network: "MTN",
    name: "MTN Airtime",
    dataSize: "Custom",
    validity: "Instant",
    price: 1,
    inStock: true,
    category: "airtime",
  },
];

export const services = [
  {
    id: "mtn",
    title: "MTN Data",
    description: "Affordable MTN bundles with instant delivery.",
    href: "/store?network=MTN",
    accent: "#FFCC00",
    available: true,
  },
  {
    id: "telecel",
    title: "Telecel Data",
    description: "Fast Telecel packages for everyday browsing.",
    href: "/store?network=Telecel",
    accent: "#E60000",
    available: true,
  },
  {
    id: "at",
    title: "AirtelTigo Data",
    description: "Reliable AirtelTigo data at competitive rates.",
    href: "/store?network=AirtelTigo",
    accent: "#ED1C24",
    available: true,
  },
  {
    id: "afa",
    title: "AFA Registration",
    description: "Quick AFA registration with verified processing.",
    href: "/store?category=afa",
    accent: "#0EA5E9",
    available: true,
  },
  {
    id: "airtime",
    title: "Airtime",
    description: "Top up airtime across all major networks.",
    href: "/store?category=airtime",
    accent: "#10B981",
    available: true,
  },
  {
    id: "electricity",
    title: "Electricity",
    description: "ECG and prepaid electricity tokens.",
    href: "#",
    accent: "#F59E0B",
    available: false,
  },
  {
    id: "tv",
    title: "TV Subscription",
    description: "DSTV, GOtv and more — coming soon.",
    href: "#",
    accent: "#6366F1",
    available: false,
  },
  {
    id: "exam",
    title: "Exam Checker",
    description: "WASSCE and BECE result checkers.",
    href: "#",
    accent: "#0A2A66",
    available: false,
  },
  {
    id: "gaming",
    title: "Gaming Vouchers",
    description: "Popular gaming top-ups and vouchers.",
    href: "#",
    accent: "#06B6D4",
    available: false,
  },
  {
    id: "gift",
    title: "Gift Cards",
    description: "Digital gift cards for global brands.",
    href: "#",
    accent: "#EC4899",
    available: false,
  },
];

export const faqs = [
  {
    q: "How fast is delivery?",
    a: "Most data bundles are delivered within seconds after payment confirmation. Peak hours may take up to a few minutes.",
  },
  {
    q: "Which networks do you support?",
    a: "We currently support MTN, Telecel, and AirtelTigo data bundles, airtime, and AFA registration.",
  },
  {
    q: "How do I verify a manual payment?",
    a: "After paying via MoMo or bank transfer, visit Verify Payment, upload your screenshot, and submit your transaction details.",
  },
  {
    q: "Can I get a refund?",
    a: "If a delivery fails and payment was confirmed, our support team will refund or reprocess your order within 24 hours.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. We use encrypted sessions, verified payment workflows, and manual verification safeguards for every transaction.",
  },
  {
    q: "Do you offer discounts?",
    a: "Yes. Popular packages often include discounts, and referral codes unlock extra savings for returning customers.",
  },
];

export type OrderStatus = "pending" | "processing" | "delivered" | "failed" | "refunded";

export type Order = {
  id: string;
  network: Network;
  package: string;
  phone: string;
  amount: number;
  status: OrderStatus;
  date: string;
  reference: string;
};

export const demoOrders: Order[] = [
  {
    id: "MDP-LK2X9-A1B2",
    network: "MTN",
    package: "MTN 5GB Bundle",
    phone: "024****891",
    amount: 22,
    status: "delivered",
    date: "2026-07-27T09:14:00",
    reference: "REF-882910",
  },
  {
    id: "MDP-LK2W1-C3D4",
    network: "Telecel",
    package: "Telecel 3GB Bundle",
    phone: "020****442",
    amount: 14,
    status: "processing",
    date: "2026-07-27T08:41:00",
    reference: "REF-882855",
  },
  {
    id: "MDP-LK2V8-E5F6",
    network: "AirtelTigo",
    package: "AirtelTigo 10GB Bundle",
    phone: "027****119",
    amount: 36,
    status: "delivered",
    date: "2026-07-26T21:05:00",
    reference: "REF-882701",
  },
  {
    id: "MDP-LK2T4-G7H8",
    network: "MTN",
    package: "AFA Registration",
    phone: "054****330",
    amount: 15,
    status: "pending",
    date: "2026-07-26T18:22:00",
    reference: "REF-882640",
  },
  {
    id: "MDP-LK2S0-I9J0",
    network: "MTN",
    package: "MTN 2GB Bundle",
    phone: "055****778",
    amount: 10,
    status: "failed",
    date: "2026-07-25T14:10:00",
    reference: "REF-882501",
  },
];
