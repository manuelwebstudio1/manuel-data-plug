import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  inverted?: boolean;
};

export function BrandLogo({
  href = "/",
  className,
  size = 40,
  showWordmark = true,
  wordmarkClassName,
  inverted = false,
}: BrandLogoProps) {
  const content = (
    <>
      <Image
        src="/logo.png"
        alt="Manuel Data Plug"
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover shadow-md ring-1 ring-white/10"
        priority
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-[family-name:var(--font-poppins)] text-base font-semibold tracking-tight sm:text-lg",
            inverted ? "text-white" : "text-[#0A2A66]",
            wordmarkClassName
          )}
        >
          Manuel Data Plug
        </span>
      ) : null}
    </>
  );

  if (href === undefined || href === "") {
    return (
      <div className={cn("inline-flex items-center gap-2.5", className)}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      {content}
    </Link>
  );
}
