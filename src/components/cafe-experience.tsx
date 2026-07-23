"use client";

import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  MousePointer2,
  Phone,
  Search,
  X,
} from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { featuredItems, menuCategories, menuItems, MenuCategory } from "@/data/menu";
import { brand, hours, stats } from "@/data/site";
import { Logo } from "./logo";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  ["Home", "hero"],
  ["About Us", "about"],
  ["Our Products/Menu", "menu"],
  ["Gallery", "gallery"],
  ["Contact Us", "visit"],
] as const;

function useTodayIndex() {
  const [today] = useState(() => new Date().getDay());
  return today;
}

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0, 0)";
      }}
      className={clsx(
        "group inline-flex h-12 items-center justify-center gap-2 px-5 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
        variant === "primary"
          ? "bg-[var(--accent)] text-[var(--ink)] shadow-[0_18px_50px_rgba(216,167,99,.28)] hover:bg-[var(--accent-soft)]"
          : "border border-[var(--line)] bg-white/10 text-[var(--cream)] hover:border-[var(--accent)]"
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </a>
  );
}

function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;

    const move = (event: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.translate = `${event.clientX}px ${event.clientY}px`;
    };
    const enter = () => ref.current?.classList.add("cursor-live");
    const leave = () => ref.current?.classList.remove("cursor-live");
    const targets = document.querySelectorAll("a, button, input, select, textarea");

    window.addEventListener("mousemove", move);
    targets.forEach((target) => {
      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", enter);
        target.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return <div ref={ref} className="custom-cursor hidden lg:block" aria-hidden="true" />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(([, id]) => id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-[rgba(21,16,13,.86)] shadow-2xl shadow-black/20 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,214,114,0.14),transparent_38%),rgba(5,4,4,0.92)] shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--cream)]/90 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <a
            href={`tel:${brand.phone}`}
            className="inline-flex items-center gap-3 rounded-full border border-[var(--accent)]/30 bg-white/5 px-4 py-3 text-sm font-bold text-[var(--cream)] transition duration-200 hover:border-[var(--accent)] hover:bg-[rgba(255,255,255,0.12)] hover:text-[var(--accent)]"
          >
            <span className="rounded-full bg-[var(--accent)]/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Call
            </span>
            <Phone className="h-4 w-4 text-[var(--accent)]" /> {brand.phone}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-[var(--cream)] transition duration-200 hover:border-[var(--accent)] hover:bg-[rgba(255,255,255,0.12)] hover:text-[var(--accent)]"
          >
            <Mail className="h-4 w-4" /> {brand.email}
          </a>
        </div>
      </div>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#hero" aria-label="Go to home">
          <Logo />
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={clsx(
                "text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cream)]/72 transition hover:text-[var(--accent)]",
                active === id && "text-[var(--accent)]"
              )}
            >
              {label}
            </a>
          ))}
          <a className="border border-[var(--accent)] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--ink)]" href={brand.mapsUrl}>
            Directions
          </a>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--ink)] px-6 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button className="h-11 w-11 border border-white/20 text-white" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="mx-auto h-5 w-5" />
              </button>
            </div>
            <div className="mt-16 grid gap-5">
              {navLinks.map(([label, id], index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="border-b border-white/10 pb-5 font-display text-4xl text-[var(--cream)]"
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const skipIntro = Boolean(reduceMotion);

  useEffect(() => {
    if (!ref.current) return;
    const alreadyPlayed = sessionStorage.getItem("pour-intro-played") === "true";
    if (reduceMotion || alreadyPlayed) {
      gsap.set(".preloader", { opacity: 0, pointerEvents: "none" });
      gsap.set(".hero-copy > *", { opacity: 1, y: 0 });
      gsap.set(".espresso-stream, .milk-stream, .cup-fill, .steam-line", { opacity: 1, scaleY: 1, y: 0 });
      gsap.set(".latte-swirl", { strokeDashoffset: 0 });
      return;
    }
    sessionStorage.setItem("pour-intro-played", "true");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".preloader-mark", { scale: 0.7, opacity: 0, duration: 0.5 })
        .to(".preloader", { opacity: 0, pointerEvents: "none", duration: 0.55, delay: 0.25 })
        .from(".espresso-stream", { scaleY: 0, transformOrigin: "top", duration: 0.75 }, "-=.1")
        .from(".cup-fill", { scaleY: 0, transformOrigin: "bottom", duration: 0.85 }, "-=.35")
        .from(".milk-stream", { scaleY: 0, transformOrigin: "top", duration: 0.8 }, "-=.2")
        .from(".latte-swirl", { strokeDashoffset: 300, duration: 1.15 }, "-=.45")
        .from(".steam-line", { y: 18, opacity: 0, stagger: 0.12, duration: 0.75 }, "-=.8")
        .from(".hero-copy > *", { y: 28, opacity: 0, stagger: 0.12, duration: 0.8 }, "-=.35");
    }, ref);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="hero" ref={ref} className="relative grid min-h-screen place-items-center overflow-hidden bg-[var(--ink)] px-5 py-28 text-[var(--cream)]">
      <div className="preloader absolute inset-0 z-20 grid place-items-center bg-[var(--ink)]">
        <div className="preloader-mark h-16 w-16 border border-[var(--accent)] p-3">
          <Logo compact />
        </div>
      </div>
      <div className="absolute inset-0 opacity-70">
        <Image src="/images/gallery/wall-logo-night.jpeg" alt={`${brand.name} illuminated outlet wall`} fill priority className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,16,13,.92),rgba(21,16,13,.64),rgba(21,16,13,.38))]" />
      <div className="absolute inset-0 texture opacity-35" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 pt-24 lg:grid-cols-[1fr_.9fr]">
        <div className={clsx("hero-copy max-w-3xl", skipIntro && "hero-copy-ready")}>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[var(--accent)]">Pragathi Nagar - Open daily - 12:30 PM to 10:30 PM</p>
          <h1 className="font-display text-5xl leading-[0.96] text-balance md:text-7xl lg:text-8xl">{brand.name}</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--cream)]/78 md:text-xl">{brand.tagline}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#menu">View Menu</MagneticButton>
            <MagneticButton href="#visit" variant="secondary">Plan Your Visit</MagneticButton>
          </div>
        </div>
        <PourIllustration staticFrame={skipIntro} />
      </div>
      <a href="#menu" className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
        <MousePointer2 className="h-4 w-4 animate-bounce" /> Scroll
      </a>
    </section>
  );
}

function PourIllustration({ staticFrame }: { staticFrame: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <svg viewBox="0 0 520 520" className={clsx("relative h-full w-full drop-shadow-2xl", staticFrame && "static-pour")}>
        <defs>
          <linearGradient id="cupBody" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f8f2e9" />
            <stop offset="60%" stopColor="#e6d8c3" />
            <stop offset="100%" stopColor="#d3bea4" />
          </linearGradient>
          <linearGradient id="coffeeSurface" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7f4f34" />
            <stop offset="80%" stopColor="#4b2e1b" />
          </linearGradient>
          <linearGradient id="liquidGloss" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.72)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="cupHighlight" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.72)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="260" cy="180" rx="120" ry="38" fill="#f1e8de" stroke="#d8a763" strokeWidth="6" />
        <path d="M140 180 C140 260, 140 340, 260 352 C380 340, 380 260, 380 180 Z" fill="url(#cupBody)" stroke="#c9b199" strokeWidth="6" />
        <path d="M140 180 C140 188, 145 204, 163 228 C190 276, 230 295, 260 303 C290 295, 330 276, 357 228 C375 204, 380 188, 380 180 Z" fill="url(#coffeeSurface)" />
        <ellipse cx="260" cy="178" rx="96" ry="22" fill="url(#liquidGloss)" opacity="0.82" />
        <path d="M190 150 C208 132, 252 132, 270 150" fill="none" stroke="#f7e4d0" strokeWidth="6" strokeLinecap="round" opacity="0.78" />
        <path d="M173 170 C190 156, 236 156, 253 170" fill="none" stroke="#fbf0dc" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
        <path d="M212 162 C224 150, 256 150, 268 162" fill="none" stroke="#fff2db" strokeWidth="3" strokeLinecap="round" opacity="0.56" />
        <path d="M325 170 C365 174, 368 242, 330 250 C322 252, 308 248, 302 242 C296 236, 292 224, 292 210 C292 192, 306 184, 325 170 Z" fill="url(#cupBody)" stroke="#c9b199" strokeWidth="6" />
        <path d="M287 172 C292 178, 298 184, 308 190" fill="none" stroke="#fff5df" strokeWidth="3" opacity="0.45" strokeLinecap="round" />
        <ellipse cx="260" cy="352" rx="142" ry="26" fill="#c7b295" opacity="0.28" />
        <path d="M330 200 C365 178, 422 180, 430 226 C438 272, 390 304, 346 292" fill="none" stroke="#d3b08f" strokeWidth="12" opacity="0.22" />
        <ellipse cx="260" cy="160" rx="80" ry="16" fill="url(#cupHighlight)" opacity="0.8" />
        <path d="M210 118 C188 96, 204 66, 246 76" fill="none" stroke="#f6e7cf" strokeWidth="10" opacity="0.55" strokeLinecap="round" />
        <path d="M250 108 C242 88, 286 80, 302 100" fill="none" stroke="#f6e7cf" strokeWidth="10" opacity="0.42" strokeLinecap="round" />
        <path d="M232 92 C218 70, 252 58, 280 76" fill="none" stroke="#f6e7cf" strokeWidth="10" opacity="0.38" strokeLinecap="round" />
        <path d="M272 122 C280 104, 308 98, 318 112" fill="none" stroke="#f9edde" strokeWidth="8" opacity="0.48" strokeLinecap="round" />
        <path d="M288 94 C300 74, 324 70, 334 92" fill="none" stroke="#f9edde" strokeWidth="8" opacity="0.36" strokeLinecap="round" />
        <path d="M356 178 C390 190, 392 228, 356 238" fill="none" stroke="#d2a873" strokeWidth="14" opacity="0.16" strokeLinecap="round" />
        <path d="M336 184 C348 176, 358 170, 374 172" fill="none" stroke="#fff8e2" strokeWidth="6" opacity="0.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function MenuBook() {
  const [category, setCategory] = useState<MenuCategory>("Coffee");
  const [open, setOpen] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    return menuItems[category].filter((item) => {
      const matchesQuery = `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase());
      const matchesVegan = !veganOnly || item.tags?.includes("VG");
      return matchesQuery && matchesVegan;
    });
  }, [category, query, veganOnly]);

  return (
    <section id="menu" className="bg-[var(--paper)] px-5 py-24 text-[var(--ink)] md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Our products / menu" title="Bright coffees, coolers, shakes, pizzas, bowls, and desserts from the Nizamabad counter." tone="dark" />
        <div className={clsx("book-shell mt-12", open && "book-open")}>
          <button type="button" onClick={() => setOpen(true)} className="book-cover text-left" aria-label="Open menu book">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">The café journal</span>
            <span className="mt-5 block font-display text-5xl leading-tight text-[var(--cream)] md:text-6xl">Menu Diary</span>
            <span className="mt-4 block max-w-xs text-sm leading-7 text-[var(--cream)]/80">Handwritten notes, premium plates, and the stories behind every flavor.</span>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]/90">Open cover <ArrowRight className="h-4 w-4" /></span>
          </button>
          <div className="book-pages">
            <div className="book-page left-page">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-[var(--accent-dark)]">Diary Entry</p>
                  <h3 className="font-display text-4xl">Seasonal Menu Notes</h3>
                </div>
                <button className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]" onClick={() => setOpen(false)}>Close</button>
              </div>
              <div className="mt-8 grid gap-3">
                {menuCategories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={clsx("category-tab", category === item && "category-tab-active")}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-8 rounded-[2rem] border border-[var(--line-dark)] bg-white/90 p-5 shadow-[inset_0_0_0_1px_rgba(21,16,13,0.06)] backdrop-blur-sm">
                <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <input type="checkbox" checked={veganOnly} onChange={(event) => setVeganOnly(event.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
                  Vegan only
                </label>
                <div className="mt-4 flex items-center gap-3 border-t border-[var(--line-dark)] pt-4 text-sm text-[var(--muted)]">
                  <Search className="h-4 w-4 text-[var(--muted)]" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the diary" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" />
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={category + String(veganOnly) + query}
                initial={{ rotateY: -18, x: 20, opacity: 0 }}
                animate={{ rotateY: 0, x: 0, opacity: 1 }}
                exit={{ rotateY: 18, x: -20, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="book-page right-page"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-dark)]">{category}</p>
                    <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">Crafted selections</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Page 12</span>
                </div>
                <div className="mt-6 grid gap-4">
                  {items.map((item) => (
                    <article key={item.name} className="menu-item rounded-[1.75rem] border border-[var(--line-dark)] bg-[rgba(255,255,255,0.92)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                      <div className="flex items-start gap-4">
                        {item.image ? (
                          <Image src={item.image} alt={`${item.name} at ${brand.name}`} width={104} height={104} className="h-24 w-24 shrink-0 rounded-3xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.16)]" />
                        ) : (
                          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-[var(--ink)] text-2xl font-bold uppercase tracking-[0.16em] text-[var(--accent)]" aria-hidden="true">
                            {item.name.slice(0, 1)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-display text-2xl text-[var(--ink)]">{item.name}</h4>
                            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent-dark)]">{item.price}</span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags?.map((tag) => (
                              <span key={tag} className="tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, tone = "light" }: { kicker: string; title: string; tone?: "light" | "dark" }) {
  return (
    <div className="max-w-3xl reveal-text">
      <p className={clsx("mb-4 text-xs font-bold uppercase tracking-[0.32em]", tone === "dark" ? "text-[var(--accent-dark)]" : "text-[var(--accent)]")}>{kicker}</p>
      <h2 className={clsx("font-display text-4xl leading-tight text-balance md:text-6xl", tone === "dark" ? "text-[var(--ink)]" : "text-[var(--cream)]")}>{title}</h2>
    </div>
  );
}

function About() {
  const ref = useRef<HTMLElement>(null);
  const stages = [
    ["Eat", "Vegetarian comfort food with Italian, Mexican, Chinese, Japanese, salads, soups, sandwiches, pizzas, and rice bowls made for lingering cafe meals."],
    ["Drink", "Authentic coffees sit beside frappes, shakes, mojitos, iced teas, coolers, hot chocolate, and affogatos for every kind of cafe craving."],
    ["Vibe", "A warm Nizamabad outlet with polished service, bold brand energy, and easy corners for friends, families, dates, meetings, and slow evenings."],
  ];

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.to(".story-track", {
        xPercent: -66.66,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=2600",
          scrub: 0.7,
          pin: true,
        },
      });
      gsap.from(".story-stat", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="overflow-hidden bg-[var(--ink)] px-5 py-24 text-[var(--cream)] md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="About us" title="A single-location cafe with the parent brand's Eat, Drink, Vibe rhythm." />
        <div className="mt-12 flex w-[300%] story-track">
          {stages.map(([title, copy], index) => (
            <article key={title} className="grid w-full shrink-0 gap-8 pr-5 md:grid-cols-[.9fr_1fr] md:items-center md:pr-16">
              <div className="image-reveal relative aspect-[4/3] overflow-hidden">
                <Image
                  src={[
                    "/images/gallery/menu-page-coffee.jpeg",
                    "/images/gallery/menu-counter-wide.jpeg",
                    "/images/menu/coffee/latte-art.jpeg",
                    "/images/gallery/team-at-outlet.jpeg",
                  ][index]}
                  alt={`${title} at ${brand.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--accent)]">0{index + 1}</p>
                <h3 className="mt-4 font-display text-5xl">{title}</h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--cream)]/72">{copy}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 grid gap-4 border-y border-white/12 py-7 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="story-stat">
              <p className="font-display text-4xl text-[var(--accent)]">{stat.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-white/52">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="bg-[var(--paper)] px-5 py-24 text-[var(--ink)] reveal-text md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Highlights" title="House favorites with a little theatre." tone="dark" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_70px_rgba(43,30,22,.08)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {item.image ? (
                  <Image src={item.image} alt={`${item.name} at ${brand.name}`} fill className="object-cover transition duration-700 group-hover:scale-110" />
                ) : (
                  <div className="grid h-full place-items-center bg-[var(--ink)] p-6 text-center font-display text-5xl text-[var(--accent)]">
                    {item.name}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const members = [
    { name: "Sara", role: "Outlet manager", note: "Curates daily menu flow and keeps the service polished." },
    { name: "Anand", role: "Head barista", note: "Brews every espresso, latte, and pour with precision and warmth." },
    { name: "Rhea", role: "Guest host", note: "Welcomes guests, matches tables, and makes every visit feel easy." },
  ];

  return (
    <section className="bg-[var(--paper)] px-5 py-24 text-[var(--ink)] reveal-text md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Meet the team" title="The Nizamabad crew behind every coffee, plate, and friendly hello." tone="dark" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--ink)] shadow-[0_30px_90px_rgba(21,16,13,.16)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(216,167,99,0.14)] via-transparent to-[rgba(255,255,255,0.02)]" />
            <Image src="/images/gallery/team-at-outlet.jpeg" alt="Team members at The Coffee Evolution Nizamabad" width={960} height={720} className="relative h-full w-full object-cover" />
          </div>
          <div className="grid gap-6 rounded-[2rem] border border-[var(--line-dark)] bg-white/90 p-8 shadow-[0_30px_70px_rgba(21,16,13,.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-dark)]">Outpost crew</p>
            <h3 className="font-display text-5xl">Passion, polish, and a warm local welcome.</h3>
            <p className="text-[var(--muted)]">A small, dedicated Nizamabad team that pours care into every coffee, plate, and late-evening table.</p>
            <div className="grid gap-4">
              {members.map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--paper)] p-5"
                >
                  <p className="font-display text-2xl text-[var(--ink)]">{member.name}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.22em] text-[var(--accent-dark)]">{member.role}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{member.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const step = (direction: number) => {
    setActive((current) => {
      if (current === null) return current;
      return (current + direction + galleryImages.length) % galleryImages.length;
    });
  };

  return (
    <section id="gallery" className="bg-[var(--ink)] px-5 py-24 text-[var(--cream)] md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Gallery" title="Interior light, polished plates, and the quieter corners." />
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <button key={image.title} type="button" onClick={() => setActive(index)} className="image-reveal group mb-5 block w-full overflow-hidden text-left">
              <Image src={image.src} alt={image.alt} width={800} height={index % 2 ? 1040 : 760} className="w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="mt-3 block text-sm font-semibold text-white/70">{image.title}</span>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active !== null ? (
          <motion.div className="fixed inset-0 z-[60] bg-black/92 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute right-5 top-5 z-10 h-11 w-11 border border-white/25 text-white" onClick={() => setActive(null)} aria-label="Close lightbox"><X className="mx-auto h-5 w-5" /></button>
            <button className="absolute left-5 top-1/2 z-10 h-12 w-12 -translate-y-1/2 border border-white/25 text-white" onClick={() => step(-1)} aria-label="Previous image"><ChevronLeft className="mx-auto h-6 w-6" /></button>
            <button className="absolute right-5 top-1/2 z-10 h-12 w-12 -translate-y-1/2 border border-white/25 text-white" onClick={() => step(1)} aria-label="Next image"><ChevronRight className="mx-auto h-6 w-6" /></button>
            <motion.div layoutId={`gallery-${active}`} className="grid h-full place-items-center">
              <Image src={galleryImages[active].src} alt={galleryImages[active].alt} width={1300} height={900} className="max-h-[86vh] w-auto object-contain" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Testimonials() {
  const voices = [
    {
      quote: "The espresso is bold, the plates arrive polished, and the atmosphere feels like a premium local lounge.",
      name: "Priya",
      role: "Regular guest",
    },
    {
      quote: "Perfect for family evenings and quick work catch-ups — everything tastes fresh, bright, and on point.",
      name: "Rahul",
      role: "Food blogger",
    },
    {
      quote: "The team is welcoming, and the menu surprises me every time with new favorites and strong coffee.",
      name: "Sneha",
      role: "Creative freelancer",
    },
    {
      quote: "From frappes to sandwiches, every order feels carefully plated and easy to enjoy.",
      name: "Akash",
      role: "College student",
    },
  ];

  return (
    <section className="bg-[var(--ink)] px-5 py-24 text-[var(--cream)] reveal-text">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Testimonials" title="What guests keep coming back for" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {voices.map((voice, index) => (
            <motion.blockquote
              key={voice.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[2rem] border border-[rgba(255,255,255,0.08)] bg-white/8 p-8 text-sm leading-7 shadow-[0_25px_55px_rgba(0,0,0,0.1)]"
            >
              <p className="text-lg leading-8 text-[var(--cream)]">“{voice.quote}”</p>
              <footer className="mt-6 text-sm text-[var(--accent-soft)]">
                <p className="font-semibold text-[var(--cream)]">{voice.name}</p>
                <p className="text-[var(--muted)]">{voice.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitAndReserve() {
  const today = useTodayIndex();
  const [reservationDone, setReservationDone] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);
  const todayHours = hours[today];
  const isOpen = useMemo(() => {
    if (!todayHours) return false;
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const [openH, openM] = todayHours.open.split(":").map(Number);
    const [closeH, closeM] = todayHours.close.split(":").map(Number);
    return minutes >= openH * 60 + openM && minutes <= closeH * 60 + closeM;
  }, [todayHours]);

  function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: replace with real backend or booking-provider integration.
    console.log("Reservation request", Object.fromEntries(new FormData(event.currentTarget)));
    setReservationDone(true);
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: connect to Mailchimp, Klaviyo, or preferred email service.
    console.log("Newsletter signup", Object.fromEntries(new FormData(event.currentTarget)));
    setNewsletterDone(true);
  }

  return (
    <section id="visit" className="bg-[var(--ink)] px-5 py-24 text-[var(--cream)] md:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.9fr]">
        <div>
          <SectionHeading kicker="Contact us" title="Find us in Pragathi Nagar for coffee, food, and the evening cafe glow." />
          <div className="mt-10 grid gap-5">
            <div className="flex gap-4 text-white/76"><MapPin className="mt-1 h-5 w-5 text-[var(--accent)]" /><span>{brand.address}</span></div>
            <div className="flex gap-4 text-white/76"><Phone className="mt-1 h-5 w-5 text-[var(--accent)]" /><span>{brand.phone}</span></div>
            <div className="flex gap-4 text-white/76"><Mail className="mt-1 h-5 w-5 text-[var(--accent)]" /><span>{brand.email}</span></div>
            <span className={clsx("inline-flex w-fit items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em]", isOpen ? "bg-emerald-400/16 text-emerald-200" : "bg-red-400/16 text-red-200")}>
              {isOpen ? "Open now" : "Closed now"}
            </span>
          </div>
          <div className="mt-8 overflow-hidden border border-white/12">
            <iframe
              title={`Map to ${brand.name}`}
              src={brand.mapsEmbedUrl}
              className="h-80 w-full grayscale"
              loading="lazy"
            />
          </div>
        </div>
        <div id="reserve" className="bg-[var(--paper)] p-5 text-[var(--ink)] md:p-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-[var(--accent-dark)]" />
            <h2 className="font-display text-4xl">Reserve</h2>
          </div>
          <form onSubmit={submitReservation} className="mt-7 grid gap-4">
            <input name="name" required placeholder="Name" className="field" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="date" required type="date" className="field" />
              <input name="time" required type="time" className="field" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="partySize" required type="number" min="1" max="12" placeholder="Party size" className="field" />
              <input name="phone" required placeholder="Phone" className="field" />
            </div>
            <button className="h-12 bg-[var(--ink)] text-sm font-bold uppercase tracking-[0.2em] text-[var(--cream)]">Request Table</button>
            {reservationDone ? <p className="text-sm text-[var(--accent-dark)]">Request noted. Backend integration is stubbed for now.</p> : null}
          </form>
          <div className="mt-8 border-t border-[var(--line-dark)] pt-8">
            <h3 className="font-display text-3xl">Hours</h3>
            <div className="mt-4 grid gap-2">
              {hours.map((entry, index) => (
                <div key={entry.day} className={clsx("flex justify-between border-b border-[var(--line-dark)] py-2 text-sm", today === index && "font-bold text-[var(--accent-dark)]")}>
                  <span>{entry.day}</span><span>{entry.label}</span>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={submitNewsletter} className="mt-8 border-t border-[var(--line-dark)] pt-8">
            <h3 className="font-display text-3xl">First pour&apos;s on us</h3>
            <div className="mt-4 flex gap-2">
              <input name="email" required type="email" placeholder="Email address" className="field min-w-0 flex-1" />
              <button className="px-4 bg-[var(--accent)] text-sm font-bold uppercase tracking-[0.16em]">Join</button>
            </div>
            {newsletterDone ? <p className="mt-3 text-sm text-[var(--accent-dark)]">You are on the list. Email service is stubbed.</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] px-5 pb-14 text-[var(--cream)]">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/12 pt-10 md:grid-cols-[1.2fr_1fr_0.9fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/64">{brand.tagline}</p>
        </div>
        <div className="grid gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-dark)]">Contact</p>
          <a className="transition hover:text-[var(--accent)]" href={`mailto:${brand.email}`}>{brand.email}</a>
          <a className="transition hover:text-[var(--accent)]" href={`tel:${brand.phone}`}>{brand.phone}</a>
          <a className="transition hover:text-[var(--accent)]" href={brand.mapsUrl}>Get directions</a>
        </div>
        <div className="grid gap-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-dark)]">Follow</p>
          <div className="flex items-center gap-4 text-[var(--cream)]/80">
            <a href={brand.instagram} aria-label="Instagram" className="transition hover:text-[var(--accent)]"><Camera className="h-5 w-5" /></a>
            <a href={brand.facebook} aria-label="Facebook" className="transition hover:text-[var(--accent)]"><MessageCircle className="h-5 w-5" /></a>
          </div>
          <p className="pt-4 text-xs uppercase tracking-[0.22em] text-white/40">© 2026 {brand.name}</p>
        </div>
      </div>
    </footer>
  );
}

export function CafeExperience() {
  useEffect(() => {
    const progress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const value = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(value));
    };
    progress();
    window.addEventListener("scroll", progress, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return () => window.removeEventListener("scroll", progress);
    }
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const frame = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((el) => {
        gsap.from(el.children, {
          y: 28,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 78%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(18% 0 18% 0)",
          y: 28,
          opacity: 0,
          duration: 0.9,
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    });

    return () => {
      window.removeEventListener("scroll", progress);
      cancelAnimationFrame(frame);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="fixed left-0 top-0 z-[70] h-1 w-full origin-left scale-x-[var(--scroll-progress,0)] bg-[var(--accent)]" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <MenuBook />
        <About />
        <Featured />
        <Team />
        <Gallery />
        <Testimonials />
        <VisitAndReserve />
      </main>
      <Footer />
    </>
  );
}
