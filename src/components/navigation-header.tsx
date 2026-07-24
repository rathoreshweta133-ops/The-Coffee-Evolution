"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Menu", href: "#menu" },
  { name: "About Us", href: "#about" },
  { name: "Our Team", href: "#team" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact Us", href: "#contact" },
];

export function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            const link = navLinks.find(l => l.href === `#${section}`);
            if (link) setActiveLink(link.name);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-1000 flex items-center justify-between border-b-2 border-[#8c6d3b] bg-linear-to-b from-[#180d07] to-[#0d0805] px-10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)] overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-[15%] h-[180px] w-[300px] -translate-x-1/2 -translate-y-1/2 blur-[20px] bg-[radial-gradient(circle,rgba(197,160,89,0.12)_0%,transparent_70%)]" />
      
      {/* Flourish Left */}
      <svg className="pointer-events-none absolute top-[5px] left-[10px] h-[70px] w-[140px] opacity-65" viewBox="0 0 100 50" fill="none">
        <path 
          className="stroke-[#c5a059] [stroke-dasharray:400] [stroke-dashoffset:400] animate-[drawCurly_4s_cubic-bezier(0.4,0,0.2,1)_infinite_alternate]" 
          d="M5,45 C20,45 25,20 40,25 C55,30 50,5 70,10 C85,15 90,30 80,40 C70,50 55,40 60,25 C65,10 85,5 95,20" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        <circle cx="95" cy="20" r="3" fill="#e0c388"/>
      </svg>

      <Link href="#hero" className="relative z-5 flex items-center gap-3.5 text-decoration-none">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#c5a059] shadow-[0_0_12px_rgba(197,160,89,0.25)] bg-[radial-gradient(circle_at_35%_30%,#2e1a10,#150c07)]">
          <Image src="/images/logo/reallogo.jpeg" alt="TCE Logo" width={56} height={56} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-display text-base font-bold leading-tight tracking-[2.5px] text-[#f1e4c3] uppercase shadow-[0_2px_6px_rgba(0,0,0,0.9)]">The Coffee Evolution</span>
          <span className="mt-1 text-[9px] font-semibold tracking-[2px] text-[#c5a059] uppercase">Nizamabad</span>
        </div>
      </Link>

      <button 
        className="relative z-10 flex flex-col gap-1.5 border-none bg-none lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation"
      >
        <span className={clsx("h-0.5 w-6 bg-[#c5a059] transition-all", isOpen && "translate-y-2 rotate-45")} />
        <span className={clsx("h-0.5 w-6 bg-[#c5a059] transition-all", isOpen && "opacity-0")} />
        <span className={clsx("h-0.5 w-6 bg-[#c5a059] transition-all", isOpen && "-translate-y-2 -rotate-45")} />
      </button>

      <ul className={clsx(
        "relative z-5 flex list-none items-center gap-5.5 transition-all max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:w-full max-lg:flex-col max-lg:gap-0 max-lg:bg-[#120905] max-lg:border-b-2 max-lg:border-[#8c6d3b] max-lg:overflow-hidden",
        isOpen ? "max-lg:max-h-[400px]" : "max-lg:max-h-0"
      )}>
        {navLinks.map((link) => (
          <li key={link.name} className="max-lg:w-full max-lg:text-center">
            <Link 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "relative inline-block py-2 text-[11.5px] font-semibold tracking-[2px] text-[#d1c2a5] uppercase transition-all duration-300 hover:text-[#f1e4c3] hover:[text-shadow:0_0_8px_rgba(197,160,89,0.5)] after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-linear-to-r after:from-transparent after:via-[#c5a059] after:to-transparent after:transition-all after:duration-300 hover:after:w-full max-lg:block max-lg:border-b max-lg:border-[#8c6d3b]/15 max-lg:py-4",
                activeLink === link.name && "text-[#c5a059] after:w-full"
              )}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Flourish Right */}
      <svg className="pointer-events-none absolute right-[10px] bottom-[5px] h-[70px] w-[140px] -scale-100 opacity-65" viewBox="0 0 100 50" fill="none">
        <path 
          className="stroke-[#c5a059] [stroke-dasharray:400] [stroke-dashoffset:400] animate-[drawCurly_4s_cubic-bezier(0.4,0,0.2,1)_infinite_alternate]" 
          d="M5,45 C20,45 25,20 40,25 C55,30 50,5 70,10 C85,15 90,30 80,40 C70,50 55,40 60,25 C65,10 85,5 95,20" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        <circle cx="95" cy="20" r="3" fill="#e0c388"/>
      </svg>
      
      {/* Bottom Shimmer Border */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full animate-[shimmerBorder_3s_linear_infinite] bg-linear-to-r from-transparent via-[#c5a059] via-[#f1e4c3] via-[#c5a059] to-transparent [background-size:200%_100%]" />

      <style jsx global>{`
        @keyframes drawCurly {
          0% { stroke-dashoffset: 400; opacity: 0.2; }
          100% { stroke-dashoffset: 0; opacity: 0.9; }
        }
        @keyframes shimmerBorder {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </header>
  );
}
