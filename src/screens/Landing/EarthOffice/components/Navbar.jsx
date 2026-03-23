import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NAV_LINKS } from '../constants/data';
import { Image } from 'antd';
import { StaticImages } from 'utils/StaticImages';

// Threshold at which we consider the hero "passed".
// Adjust this to match your hero section's height if needed.
const HERO_THRESHOLD = 80;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );

    const onScroll = () => setScrolled(window.scrollY > HERO_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  // ── Derived theme tokens ──────────────────────────────────────────────────
  // dark  = over the hero  (dark bg, light text)
  // light = scrolled past  (frosted white bg, dark text)
  const isDark = !scrolled;

  const navBg = scrolled
    ? 'rgba(255,255,255,0.92)'
    : 'rgba(13,17,23,0)'; // hero bg = #0d1117, start fully transparent

  const borderColor = scrolled
    ? 'rgba(226,232,240,0.8)'
    : 'rgba(255,255,255,0.07)';

  const logoTextColor     = isDark ? '#e6edf3' : '#0d1117';
  const logoAccentColor   = '#009edd'; // cyan stays cyan in both modes
  const linkColor         = isDark ? '#b1bac4' : '#64748b';
  const linkHoverBg       = isDark ? 'hover:bg-white/[0.07]' : 'hover:bg-slate-100';
  const linkHoverText     = isDark ? 'hover:text-[#e6edf3]' : 'hover:text-slate-900';
  const signInColor       = isDark ? 'text-[#b1bac4] hover:text-[#e6edf3]' : 'text-slate-600 hover:text-slate-900';
  const mobileToggleBorder = isDark ? 'border-white/[0.12]' : 'border-slate-200';
  const mobileToggleColor  = isDark ? 'text-[#b1bac4]'       : 'text-slate-600';

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: navBg,
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        borderBottom: `1px solid ${borderColor}`,
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-16">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 focus:outline-none"
          >
            {/* Icon mark */}
            <div
              className=" flex items-center justify-center"
             
            >
              {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
                <path
                  d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9"
                  stroke="white" strokeWidth="1.5" strokeLinecap="round"
                />
              </svg> */}
              <Image height={30} src={StaticImages.LOGO.Logo}/>
            </div>

            {/* Wordmark — Syne font, matches HeroSection */}
            <span
              className="font-['Syne',sans-serif] font-extrabold text-xl tracking-tight transition-colors duration-500"
              style={{ color: logoTextColor }}
            >
              Earth<span style={{ color: logoAccentColor }}>Office</span>
            </span>
          </button>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium font-['Syne',sans-serif]
                  transition-all duration-200 focus:outline-none
                  ${linkHoverBg} ${linkHoverText}
                `}
                style={{ color: linkColor }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── Desktop CTAs ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Sign in — text link */}
            <button
              onClick={() => scrollTo('pricing')}
              className={`
                px-4 py-2 text-sm font-medium font-['Syne',sans-serif]
                transition-colors duration-200 focus:outline-none ${signInColor}
              `}
            >
              Sign In
            </button>

            {/* Get Started — filled pill */}
            <button
              onClick={() => scrollTo('pricing')}
              className="
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-lg
                font-['Syne',sans-serif] text-sm font-bold text-white
                bg-[#009edd]
                transition-all duration-200 focus:outline-none
                hover:-translate-y-px hover:shadow-[0_0_24px_rgba(0,158,221,0.5)]
                active:translate-y-0
              "
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className={`
              lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center
              transition-colors duration-200 focus:outline-none
              ${mobileToggleBorder} ${mobileToggleColor}
            `}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div
            className="lg:hidden rounded-2xl mb-4 overflow-hidden border"
            style={{
              background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(22,27,34,0.97)',
              borderColor: scrolled ? 'rgba(226,232,240,0.8)' : 'rgba(255,255,255,0.1)',
              boxShadow: scrolled
                ? '0 8px 32px rgba(0,0,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <div className="p-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`
                    block w-full text-left px-4 py-3 rounded-xl
                    text-sm font-medium font-['Syne',sans-serif]
                    transition-colors focus:outline-none
                    ${isDark
                      ? 'text-[#b1bac4] hover:text-[#e6edf3] hover:bg-white/[0.07]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9' }}>
                <button
                  onClick={() => scrollTo('pricing')}
                  className="
                    w-full py-3.5 rounded-xl
                    font-['Syne',sans-serif] font-bold text-sm text-[#0d1117]
                    bg-[#009edd]
                    hover:shadow-[0_0_20px_rgba(0,158,221,0.45)]
                    transition-all duration-200
                  "
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;