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
  Pause,
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
        <path d="M190 70h140l-24 54H214z" fill="#21150f" stroke="#d8a763" strokeWidth="6" />
        <rect x="225" y="124" width="70" height="40" fill="#15100d" stroke="#d8a763" strokeWidth="6" />
        <rect className="espresso-stream" x="254" y="163" width="12" height="112" rx="6" fill="#8f5f39" />
        <rect className="milk-stream" x="306" y="142" width="10" height="156" rx="5" fill="#f5dcc0" opacity=".92" transform="rotate(15 311 220)" />
        <path d="M139 300h242v58c0 58-47 105-105 105h-32c-58 0-105-47-105-105z" fill="#f5dcc0" stroke="#d8a763" strokeWidth="7" />
        <path className="cup-fill" d="M156 314h208v34c0 48-39 86-86 86h-36c-48 0-86-39-86-86z" fill="#8f5f39" opacity=".88" />
        <path d="M378 323h36c25 0 45 20 45 45s-20 45-45 45h-44" fill="none" stroke="#d8a763" strokeWidth="13" />
        <path className="latte-swirl" d="M197 345c28-20 96-21 126 0 23 17-8 45-60 44-43-1-60-18-41-31 17-12 58-13 80 0" fill="none" stroke="#f5dcc0" strokeLinecap="round" strokeWidth="8" strokeDasharray="300" />
        <path className="steam-line" d="M205 262c-22-29 27-36 5-68" fill="none" stroke="#f5dcc0" strokeLinecap="round" strokeWidth="5" opacity=".78" />
        <path className="steam-line" d="M262 254c-25-32 30-42 3-78" fill="none" stroke="#f5dcc0" strokeLinecap="round" strokeWidth="5" opacity=".78" />
        <path className="steam-line" d="M319 263c-20-26 25-35 4-64" fill="none" stroke="#f5dcc0" strokeLinecap="round" strokeWidth="5" opacity=".78" />
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
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">Open the menu</span>
            <span className="mt-5 block font-display text-5xl text-[var(--cream)] md:text-7xl">Eat. Drink. Vibe.</span>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--cream)]/75">Pull cover <ArrowRight className="h-4 w-4" /></span>
          </button>
          <div className="book-pages">
            <div className="book-page left-page">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-4xl">Menu</h3>
                <button className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]" onClick={() => setOpen(false)}>Close</button>
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
              <label className="mt-8 flex items-center gap-3 text-sm text-[var(--muted)]">
                <input type="checkbox" checked={veganOnly} onChange={(event) => setVeganOnly(event.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
                Vegan only
              </label>
              <div className="mt-5 flex items-center gap-2 border border-[var(--line-dark)] px-3 py-2">
                <Search className="h-4 w-4 text-[var(--muted)]" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the book" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" />
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
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent-dark)]">{category}</p>
                <div className="mt-6 grid gap-4">
                  {items.map((item) => (
                    <article key={item.name} className="menu-item">
                      {item.image ? (
                        <Image src={item.image} alt={`${item.name} at ${brand.name}`} width={104} height={104} className="h-20 w-20 shrink-0 object-cover" />
                      ) : (
                        <div className="grid h-20 w-20 shrink-0 place-items-center bg-[var(--ink)] text-center font-display text-2xl text-[var(--accent)]" aria-hidden="true">
                          {item.name.slice(0, 1)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-display text-xl">{item.name}</h4>
                          <span className="font-bold text-[var(--accent-dark)]">{item.price}</span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                        <div className="mt-2 flex gap-2">
                          {item.tags?.map((tag) => <span key={tag} className="tag">{tag}</span>)}
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
    <section className="bg-[var(--paper)] px-5 py-24 text-[var(--ink)] md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Highlights" title="House favorites with a little theatre." tone="dark" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              className="group overflow-hidden bg-white shadow-[0_20px_70px_rgba(43,30,22,.08)]"
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
              <div className="p-5">
                <h3 className="font-display text-2xl">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              </div>
            </motion.article>
          ))}
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
  const [paused, setPaused] = useState(false);
  const quotes = [
    "Coffee, pizza, shakes, and an easy room for long Nizamabad evenings.",
    "A polished cafe stop for friends, families, work catch-ups, and dessert plans.",
    "The menu has range: coffee, coolers, pasta, bowls, sandwiches, and affogato.",
    "Warm service, bright plates, and a brand feel that lands from the first sip.",
  ];

  return (
    <section className="bg-[var(--paper)] px-5 py-20 text-[var(--ink)]">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl">What guests come in for</h2>
          <button className="inline-flex h-10 w-10 items-center justify-center border border-[var(--line-dark)]" onClick={() => setPaused(!paused)} aria-label="Pause testimonials"><Pause className="h-4 w-4" /></button>
        </div>
        <div className="marquee mt-8 overflow-hidden" data-paused={paused}>
          <div className="marquee-track">
            {[...quotes, ...quotes].map((quote, index) => (
              <blockquote key={`${quote}-${index}`} className="mx-3 inline-flex w-[330px] whitespace-normal bg-white p-6 text-lg leading-7 shadow-sm">
                &quot;{quote}&quot;
              </blockquote>
            ))}
          </div>
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
    <footer className="bg-[var(--ink)] px-5 pb-10 text-[var(--cream)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/12 pt-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-6 text-white/56">{brand.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          <a href={brand.instagram} aria-label="Instagram"><Camera className="h-5 w-5" /></a>
          <a href={brand.facebook} aria-label="Facebook"><MessageCircle className="h-5 w-5" /></a>
          <a href={brand.mapsUrl}>Directions</a>
          <span>© 2026 {brand.name}</span>
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
        <Gallery />
        <Testimonials />
        <VisitAndReserve />
      </main>
      <Footer />
    </>
  );
}
