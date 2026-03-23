import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ADDONS } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

// ── Single addon card ─────────────────────────────────────────────────────
function AddonCard({ addon, index, cardRef }) {
  const glowRef  = useRef(null);
  const ruleRef  = useRef(null);
  const arrowRef = useRef(null);

  const handleEnter = (e) => {
    const card = e.currentTarget;
    // Border colour
    card.style.borderColor = 'rgba(0,158,221,0.32)';
    // Glow orb fade in
    gsap.to(glowRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    // Top rule wipe right
    gsap.fromTo(ruleRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 0.5, ease: 'power3.out' }
    );
    // Card lift
    gsap.to(card, { y: -8, duration: 0.35, ease: 'power2.out' });
    // Arrow nudge
    gsap.to(arrowRef.current, { x: 4, opacity: 1, duration: 0.25, ease: 'power2.out' });
  };

  const handleLeave = (e) => {
    const card = e.currentTarget;
    card.style.borderColor = 'rgba(226,232,240,0.7)';
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });
    gsap.to(ruleRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.35, ease: 'power2.inOut' });
    gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(arrowRef.current, { x: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut' });
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl border border-slate-200/70 p-7 cursor-default overflow-hidden"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Animated top-edge rule (GSAP controlled) */}
      <div
        ref={ruleRef}
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, #009edd, rgba(0,158,221,0.2))',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />

      {/* Glow orb — fades in on hover */}
      <div
        ref={glowRef}
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,158,221,0.12) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Index + badge row */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <span className="font-['DM_Mono',monospace] text-[11px] font-medium text-slate-300 tracking-[0.1em]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="font-['DM_Mono',monospace] text-[9px] font-bold px-2.5 py-1 rounded-full tracking-[0.06em] uppercase text-white"
          style={{ background: addon.badgeColor?.includes('emerald') ? '#10b981' : addon.badgeColor?.includes('violet') ? '#8b5cf6' : addon.badgeColor?.includes('amber') ? '#f59e0b' : '#009edd' }}
        >
          {addon.badge}
        </span>
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 relative z-10"
        style={{ background: 'linear-gradient(135deg, rgba(0,158,221,0.1), rgba(2,119,189,0.06))' }}
      >
        {addon.icon}
      </div>

      {/* Copy */}
      <h3 className="font-['Syne',sans-serif] font-bold text-slate-900 text-base mb-2.5 tracking-[-0.01em] relative z-10">
        {addon.title}
      </h3>
      <p className="font-['Syne',sans-serif] text-slate-500 text-sm leading-relaxed mb-6 relative z-10">
        {addon.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="eyebrow-dot w-1.5 h-1.5 rounded-full bg-[#009edd]" />
          <span className="font-['DM_Mono',monospace] text-[10px] text-[#009edd] tracking-[0.06em]">Always active</span>
        </div>
        {/* Arrow — hidden at rest, nudges on hover via GSAP */}
        <div ref={arrowRef} className="opacity-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="#009edd" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────
function AddonsSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const paraRef    = useRef(null);
  const dividerRef = useRef(null);
  const cardsRef   = useRef([]);
  const ctaRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading block: clip-path word wipe ─────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: { trigger: headlineRef.current, start: 'top 88%' },
      });

      tl.fromTo(eyebrowRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(headlineRef.current.querySelectorAll('.hword'),
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.75, ease: 'power4.out', stagger: 0.06 },
        '-=0.3'
      )
      .fromTo(paraRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      // ── Cards: staggered y + scale with elastic ease ────────────────────
      gsap.fromTo(cardsRef.current,
        { y: 56, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: { each: 0.1, ease: 'power1.in' },
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 88%',
          },
        }
      );

      // ── CTA bar: rise + fade ────────────────────────────────────────────
      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Split headline into individual word spans for clip-path wipe
  const headlineWords = ['Supercharge', 'your', 'workflow'];
  const headlineAccent = ['with', 'AI.'];

  return (
    <section
      id="addons"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: '#f8fafc' }}
    >
      {/* Subtle dot grid — consistent with other #f8fafc sections */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-[85vw] mx-auto px-16">

        {/* ── Heading ── */}
        <div className="mb-16">

          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 mb-6 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#009edd]" />
            <span>AI-Powered Add-ons</span>
            <span className="w-6 h-px bg-slate-300" />
            <span className="text-[#009edd]">Plug & play</span>
          </div>

          {/* Headline + para — side-by-side like FeaturesSection */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              ref={headlineRef}
              className="font-['DM_Serif_Display',serif] text-slate-900 leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
            >
              {headlineWords.map((w, i) => (
                <span key={i} className="hword inline-block mr-[0.2em]">{w}</span>
              ))}
              <br />
              {headlineAccent.map((w, i) => (
                <span
                  key={i}
                  className={`hword inline-block mr-[0.2em] ${i === 1 ? 'italic text-[#009edd]' : ''}`}
                >
                  {w}
                </span>
              ))}
            </h2>
            <p
              ref={paraRef}
              className="font-['Syne',sans-serif] text-slate-500 text-base leading-relaxed max-w-xs sm:text-right shrink-0"
            >
              Plug in powerful AI tools that work seamlessly inside your CRM.
            </p>
          </div>

          {/* Ruled divider */}
          <div
            ref={dividerRef}
            className="mt-8 h-px"
            style={{
              background: 'linear-gradient(90deg, rgba(0,158,221,0.3), #e2e8f0 40%, transparent)',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* ── Cards grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {ADDONS.map((addon, i) => (
            <AddonCard
              key={addon.id}
              addon={addon}
              index={i}
              cardRef={el => (cardsRef.current[i] = el)}
            />
          ))}
        </div>

        {/* ── CTA bar — dark, mirrors hero/stats strip ── */}
        <div
          ref={ctaRef}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: '#0d1117',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          }}
        >
          {/* Top cyan rule */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #009edd 40%, transparent)' }} />

          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-12 py-10">
            {/* Left copy */}
            <div>
              <p
                className="font-['DM_Serif_Display',serif] text-[#e6edf3] text-2xl leading-tight mb-1"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
              >
                Free add-ons included in{' '}
                <span className="italic text-[#009edd]">every plan.</span>
              </p>
              <p className="font-['DM_Mono',monospace] text-[11px] text-[#8b949e] tracking-[0.06em]">
                Unlock Pro add-ons with Growth or Enterprise plans.
              </p>
            </div>

            {/* CTA button */}
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg border-0 cursor-pointer bg-[#009edd] text-white font-['Syne',sans-serif] text-[0.9rem] font-bold tracking-[0.02em] relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,158,221,0.5)] active:translate-y-0"
            >
              See All Plans
              <svg className="btn-primary-arrow transition-transform duration-200" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddonsSection;