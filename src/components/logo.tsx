import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={siteConfig.logo}
        alt={`${siteConfig.siteName} logo`}
        width={compact ? 48 : 56}
        height={compact ? 48 : 56}
        className={compact ? "h-12 w-12 object-cover" : "h-12 w-12 object-cover"}
        priority
      />
      {compact ? (
        <span className="sr-only">{siteConfig.siteName}</span>
      ) : (
        <span className="max-w-[15rem] text-[11px] font-bold uppercase leading-4 tracking-[0.18em] text-[var(--cream)]">
          {siteConfig.siteName}
        </span>
      )}
    </div>
  );
}
