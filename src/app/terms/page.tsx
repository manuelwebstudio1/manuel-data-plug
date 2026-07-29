import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0A2A66]">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: July 27, 2026</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-slate-600">
        <p>
          By using Manuel Data Plug you agree to these terms. If you do not
          agree, please do not use the service.
        </p>
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-900">
          Services
        </h2>
        <p>
          We sell digital products including mobile data bundles, airtime, and
          AFA registration. Delivery times may vary based on network conditions.
        </p>
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-900">
          Payments & refunds
        </h2>
        <p>
          Orders are processed after payment confirmation. Failed deliveries with
          confirmed payment may be refunded or reprocessed within 24 hours after
          review.
        </p>
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-900">
          Acceptable use
        </h2>
        <p>
          You may not misuse the platform for fraud, abuse referral systems, or
          attempt unauthorized access to accounts or admin systems.
        </p>
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-900">
          Contact
        </h2>
        <p>
          Legal inquiries:{" "}
          <a href="mailto:legal@manueldataplug.com" className="text-[#0A2A66] underline">
            legal@manueldataplug.com
          </a>
        </p>
      </div>
    </div>
  );
}
