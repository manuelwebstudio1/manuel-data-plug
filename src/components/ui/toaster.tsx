"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "rounded-xl border border-slate-200 shadow-lg",
        },
      }}
    />,
    document.body
  );
}
