"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    src: "/hero/slide-1.png",
    alt: "Deep blue mobile connectivity and network signals",
  },
  {
    src: "/hero/slide-2.png",
    alt: "Data streams and digital network mesh",
  },
  {
    src: "/hero/slide-3.png",
    alt: "Premium smartphone with glowing data waves",
  },
];

const SLIDE_MS = 7000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, index]);

  return (
    <section
      className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#061833]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Full-bleed image slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[index].src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Deep blue brand wash — keeps imagery visible but premium */}
        <div className="absolute inset-0 bg-[#0A2A66]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04122A]/92 via-[#0A2A66]/70 to-[#0A2A66]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04122A]/90 via-transparent to-[#04122A]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_#0EA5E922,_transparent_55%)]" />
      </div>

      {/* Soft animated light accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-sky-400/15 blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#0A2A66]/40 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-5 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Manuel Data Plug
          </p>
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            Affordable Data Bundles Delivered Instantly.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sky-100/85 sm:text-xl">
            Premium MTN, Telecel & AirtelTigo packages with secure payments and
            24/7 delivery — built for speed and trust.
          </p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Link href="/store">
              <Button size="xl" variant="accent" className="shadow-xl shadow-sky-500/25">
                Buy Data
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="xl"
                className="border-0 bg-white text-[#0A2A66] shadow-xl hover:bg-sky-50"
              >
                Create Account
              </Button>
            </Link>
            <Link href="/store">
              <Button
                size="xl"
                className="border border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                View Packages
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Slider controls */}
        <div className="absolute bottom-8 left-4 right-4 z-20 flex items-center justify-between sm:left-6 sm:right-6 lg:left-8 lg:right-8">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="group relative h-1.5 overflow-hidden rounded-full bg-white/25"
                  style={{ width: i === index ? 36 : 8 }}
                >
                  {i === index && (
                    <motion.span
                      key={`progress-${index}`}
                      className="absolute inset-y-0 left-0 bg-sky-400"
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "0%" : "100%" }}
                      transition={{
                        duration: paused ? 0 : SLIDE_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="hidden text-xs font-medium tracking-wider text-white/60 sm:inline">
              0{index + 1} / 0{slides.length}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
