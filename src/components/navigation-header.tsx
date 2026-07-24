"use client";

import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home", active: true },
  { label: "Menu", href: "#menu" },
  { label: "About Us", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact Us", href: "#contact" },
];

export function NavigationHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header-container">
      <div className="header-glow" />

      <svg className="curly-flourish flourish-left" viewBox="0 0 100 50" fill="none" aria-hidden="true">
        <path
          className="curly-path"
          d="M5,45 C20,45 25,20 40,25 C55,30 50,5 70,10 C85,15 90,30 80,40 C70,50 55,40 60,25 C65,10 85,5 95,20"
          stroke="#c5a059"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="95" cy="20" r="3" fill="#e0c388" />
      </svg>

      <a href="#" className="brand-section">
        <div className="logo-wrapper">
          <svg className="logo-svg" viewBox="0 0 300 300" aria-hidden="true">
            <circle cx="150" cy="150" r="140" fill="none" stroke="#8c6d3b" strokeWidth="8" />
            <circle cx="150" cy="150" r="132" fill="none" stroke="#180d07" strokeWidth="4" />

            <path id="textArcTop" d="M 40 150 A 110 110 0 1 1 260 150" fill="none" />
            <path d="M 30 150 A 120 120 0 0 1 270 150 L 255 150 A 105 105 0 0 0 45 150 Z" fill="#ffffff" />
            <text fontFamily="Cinzel, serif" fontWeight="bold" fontSize="20" fill="#8c6d3b">
              <textPath xlinkHref="#textArcTop" startOffset="50%" textAnchor="middle">
                THE COFFEE EVOLUTION
              </textPath>
            </text>

            <path
              d="M 150 90 C 110 90 100 130 100 160 C 100 190 120 220 150 220 C 142 195 142 170 150 150 C 158 130 158 110 150 90 Z"
              fill="#8c6d3b"
            />
            <path
              d="M 150 90 C 190 90 200 130 200 160 C 200 190 180 220 150 220 C 142 195 142 170 150 150 C 158 130 158 110 150 90 Z"
              fill="#4a2c11"
            />

            <g stroke="#c5a059" strokeWidth="2" fill="none">
              <path d="M 160 110 L 175 110 L 180 120" />
              <circle cx="180" cy="120" r="3" fill="#c5a059" />
              <path d="M 165 140 L 185 140" />
              <circle cx="185" cy="140" r="3" fill="#c5a059" />
              <path d="M 160 170 L 175 170 L 180 185" />
              <circle cx="180" cy="185" r="3" fill="#c5a059" />
            </g>

            <g stroke="#8c6d3b" strokeWidth="3" fill="none">
              <path d="M 80 160 A 70 70 0 0 0 220 160" />
              <path d="M 90 170 A 60 60 0 0 0 210 170" />
              <path d="M 100 180 A 50 50 0 0 0 200 180" />
            </g>

            <path id="textArcBottom" d="M 60 160 A 100 100 0 0 0 240 160" fill="none" />
            <text fontFamily="Cinzel, serif" fontSize="13" fontWeight="bold" fill="#c5a059" letterSpacing="1">
              <textPath xlinkHref="#textArcBottom" startOffset="50%" textAnchor="middle">
                COFFEE = TRANSFORMATION
              </textPath>
            </text>
          </svg>
        </div>

        <div className="brand-titles">
          <span className="brand-name">The Coffee Evolution</span>
          <span className="brand-tagline">Coffee = Transformation</span>
        </div>
      </a>

      <button
        type="button"
        className="mobile-toggle"
        id="mobileToggle"
        aria-label="Toggle Navigation"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={open ? "nav-menu open" : "nav-menu"} id="navMenu">
        {navItems.map((item) => (
          <li key={item.href} className={`nav-item${item.active ? " active" : ""}`}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
        <li className="nav-item">
          <a href="#order" className="nav-btn">
            Order Online
          </a>
        </li>
      </ul>

      <svg className="curly-flourish flourish-right" viewBox="0 0 100 50" fill="none" aria-hidden="true">
        <path
          className="curly-path"
          d="M5,45 C20,45 25,20 40,25 C55,30 50,5 70,10 C85,15 90,30 80,40 C70,50 55,40 60,25 C65,10 85,5 95,20"
          stroke="#c5a059"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="95" cy="20" r="3" fill="#e0c388" />
      </svg>

      <div className="bottom-border" />

      <style jsx>{`
        .header-container {
          position: relative;
          width: 100%;
          background: linear-gradient(180deg, #180d07 0%, #0d0805 100%);
          border-bottom: 2px solid #8c6d3b;
          padding: 15px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85);
          overflow: hidden;
          z-index: 1000;
          font-family: var(--font-cinzel), Georgia, serif;
        }

        .header-glow {
          position: absolute;
          top: 50%;
          left: 15%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 180px;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%);
          filter: blur(20px);
          pointer-events: none;
        }

        .curly-flourish {
          position: absolute;
          width: 140px;
          height: 70px;
          opacity: 0.65;
          pointer-events: none;
        }

        .flourish-left {
          top: 5px;
          left: 10px;
        }

        .flourish-right {
          bottom: 5px;
          right: 10px;
          transform: scale(-1, -1);
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

        .brand-section {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
        }

        .logo-wrapper {
          flex-shrink: 0;
          animation: floatLogo 3.5s ease-in-out infinite alternate;
        }

        .logo-svg {
          width: 65px;
          height: 65px;
          filter: drop-shadow(0 0 10px rgba(197, 160, 89, 0.35));
        }

        @keyframes floatLogo {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-3px);
          }
        }

        .brand-titles {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #f1e4c3;
          text-transform: uppercase;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
          line-height: 1.2;
        }

        .brand-tagline {
          font-size: 9px;
          letter-spacing: 2px;
          color: #c5a059;
          text-transform: uppercase;
          margin-top: 3px;
          font-weight: 600;
        }

        .nav-menu {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 25px;
          list-style: none;
        }

        .nav-item a {
          position: relative;
          text-decoration: none;
          color: #d1c2a5;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 0;
          transition: color 0.3s ease;
        }

        .nav-item a::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c5a059, transparent);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-item a:hover {
          color: #f1e4c3;
          text-shadow: 0 0 8px rgba(197, 160, 89, 0.5);
        }

        .nav-item a:hover::after,
        .nav-item.active a::after {
          width: 100%;
        }

        .nav-item.active a {
          color: #c5a059;
        }

        .nav-btn {
          background: rgba(197, 160, 89, 0.12);
          border: 1px solid #8c6d3b;
          padding: 8px 16px !important;
          border-radius: 4px;
          transition: all 0.3s ease !important;
        }

        .nav-btn:hover {
          background: #c5a059 !important;
          color: #0d0805 !important;
          box-shadow: 0 0 12px rgba(197, 160, 89, 0.4);
        }

        .nav-btn::after {
          display: none !important;
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10;
        }

        .mobile-toggle span {
          width: 25px;
          height: 2px;
          background: #c5a059;
          transition: all 0.3s ease;
        }

        .bottom-border {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c5a059, #f1e4c3, #c5a059, transparent);
          background-size: 200% 100%;
          animation: shimmerBorder 3s linear infinite;
        }

        @keyframes shimmerBorder {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        @media (max-width: 920px) {
          .curly-flourish {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #120905;
            flex-direction: column;
            gap: 0;
            border-bottom: 2px solid #8c6d3b;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-in-out;
          }

          .nav-menu.open {
            max-height: 400px;
          }

          .nav-item {
            width: 100%;
            text-align: center;
          }

          .nav-item a {
            display: block;
            padding: 15px 0;
            border-bottom: 1px solid rgba(140, 109, 59, 0.15);
          }

          .nav-btn {
            margin: 15px auto;
            display: inline-block !important;
            width: 80%;
          }
        }
      `}</style>
    </header>
  );
}
