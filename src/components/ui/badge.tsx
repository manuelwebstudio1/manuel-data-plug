import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "muted";
}) {
  const styles = {
    default: "bg-[#0A2A66]/10 text-[#0A2A66]",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-orange-50 text-orange-700",
    danger: "bg-red-50 text-red-700",
    info: "bg-sky-50 text-sky-700",
    muted: "bg-slate-100 text-slate-600",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
