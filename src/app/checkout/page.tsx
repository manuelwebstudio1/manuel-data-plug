"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Check,
  ChevronRight,
  Smartphone,
  CreditCard,
  Shield,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  "Package",
  "Number",
  "Review",
  "Payment",
  "Confirm",
];

const paymentMethods = [
  { id: "mtn_momo" as const, label: "MTN Mobile Money", hint: "Instant" },
  { id: "telecel_cash" as const, label: "Telecel Cash", hint: "Instant" },
  { id: "at_money" as const, label: "AirtelTigo Money", hint: "Instant" },
  { id: "bank" as const, label: "Bank Transfer", hint: "Manual verify" },
  { id: "manual" as const, label: "Manual Payment", hint: "Upload proof" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    draft,
    setPhone,
    setPaymentMethod,
    setPromoCode,
    applyPromo,
    grandTotal,
    reset,
  } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!draft.package) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
          No package selected
        </h1>
        <p className="mt-2 text-slate-600">
          Choose a package from the store to continue checkout.
        </p>
        <Button className="mt-6" onClick={() => router.push("/store")}>
          Go to Store
        </Button>
      </div>
    );
  }

  const pkg = draft.package;
  const total = grandTotal();

  const applyCode = () => {
    const ok = applyPromo(draft.promoCode);
    if (ok) toast.success("Promo applied");
    else toast.error("Invalid promo code");
  };

  const confirmOrder = async () => {
    if (!draft.phone || draft.phone.length < 10) {
      toast.error("Enter a valid phone number");
      setStep(1);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    toast.success("Order placed — awaiting payment confirmation");
    reset();
    router.push("/orders");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0A2A66]">
        Checkout
      </h1>
      <p className="mt-2 text-slate-600">
        Complete your purchase in a few secure steps.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              step === i
                ? "bg-[#0A2A66] text-white"
                : step > i
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
            }`}
          >
            {step > i ? <Check className="h-3 w-3" /> : i + 1}
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card className="p-6">
            {step === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Selected package
                </h2>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="font-semibold">{pkg.name}</p>
                  <p className="text-sm text-slate-500">
                    {pkg.network} · {pkg.dataSize} · {pkg.validity}
                  </p>
                  <p className="mt-2 text-xl font-bold text-[#0A2A66]">
                    {formatCurrency(pkg.price)}
                  </p>
                </div>
                <Button className="mt-6" onClick={() => setStep(1)}>
                  Continue <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-4 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-sky-500" />
                  <h2 className="text-lg font-semibold">Recipient number</h2>
                </div>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  placeholder="e.g. 024XXXXXXX"
                  value={draft.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="mt-2 text-xs text-slate-500">
                  Enter the number that should receive the data bundle.
                </p>
                <div className="mt-6 flex gap-2">
                  <Button variant="secondary" onClick={() => setStep(0)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (draft.phone.length < 10) {
                        toast.error("Enter a valid phone number");
                        return;
                      }
                      setStep(2);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="mb-4 text-lg font-semibold">Review order</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Package</dt>
                    <dd className="font-medium">{pkg.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Network</dt>
                    <dd className="font-medium">{pkg.network}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Phone</dt>
                    <dd className="font-medium">{draft.phone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Amount</dt>
                    <dd className="font-medium">{formatCurrency(pkg.price)}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex gap-2">
                  <Button variant="secondary" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>Continue</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-sky-500" />
                  <h2 className="text-lg font-semibold">Payment method</h2>
                </div>
                <div className="space-y-2">
                  {paymentMethods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                        draft.paymentMethod === m.id
                          ? "border-[#0A2A66] bg-[#0A2A66]/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="font-medium text-slate-800">
                        {m.label}
                      </span>
                      <Badge variant="muted">{m.hint}</Badge>
                    </button>
                  ))}
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs text-slate-500">
                  <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  Paystack, Flutterwave, Hubtel & ExpressPay coming soon.
                </p>
                <div className="mt-6 flex gap-2">
                  <Button variant="secondary" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(4)}>Continue</Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="mb-2 text-lg font-semibold">Confirm & pay</h2>
                <p className="mb-6 text-sm text-slate-600">
                  You will pay{" "}
                  <strong>{formatCurrency(total)}</strong> via{" "}
                  {
                    paymentMethods.find((m) => m.id === draft.paymentMethod)
                      ?.label
                  }
                  .
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button onClick={confirmOrder} disabled={loading}>
                    {loading ? "Processing…" : "Confirm Order"}
                  </Button>
                </div>
              </motion.div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="sticky top-24 p-6">
            <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[#0A2A66]">
              Order summary
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span>{formatCurrency(pkg.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Discount</span>
                <span className="text-emerald-600">
                  -{formatCurrency(draft.discount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Processing fee</span>
                <span>{formatCurrency(draft.processingFee)}</span>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <div className="flex justify-between text-base font-bold">
                  <span>Grand total</span>
                  <span className="text-[#0A2A66]">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="promo">Promo code</Label>
              <div className="flex gap-2">
                <Input
                  id="promo"
                  placeholder="MANUEL10"
                  value={draft.promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="secondary" type="button" onClick={applyCode}>
                  Apply
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
