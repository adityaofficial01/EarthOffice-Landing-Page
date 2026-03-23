import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TRUST_ITEMS = [
  'No credit card required',
  'Free plan forever',
  '99.9% Uptime SLA',
  'Cancel anytime',
];

function CTASection() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const headlineRef = useRef(null);
  const paraRef     = useRef(null);
  const ctaRef      = useRef(null);
  const trustRef    = useRef(null);
  const ruleTopRef  = useRef(null);
  const ruleBottomRef = useRef(null);
  // Floating orb refs for parallax
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Entry timeline ────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Top + bottom rules wipe in simultaneously
      tl.fromTo([ruleTopRef.current, ruleBottomRef.current],
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.9, ease: 'power3.out', stagger: 0 }
      )
      // Eyebrow slides from left
      .fromTo(eyebrowRef.current,
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      )
      // Headline words: clip-path wipe stagger
      .fromTo(headlineRef.current.querySelectorAll('.hword'),
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.85, ease: 'power4.out', stagger: 0.07 },
        '-=0.3'
      )
      // Para
      .fromTo(paraRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      )
      // CTA buttons scale up
      .fromTo(ctaRef.current.children,
        { y: 24, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)' },
        '-=0.4'
      )
      // Trust items stagger from bottom
      .fromTo(trustRef.current.children,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out' },
        '-=0.3'
      );

      // ── Orb parallax on scroll ────────────────────────────────────────
      gsap.to(orb1Ref.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      gsap.to(orb2Ref.current, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // ── Continuous slow rotation on orbs ─────────────────────────────
      gsap.to(orb1Ref.current, { rotation: 360, duration: 28, ease: 'none', repeat: -1 });
      gsap.to(orb2Ref.current, { rotation: -360, duration: 22, ease: 'none', repeat: -1 });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: '#0d1117' }}
    >
      {/* ── Background layers ── */}

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Orb 1 — top right */}
      <div
        ref={orb1Ref}
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          top: -180, right: -180,
          background: 'radial-gradient(circle, rgba(0,158,221,0.15) 0%, transparent 65%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      />
      {/* Orb 2 — bottom left */}
      <div
        ref={orb2Ref}
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500,
          bottom: -120, left: -120,
          background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 65%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* ── Ruled borders top & bottom ── */}
      <div
        ref={ruleTopRef}
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #009edd 30%, #009edd 70%, transparent)',
          transformOrigin: 'center',
          transform: 'scaleX(0)',
        }}
      />
      <div
        ref={ruleBottomRef}
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,158,221,0.3) 40%, rgba(0,158,221,0.3) 60%, transparent)',
          transformOrigin: 'center',
          transform: 'scaleX(0)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-16 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="inline-flex items-center gap-2.5 mb-8 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]"
        >
          <span className="eyebrow-dot w-1.5 h-1.5 rounded-full bg-[#009edd]" />
          <span>Start Today — Free</span>
          <span className="w-6 h-px bg-white/[0.15]" />
          <span className="text-[#009edd]">No card needed</span>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-['DM_Serif_Display',serif] text-[#e6edf3] leading-[1.06] tracking-[-0.03em] mb-7 max-w-4xl"
          style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}
        >
          <span className="hword inline-block mr-[0.2em]">Start</span>
          <span className="hword inline-block mr-[0.2em]">managing</span>
          <span className="hword inline-block mr-[0.2em]">smarter</span>
          <br />
          <span className="hword inline-block mr-[0.2em]">—</span>
          <span className="hword inline-block italic text-[#009edd]">today.</span>
        </h2>

        {/* Para */}
        <p
          ref={paraRef}
          className="font-['Syne',sans-serif] text-[#b1bac4] text-[1.0625rem] leading-[1.75] max-w-lg mb-12"
        >
          Join 2,400+ businesses who made the switch. Onboard in under 2 hours.
          Your data, your pipeline, your growth.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center mb-14">
          <button
            className="btn-primary inline-flex items-center gap-2.5 px-10 py-4 rounded-xl border-0 cursor-pointer bg-[#009edd] text-white font-['Syne',sans-serif] text-base font-bold tracking-[0.02em] relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_0_48px_rgba(0,158,221,0.6)] active:translate-y-0"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started for Free
            <svg className="btn-primary-arrow transition-transform duration-200" width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl cursor-pointer bg-transparent border border-white/[0.1] text-[#b1bac4] font-['Syne',sans-serif] text-base font-semibold transition-all duration-200 hover:border-[#009edd]/40 hover:text-[#009edd] hover:bg-[#009edd]/8"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Talk to Sales
          </button>
        </div>

        {/* Trust badges */}
        <div
          ref={trustRef}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {TRUST_ITEMS.map((txt) => (
            <span
              key={txt}
              className="inline-flex items-center gap-2 font-['DM_Mono',monospace] text-[11px] text-[#8b949e] tracking-[0.04em]"
            >
              {/* Check mark */}
              <span
                className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,158,221,0.12)', border: '1px solid rgba(0,158,221,0.2)' }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#009edd" strokeWidth="3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </span>
              {txt}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CTASection;