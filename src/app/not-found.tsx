import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--ink)] px-5 text-[var(--cream)]">
      <div className="max-w-xl text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">404</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">This table is not on the floor plan.</h1>
        <p className="mt-6 text-lg leading-8 text-white/64">Head back to the cafe and pick up where the pour left off.</p>
        <Link className="mt-9 inline-flex h-12 items-center bg-[var(--accent)] px-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--ink)]" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}

