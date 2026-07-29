import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0A2A66] text-white shadow-lg shadow-[#0A2A66]/20 hover:bg-[#0C347A] hover:shadow-xl hover:shadow-[#0A2A66]/25",
        secondary:
          "bg-white text-[#0A2A66] border border-[#0A2A66]/15 shadow-sm hover:bg-[#F8FAFC] hover:border-[#0A2A66]/25",
        accent:
          "bg-sky-500 text-white shadow-lg shadow-sky-500/25 hover:bg-sky-600",
        ghost: "text-[#0A2A66] hover:bg-[#0A2A66]/05",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20",
        success:
          "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20",
      },
      size: {
        sm: "h-9 px-3.5 text-xs",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
