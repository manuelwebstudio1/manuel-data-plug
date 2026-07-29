"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-[#0A2A66] px-8 py-14 text-center shadow-2xl shadow-[#0A2A66]/20 sm:px-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#0EA5E944,_transparent_50%)]" />
          <div className="relative">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white sm:text-4xl">
              Ready to buy data in seconds?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sky-100/80">
              Create an account, pick a package, pay securely, and get instant
              delivery — any time of day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/store">
                <Button size="lg" variant="accent">
                  Browse Store
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  className="border border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
