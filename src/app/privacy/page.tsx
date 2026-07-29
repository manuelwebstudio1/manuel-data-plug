import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0A2A66]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: July 27, 2026</p>
      <div className="prose prose-slate mt-8 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
        <p>
          Manuel Data Plug (&quot;we&quot;, &quot;us&quot;) respects your privacy. This
          policy explains how we collect, use, and protect personal information
          when you use our website and services.
        </p>
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-900">
          Information we collect
        </h2>
        <p>
          Account details (name, email, phone), order and payment verification
          data, device information for security, and support communications.
        </p>
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-900">
          How we use information
        </h2>
        <p>
          To process orders, verify payments, prevent fraud, improve the
          platform, send transactional notifications, and provide customer
          support.
        </p>
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-900">
          Security
        </h2>
        <p>
          We use encrypted transport (HTTPS), hashed passwords, access controls,
          and audit logging. Payment screenshots are used only for verification.
        </p>
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-900">
          Contact
        </h2>
        <p>
          Questions about privacy:{" "}
          <a href="mailto:privacy@manueldataplug.com" className="text-[#0A2A66] underline">
            privacy@manueldataplug.com
          </a>
        </p>
      </div>
    </div>
  );
}
