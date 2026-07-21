import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--accent)]/40 bg-black/55 p-2 shadow-[0_0_36px_rgba(216,167,99,0.24)] ring-1 ring-[rgba(255,214,114,0.1)]">
        <Image
          src={siteConfig.logo}
          alt={`${siteConfig.siteName} logo`}
          width={compact ? 48 : 56}
          height={compact ? 48 : 56}
          className="h-full w-full rounded-full object-cover"
          priority
        />
      </span>
      {compact ? (
        <span className="sr-only">{siteConfig.siteName}</span>
      ) : (
        <span className="max-w-[15rem] text-sm font-semibold uppercase tracking-[0.22em] text-[var(--cream)]">
          {siteConfig.siteName}
        </span>
      )}
    </div>
  );
}
