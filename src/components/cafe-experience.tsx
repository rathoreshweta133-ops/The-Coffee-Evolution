"use client";

import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  MousePointer2,
  Phone,
  Search,
} from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { menuCategories, menuItems, MenuCategory, MenuItem } from "@/data/menu";
import { brand, hours, stats } from "@/data/site";
import { siteConfig } from "@/config/site";
import { Logo } from "./logo";
import { NavigationHeader } from "./navigation-header";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  ["Home", "hero"],
  ["Menu", "menu"],
  ["About", "about"],
  ["Team", "team"],
  ["Visit", "visit"],
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


function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_30%,#3a2214_0%,#1a0e08_60%,#0a0503_100%)] px-5 pt-36 text-center text-[var(--cream)]">
      <div className="animate-[fadeUp_0.8s_ease_0.2s_forwards] text-xs font-semibold tracking-[0.2em] text-[#c5a059] uppercase opacity-0">Pragathi Nagar · Nizamabad</div>
      <h1 className="animate-[fadeUp_0.9s_ease_0.4s_forwards] font-display text-4xl leading-tight tracking-[2px] text-balance opacity-0 uppercase md:text-6xl lg:text-[3.6rem] [text-shadow:0_2px_10px_rgba(0,0,0,0.9),0_0_15px_rgba(197,160,89,0.3)]">Coffee = Transformation</h1>
      <p className="mx-auto mt-4 max-w-[480px] animate-[fadeUp_0.9s_ease_0.6s_forwards] font-serif text-[0.98rem] leading-relaxed text-[#d1c2a5] opacity-0">Rich aromas, artisanal brews, and vegetarian cafe plates — an evening room built for every sip, plate, and pause.</p>

      <div className="relative mt-5 flex h-[400px] w-full max-w-[520px] flex-col items-center justify-end pb-10">
        <div className="pointer-events-none absolute bottom-40 z-10 flex w-[130px] justify-center">
          <div className="absolute bottom-0 left-[30%] h-[145px] w-2.5 animate-[continuousSteam_4.2s_infinite_linear] rounded-full opacity-0 blur-[7px] bg-linear-to-t from-transparent via-white/35 via-white/25 via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-[45%] h-[145px] w-2.5 animate-[continuousSteam_3.6s_infinite_linear_1.1s] rounded-full opacity-0 blur-[7px] bg-linear-to-t from-transparent via-white/35 via-white/25 via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-[55%] h-[145px] w-2.5 animate-[continuousSteam_4.8s_infinite_linear_2.2s] rounded-full opacity-0 blur-[7px] bg-linear-to-t from-transparent via-white/35 via-white/25 via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-[40%] h-[145px] w-2.5 animate-[continuousSteam_3.9s_infinite_linear_0.6s] rounded-full opacity-0 blur-[7px] bg-linear-to-t from-transparent via-white/35 via-white/25 via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-[60%] h-[145px] w-2.5 animate-[continuousSteam_4.5s_infinite_linear_1.8s] rounded-full opacity-0 blur-[7px] bg-linear-to-t from-transparent via-white/35 via-white/25 via-white/10 to-transparent" />
        </div>
        
        <div className="relative z-3 h-[110px] w-[148px] rounded-t-lg rounded-b-[66px] shadow-[0_14px_20px_rgba(0,0,0,0.7),inset_5px_0_12px_rgba(255,255,255,0.15),inset_-12px_-10px_20px_rgba(0,0,0,0.6)] bg-linear-135 from-[#8a4e35] via-[#5e311f] to-[#3b1d10] after:absolute after:top-[30%] after:left-[8%] after:h-0.5 after:w-[84%] after:rounded-full after:blur-[1px] after:bg-white/10">
          <div className="absolute top-4 -right-[25px] z-2 h-[55px] w-10 rounded-r-[40px] border-[11px] border-l-0 border-[#633421] shadow-[4px_6px_10px_rgba(0,0,0,0.5),inset_-3px_2px_5px_rgba(255,255,255,0.2)]" />
          <div className="absolute -top-[9px] left-0 flex h-[38px] w-[148px] items-center justify-center overflow-hidden rounded-full border-2 border-[#a36145] shadow-[inset_0_2px_6px_rgba(255,255,255,0.3),0_3px_6px_rgba(0,0,0,0.4)] bg-linear-to-r from-[#915339] via-[#6a3723] to-[#431f11]">
            <div className="relative flex h-[31px] w-[138px] items-center justify-center rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] bg-[radial-gradient(ellipse_at_40%_40%,#a26132_0%,#683617_50%,#3d1c0a_85%,#240d04_100%)]">
              <div className="relative flex h-[23px] w-[70px] scale-y-50 flex-col items-center filter drop-shadow-[0_1px_2px_rgba(40,15,5,0.4)]">
                <div className="absolute top-0.5 h-4 w-[17px] -rotate-45 rounded-t-full bg-[#f7e7ce] before:absolute before:-top-2 before:left-0 before:h-[17px] before:w-[17px] before:rounded-full before:bg-[#f7e7ce] after:absolute after:top-0 after:left-2 after:h-[17px] after:w-[17px] after:rounded-full after:bg-[#f7e7ce]" />
                <div className="absolute top-[5px] h-4 w-[35px] rounded-b-full border-2 border-t-0 border-[#f7e7ce]" />
                <div className="absolute top-[9px] h-[19px] w-[50px] rounded-b-full border-2 border-t-0 border-[#f7e7ce]/85" />
                <div className="absolute top-[13px] h-5 w-[62px] rounded-b-full border-2 border-t-0 border-[#f7e7ce]/60" />
                <div className="absolute -top-0.5 z-5 h-[29px] w-0.5 rounded-full bg-linear-to-b from-[#f7e7ce] to-[#f7e7ce]/30" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-2 flex h-[70px] w-[250px] items-center justify-center rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9),inset_0_4px_10px_rgba(255,255,255,0.25),inset_0_-8px_12px_rgba(0,0,0,0.7)] bg-linear-to-b from-[#72402b] via-[#432113] to-[#29120a]">
          <div className="relative top-[-2px] h-[42px] w-[165px] rounded-full shadow-[inset_0_3px_8px_rgba(0,0,0,0.8),inset_0_-2px_5px_rgba(255,255,255,0.15)] bg-linear-to-b from-[#2b1309] to-[#542b1a]" />
        </div>
        <div className="absolute bottom-[30px] z-1 h-7 w-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0)_70%)]" />
      </div>

      <div className="mt-7 flex animate-[fadeUp_0.9s_ease_0.8s_forwards] flex-wrap justify-center gap-4 opacity-0">
        <a href="#menu" className="inline-block rounded-3xl px-7 py-3 font-display text-[0.78rem] font-bold tracking-[1.5px] text-[#1a100a] shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-all duration-300 uppercase bg-linear-135 from-[#c5a059] to-[#8c6d3b] hover:-translate-y-1 hover:bg-linear-135 hover:from-[#e0c388] hover:to-[#a88448]">View Menu</a>
        <a href="#contact" className="inline-block rounded-3xl border border-[#8c6d3b] px-7 py-3 font-display text-[0.78rem] font-bold tracking-[1.5px] text-[#f1e4c3] transition-all duration-300 uppercase hover:-translate-y-1 hover:bg-[#c5a059]/10">Plan Your Visit</a>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes continuousSteam {
          0% { transform: translateY(8px) translateX(0) scaleX(1) scaleY(0.6); opacity: 0; }
          20% { opacity: 0.65; }
          50% { transform: translateY(-70px) translateX(-12px) scaleX(2) scaleY(1.2); opacity: 0.4; }
          80% { transform: translateY(-130px) translateX(16px) scaleX(3) scaleY(1.5); opacity: 0.15; }
          100% { transform: translateY(-185px) translateX(-20px) scaleX(4) scaleY(1.8); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function MenuBook() {
  const [category, setCategory] = useState<MenuCategory>("Hot Coffee");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);

  const items = useMemo(() => {
    return menuItems[category].filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      return matchesQuery;
    });
  }, [category, query]);

  const pageSize = 5;
  const pages = useMemo(() => {
    const result: MenuItem[][] = [];
    for (let index = 0; index < items.length; index += pageSize) {
      result.push(items.slice(index, index + pageSize));
    }
    return result.length ? result : [[]];
  }, [items]);

  useEffect(() => {
    setCurrentPage(1);
    setDirection(1);
  }, [items]);

  const pageCount = pages.length;
  const pageItems = pages[currentPage - 1] ?? [];

  const pageDecorations = [
    [
      { symbol: "☕", position: "top-6 left-6 text-[1.5rem]" },
      { symbol: "✿", position: "bottom-12 left-10 text-[1.6rem]" },
      { symbol: "⚫", position: "top-24 right-10 text-[1.1rem]" },
    ],
    [
      { symbol: "☕", position: "top-5 right-8 text-[1.4rem]" },
      { symbol: "❁", position: "left-10 top-28 text-[1.3rem]" },
      { symbol: "✧", position: "bottom-10 right-14 text-[1.5rem]" },
    ],
    [
      { symbol: "☕", position: "left-8 top-10 text-[1.4rem]" },
      { symbol: "✿", position: "right-8 top-24 text-[1.5rem]" },
      { symbol: "⚫", position: "bottom-10 left-14 text-[1.1rem]" },
    ],
  ];
  const accents = pageDecorations[(currentPage - 1) % pageDecorations.length];

  const pageVariants = {
    enter: (dir: number) => ({ x: dir * 48, rotateY: dir * -15, opacity: 0 }),
    center: { x: 0, rotateY: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -48, rotateY: dir * 15, opacity: 0 }),
  };

  const setCategoryAndOpen = (item: MenuCategory) => {
    setCategory(item);
    setOpen(true);
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > pageCount) return;
    setDirection(nextPage > currentPage ? 1 : -1);
    setCurrentPage(nextPage);
  };

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
                    onClick={() => setCategoryAndOpen(item)}
                    className={clsx("category-tab", category === item && "category-tab-active")}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-8 rounded-[2rem] border border-[var(--line-dark)] bg-white/90 p-5 shadow-[inset_0_0_0_1px_rgba(21,16,13,0.06)] backdrop-blur-sm">
                <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <span className="font-semibold tracking-widest uppercase">Select Category</span>
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-[var(--line-dark)] pt-4 text-sm text-[var(--muted)]">
                  <Search className="h-4 w-4 text-[var(--muted)]" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the diary" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" />
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${currentPage}-${query}`}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="book-page right-page"
              >
                <div className="page-accents" aria-hidden="true">
                  {accents.map((accent, index) => (
                    <span key={index} className={`page-accent ${accent.position}`}>
                      {accent.symbol}
                    </span>
                  ))}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-dark)]">{category}</p>
                      <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">Crafted selections</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Page {currentPage} of {pageCount}</span>
                  </div>
                  <div className="mt-6 grid gap-2">
                    {pageItems.length ? (
                      pageItems.map((item) => (
                        <article key={item.name} className={clsx(
                          "flex justify-between items-baseline font-semibold text-[13px] uppercase",
                          item.isSubcategory ? "mt-4 mb-2 border-b border-dashed border-[#baa274] pb-1 text-[#2b1a0d] tracking-widest text-[14px]" : "text-[#3b281a]"
                        )}>
                          <span>{item.name}</span>
                          {!item.isSubcategory && (
                            <>
                              <div className="flex-grow mx-2 border-b border-dotted border-[#baa274] opacity-80" />
                              <span className="text-[#2b1a0d] font-bold">{item.price}</span>
                            </>
                          )}
                        </article>
                      ))
                    ) : (
                      <div className="rounded-[1.75rem] border border-[var(--line-dark)] bg-[rgba(255,255,255,0.92)] p-8 text-sm text-[var(--muted)] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                        No matching items were found. Try a different search term or category.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              className={clsx("page-turn page-turn-left", currentPage === 1 && "page-turn-disabled")}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className={clsx("page-turn page-turn-right", currentPage === pageCount && "page-turn-disabled")}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pageCount}
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
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
                    "/images/hero/0dc126b9-ce6e-4a95-9301-aaecbede32f3.jpg",
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

function Team() {
  const members = [
    {
      name: "Hariom",
      role: "Chef",
      desc: "Crafting savory pairings and artisanal kitchen creations to complement every brew.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      ),
    },
    {
      name: "Ashok",
      role: "Head Chef",
      desc: "Leading the culinary team with innovation, signature recipes, and high standards.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a5 5 0 0 0-5 5c0 2 1 3.5 2 4.5V14a3 3 0 0 0 6 0v-2.5c1-1 2-2.5 2-4.5a5 5 0 0 0-5-5z" />
          <path d="M8.5 18h7" />
          <path d="M10 21h4" />
        </svg>
      ),
    },
    {
      name: "Abhishek",
      role: "Head Barista",
      desc: "Mastering specialty extractions, latte art, and optimal flavor notes in every cup.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      ),
    },
    {
      name: "TCE Specialists",
      role: "Bar Crew",
      desc: "Warm hospitality, fast service, and an unforgettable cafe experience.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <section id="team" className="relative bg-[var(--background)] px-5 py-24 text-[var(--cream)] md:py-32">
      <div className="absolute top-[30%] left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 blur-[30px] bg-[radial-gradient(circle,rgba(197,160,89,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <div className="section-header reveal text-center mb-12">
          <h2 className="font-display text-4xl font-bold tracking-[4px] text-[#f1e4c3] uppercase [text-shadow:0_2px_10px_rgba(0,0,0,0.9),0_0_15px_rgba(197,160,89,0.3)]">Meet Our Team</h2>
          <p className="mt-2 text-xs font-semibold tracking-[3px] text-[#c5a059] uppercase">The Artisans Behind The Transformation</p>
          <div className="mx-auto mt-4 h-0.5 w-[140px] bg-linear-to-r from-transparent via-[#c5a059] to-transparent" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className="group relative flex flex-col items-center overflow-hidden rounded-lg border border-[#8c6d3b] bg-[#180d07]/80 p-6 text-center transition-all duration-400 hover:-translate-y-2 hover:border-[#c5a059] hover:bg-[#23130a]/90 hover:shadow-[0_12px_30px_rgba(0,0,0,0.9),0_0_15px_rgba(197,160,89,0.25)] before:absolute before:top-0 before:-left-full before:h-0.5 before:w-full before:bg-linear-to-r before:from-transparent before:via-[#f1e4c3] before:to-transparent before:transition-all before:duration-600 hover:before:left-full"
            >
              <div className="relative mb-4 flex h-[100px] w-[100px] items-center justify-center rounded-full border-2 border-[#c5a059] p-1 shadow-[0_0_15px_rgba(197,160,89,0.2)] transition-transform duration-400 group-hover:scale-105 group-hover:border-[#f1e4c3] group-hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#2b170c] text-[#c5a059]">
                  {member.icon}
                </div>
              </div>
              <h4 className="font-display text-base font-bold tracking-[2px] text-[#f1e4c3] uppercase mb-1.5">{member.name}</h4>
              <span className="mb-3 inline-block rounded-3xl border border-[#8c6d3b]/50 bg-[#c5a059]/12 px-3 py-1 text-[10px] font-semibold tracking-[2px] text-[#c5a059] uppercase">
                {member.role}
              </span>
              <p className="font-serif text-[11.5px] leading-relaxed text-[#d1c2a5]">
                {member.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = galleryImages.slice(0, 6);

  return (
    <section id="gallery" className="bg-[var(--ink)] px-5 py-24 text-[var(--cream)] reveal-text md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Gallery" title="Interior light, polished plates, and easy Nizamabad evenings." />
        <div className="gallery-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={image.title} className="gallery-card relative overflow-hidden rounded-[2rem] bg-white/5 shadow-[0_30px_70px_rgba(0,0,0,0.16)]" style={{ transitionDelay: `${index * 0.05}s` }}>
              <Image src={image.src} alt={image.alt} width={720} height={540} className="h-full w-full object-cover" />
              <div className="gallery-card-copy absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(21,16,13,0.92)] to-transparent px-5 py-5">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { quote: "Coffee, pizza, shakes, and an easy room for long Nizamabad evenings.", who: "Priya, regular guest" },
    { quote: "A polished cafe stop for friends, families, and dessert plans.", who: "Arjun, weekend visitor" },
    { quote: "The menu has real range: coffee, coolers, pasta, bowls, affogato.", who: "Fatima, first-time guest" },
    { quote: "Warm service and a brand feel that lands from the first sip.", who: "Karthik, local regular" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="bg-[var(--paper)] px-5 py-24 text-[var(--ink)] reveal-text md:py-32">
      <div className="mx-auto max-w-7xl text-center">
        <SectionHeading kicker="Reviews" title="What guests come in for" tone="dark" />
        <div className="testi-track relative mx-auto mt-12 max-w-2xl min-h-[180px] text-left">
          {testimonials.map((item, index) => (
            <div key={item.who} className={clsx("testi-item", activeIndex === index && "active")}>
              <p className="text-2xl font-display italic leading-snug text-[var(--ink)]">“{item.quote}”</p>
              <div className="who mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{item.who}</div>
            </div>
          ))}
        </div>
        <div className="testi-dots mt-10 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={clsx("testi-dot rounded-full transition", activeIndex === index ? "active" : "")}
              aria-label={`Show testimonial ${index + 1}`}
            />
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
    <footer className="footer-container">
      <div className="top-shimmer-border" />
      <div className="footer-glow" />

      <svg className="curly-flourish flourish-top-left" viewBox="0 0 100 50" fill="none" aria-hidden="true">
        <path
          className="curly-path"
          d="M5,45 C20,45 25,20 40,25 C55,30 50,5 70,10 C85,15 90,30 80,40 C70,50 55,40 60,25 C65,10 85,5 95,20"
          stroke="#c5a059"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <svg className="curly-flourish flourish-top-right" viewBox="0 0 100 50" fill="none" aria-hidden="true">
        <path
          className="curly-path"
          d="M5,45 C20,45 25,20 40,25 C55,30 50,5 70,10 C85,15 90,30 80,40 C70,50 55,40 60,25 C65,10 85,5 95,20"
          stroke="#c5a059"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="footer-content">
        <div className="footer-col">
          <div className="brand-header-flex">
            <div className="footer-logo-wrapper">
              <Image
                src={siteConfig.logo}
                alt={`${siteConfig.siteName} logo`}
                width={70}
                height={70}
                className="footer-logo-image"
                priority
              />
            </div>
            <div className="brand-title-group">
              <h2>The Coffee Evolution</h2>
              <div className="brand-subtitle-text">Coffee = Transformation</div>
            </div>
          </div>
          <p>Crafting rich aromas, artisanal brews, and unforgettable moments. Experience coffee perfected with passion and modern innovation.</p>
          <div className="hours-badge">🕒 Open Daily: 12:30 PM – 10:30 PM</div>
        </div>

        <div className="footer-col">
          <h3>Our Specialty</h3>
          <p>• Specialty Espresso & Pour-overs</p>
          <p>• Handcrafted Cold Brews & Shakes</p>
          <p>• Gourmet Artisan Desserts</p>
          <p>• Cozy Vintage Ambience</p>
        </div>

        <div className="footer-col">
          <h3>Reach Us</h3>
          <ul className="contact-list">
            <li className="contact-item">
              <div className="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <a href="tel:+917989845498">+91 79898 45498</a>
            </li>
            <li className="contact-item">
              <div className="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22 6 12 13 2 6" />
                </svg>
              </div>
              <a href="mailto:coffeevolutionnzbd@gmail.com">coffeevolutionnzbd@gmail.com</a>
            </li>
            <li className="contact-item">
              <div className="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <a href="https://maps.google.com/?q=18.668193,78.109743" target="_blank" rel="noreferrer">
                Nizamabad (18.668193, 78.109743)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 THE COFFEE EVOLUTION. ALL RIGHTS RESERVED.</div>
        <div className="social-links">
          <a href="#" className="social-icon" title="Instagram">IG</a>
          <a href="#" className="social-icon" title="Facebook">FB</a>
          <a href="https://maps.google.com/?q=18.668193,78.109743" target="_blank" rel="noreferrer" className="social-icon" title="Location Map">MAP</a>
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          position: relative;
          background: linear-gradient(180deg, #140b06 0%, #080402 100%);
          border-top: 2px solid #8c6d3b;
          padding: 50px 20px 20px 20px;
          overflow: hidden;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.9);
          color: #f1e4c3;
        }

        .top-shimmer-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c5a059, #f1e4c3, #c5a059, transparent);
          background-size: 200% 100%;
          animation: shimmerLine 3s linear infinite;
        }

        @keyframes shimmerLine {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        .footer-glow {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 250px;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .curly-flourish {
          position: absolute;
          width: 140px;
          height: 70px;
          opacity: 0.6;
          pointer-events: none;
        }

        .flourish-top-left {
          top: 15px;
          left: 15px;
        }

        .flourish-top-right {
          top: 15px;
          right: 15px;
          transform: scaleX(-1);
        }

        .curly-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawCurly 4s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
        }

        @keyframes drawCurly {
          0% {
            stroke-dashoffset: 400;
            opacity: 0.2;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.9;
          }
        }

        .footer-content {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 1fr;
          gap: 40px;
          position: relative;
          z-index: 5;
        }

        .footer-col h3 {
          font-size: 16px;
          color: #c5a059;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 18px;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-col h3::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: #8c6d3b;
        }

        .footer-col p {
          font-size: 12px;
          line-height: 1.8;
          color: #d1c2a5;
          margin-bottom: 12px;
          font-family: Georgia, serif;
        }

        .brand-header-flex {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .footer-logo-wrapper {
          width: 70px;
          height: 70px;
          flex-shrink: 0;
          animation: floatLogo 3.5s ease-in-out infinite alternate;
        }

        .footer-logo-image {
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          object-fit: cover;
          filter: drop-shadow(0 0 8px rgba(197, 160, 89, 0.3));
        }

        @keyframes floatLogo {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-4px);
          }
        }

        .brand-title-group h2 {
          font-size: 16px;
          color: #f1e4c3;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0;
        }

        .brand-subtitle-text {
          font-size: 10px;
          color: #c5a059;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 4px;
          font-weight: 600;
        }

        .brand-motto {
          font-style: italic;
          color: #c5a059 !important;
          font-size: 12px !important;
          font-weight: 600;
        }

        .contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          font-size: 12px;
          color: #d1c2a5;
          font-family: Georgia, serif;
          transition: transform 0.3s ease;
        }

        .contact-item:hover {
          transform: translateX(5px);
          color: #f1e4c3;
        }

        .contact-icon {
          width: 32px;
          height: 32px;
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid #8c6d3b;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          color: #c5a059;
          box-shadow: 0 0 8px rgba(197, 160, 89, 0.1);
        }

        .contact-item a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-item a:hover {
          color: #c5a059;
        }

        .hours-badge {
          display: inline-block;
          background: rgba(140, 109, 59, 0.2);
          border: 1px dashed #8c6d3b;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          color: #f1e4c3;
          margin-top: 5px;
        }

        .footer-bottom {
          max-width: 1100px;
          margin: 30px auto 0 auto;
          padding-top: 20px;
          border-top: 1px solid rgba(140, 109, 59, 0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: #8c6d3b;
          letter-spacing: 1px;
          position: relative;
          z-index: 5;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #8c6d3b;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #c5a059;
          text-decoration: none;
          font-size: 10px;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: #c5a059;
          color: #0a0806;
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.5);
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .curly-flourish {
            display: none;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
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
      <NavigationHeader />
      <main>
        <Hero />
        <MenuBook />
        <About />
        <Team />
        <Gallery />
        <Testimonials />
        <VisitAndReserve />
      </main>
      <Footer />
    </>
  );
}
