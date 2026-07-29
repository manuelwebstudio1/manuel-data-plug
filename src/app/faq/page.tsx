"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data/packages";
import { Card } from "@/components/ui/card";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0A2A66]">
          Frequently asked questions
        </h1>
        <p className="mt-2 text-slate-600">
          Quick answers about delivery, payments, and support.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Card key={faq.q} className="overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="pr-4 font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
