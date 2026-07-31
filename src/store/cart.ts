"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PackageItem } from "@/lib/data/packages";

export type CheckoutDraft = {
  package: PackageItem | null;
  phone: string;
  /** MoMo / wallet number the customer is paying from */
  payerPhone: string;
  paymentMethod: "mtn_momo" | "telecel_cash" | "at_money" | "bank" | "manual";
  promoCode: string;
  discount: number;
  processingFee: number;
};

type CartState = {
  draft: CheckoutDraft;
  setPackage: (pkg: PackageItem) => void;
  setPhone: (phone: string) => void;
  setPayerPhone: (phone: string) => void;
  setPaymentMethod: (method: CheckoutDraft["paymentMethod"]) => void;
  setPromoCode: (code: string) => void;
  applyPromo: (code: string) => boolean;
  reset: () => void;
  grandTotal: () => number;
};

const initialDraft: CheckoutDraft = {
  package: null,
  phone: "",
  payerPhone: "",
  paymentMethod: "mtn_momo",
  promoCode: "",
  discount: 0,
  processingFee: 0,
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      setPackage: (pkg) =>
        set((s) => ({ draft: { ...s.draft, package: pkg } })),
      setPhone: (phone) => set((s) => ({ draft: { ...s.draft, phone } })),
      setPayerPhone: (payerPhone) =>
        set((s) => ({ draft: { ...s.draft, payerPhone } })),
      setPaymentMethod: (paymentMethod) =>
        set((s) => ({ draft: { ...s.draft, paymentMethod } })),
      setPromoCode: (promoCode) =>
        set((s) => ({ draft: { ...s.draft, promoCode } })),
      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        if (normalized === "MANUEL10") {
          set((s) => ({
            draft: { ...s.draft, promoCode: normalized, discount: 10 },
          }));
          return true;
        }
        if (normalized === "DATA5") {
          set((s) => ({
            draft: { ...s.draft, promoCode: normalized, discount: 5 },
          }));
          return true;
        }
        set((s) => ({ draft: { ...s.draft, discount: 0 } }));
        return false;
      },
      reset: () => set({ draft: initialDraft }),
      grandTotal: () => {
        const { package: pkg, discount, processingFee } = get().draft;
        if (!pkg) return 0;
        return Math.max(0, pkg.price - discount + processingFee);
      },
    }),
    { name: "mdp-checkout" }
  )
);
