import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

// ─── Progress bar that fills over `duration` ms ───────────────────────────
function ProgressBar({ duration, active, index, onClick }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.killTweensOf(barRef.current);
    if (active === index) {
      gsap.fromTo(barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: duration / 1000, ease: 'none', transformOrigin: 'left' }
      );
    } else {
      gsap.set(barRef.current, { scaleX: active > index ? 1 : 0 });
    }
  }, [active, index, duration]);

  return (
    <button
      onClick={() => onClick(index)}
      className="relative h-[3px] rounded-full overflow-hidden focus:outline-none"
      style={{
        width: active === index ? '2.5rem' : '0.75rem',
        background: 'rgba(0,158,221,0.15)',
        transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div
        ref={barRef}
        className="absolute inset-0 rounded-full bg-[#009edd]"
        style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
      />
    </button>
  );
}

// ─── Avatar pill in the sidebar ───────────────────────────────────────────
function AvatarPill({ t, isActive, onClick, index }) {
  const ref = useRef(null);

  const handleEnter = () => {
    if (isActive) return;
    gsap.to(ref.current, { x: 6, duration: 0.22, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, duration: 0.28, ease: 'power2.inOut' });
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex items-center gap-3 w-full focus:outline-none group"
    >
      {/* Active left rule */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300"
        style={{
          background: '#009edd',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'opacity 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      <div className="pl-4 flex items-center gap-3 py-2 flex-1">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-['Syne',sans-serif] text-sm font-black text-white shrink-0 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${t.avatarBg?.includes('blue') ? '#009edd,#0277bd' : t.avatarBg?.includes('violet') ? '#8b5cf6,#6d28d9' : t.avatarBg?.includes('emerald') ? '#10b981,#059669' : t.avatarBg?.includes('rose') ? '#f43f5e,#e11d48' : '#f59e0b,#d97706'})`,
            opacity: isActive ? 1 : 0.5,
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isActive ? '0 0 0 2px #fff, 0 0 0 3.5px #009edd' : 'none',
          }}
        >
          {t.avatar}
        </div>

        {/* Name + role — only fully visible when active */}
        <div
          className="text-left transition-all duration-300"
          style={{ opacity: isActive ? 1 : 0.4 }}
        >
          <p className="font-['Syne',sans-serif] text-slate-900 text-[13px] font-bold leading-tight">{t.name}</p>
          <p className="font-['DM_Mono',monospace] text-[10px] text-[#8b949e] mt-0.5">{t.role}</p>
        </div>
      </div>
    </button>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────
const AUTO_DURATION = 5000;

function TestimonialsSection() {
  const [active, setActive]   = useState(0);
  const [prev, setPrev]       = useState(null);
  console.log(prev)
  const sectionRef   = useRef(null);
  const eyebrowRef   = useRef(null);
  const headlineRef  = useRef(null);
  const dividerRef   = useRef(null);
  const quoteRef     = useRef(null);
  const authorRef    = useRef(null);
  const bigQuoteRef  = useRef(null); // giant decorative quote mark
  const timerRef     = useRef(null);

  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[active];

  // ── Switch testimonial with GSAP crossfade ──────────────────────────────
  const switchTo = useCallback((next) => {
    if (next === active) return;
    const tl = gsap.timeline();
    tl.to([quoteRef.current, authorRef.current, bigQuoteRef.current],
      { opacity: 0, y: -16, duration: 0.22, ease: 'power2.in', stagger: 0.04 }
    )
    .call(() => { setPrev(active); setActive(next); })
    .fromTo([bigQuoteRef.current, quoteRef.current, authorRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07 },
      '+=0.02'
    );
  }, [active]);

  // ── Auto-advance ────────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(p => {
        const next = (p + 1) % total;
        // We do the animation directly here to avoid stale closure
        const tl = gsap.timeline();
        tl.to([quoteRef.current, authorRef.current, bigQuoteRef.current],
          { opacity: 0, y: -14, duration: 0.22, ease: 'power2.in', stagger: 0.04 }
        )
        .call(() => setPrev(p))
        .fromTo([bigQuoteRef.current, quoteRef.current, authorRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07 },
          '+=0.02'
        );
        return next;
      });
    }, AUTO_DURATION);
    return () => clearInterval(timerRef.current);
  }, [total]);

  // Reset timer when manually switching
  const handleSwitch = (i) => {
    clearInterval(timerRef.current);
    switchTo(i);
    timerRef.current = setInterval(() => {
      setActive(p => {
        const next = (p + 1) % total;
        const tl = gsap.timeline();
        tl.to([quoteRef.current, authorRef.current, bigQuoteRef.current],
          { opacity: 0, y: -14, duration: 0.22, ease: 'power2.in', stagger: 0.04 }
        )
        .call(() => setPrev(p))
        .fromTo([bigQuoteRef.current, quoteRef.current, authorRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07 },
          '+=0.02'
        );
        return next;
      });
    }, AUTO_DURATION);
  };

  // ── Entry animations ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: headlineRef.current, start: 'top 88%' },
      });
      tl.fromTo(eyebrowRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(headlineRef.current.querySelectorAll('.hword'),
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.75, ease: 'power4.out', stagger: 0.07 },
        '-=0.3'
      )
      .fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(bigQuoteRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
        '-=0.4'
      )
      .fromTo(quoteRef.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(authorRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.4'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: '#f8fafc' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
      {/* Radial glow behind quote */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,158,221,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full sm:max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* ── Heading ── */}
        <div className="mb-16">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 mb-6 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#009edd]" />
            <span>What Our Users Say</span>
            <span className="w-6 h-px bg-slate-300" />
            <span className="text-[#009edd]">2,400+ businesses</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              ref={headlineRef}
              className="font-['DM_Serif_Display',serif] text-slate-900 leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
            >
              <span className="hword inline-block mr-[0.2em]">Loved</span>
              <span className="hword inline-block mr-[0.2em]">by</span>
              <br />
              <span className="hword inline-block mr-[0.2em]">real</span>
              <span className="hword inline-block italic text-[#009edd]">businesses.</span>
            </h2>
            <p className="font-['Syne',sans-serif] text-slate-500 text-base leading-relaxed max-w-xs sm:text-right shrink-0">
              Join thousands of teams that trust Earth Office to run their business.
            </p>
          </div>

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

        {/* ── Main layout: large quote (left) + avatar sidebar (right) ── */}
        <div className="grid lg:grid-cols-[1fr_200px] gap-16 items-start">

          {/* Large quote area */}
          <div className="relative ">

            {/* Decorative big quote mark */}
            <div
              ref={bigQuoteRef}
              className="font-['DM_Serif_Display',serif] text-[#009edd] leading-none select-none pointer-events-none mb-4"
              style={{ fontSize: 'clamp(5rem, 10vw, 9rem)', opacity: 0.18, lineHeight: 0.8 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Quote text */}
            <blockquote
              ref={quoteRef}
              className="font-['DM_Serif_Display',serif] -mt-10 sm:-mt-16   text-slate-900 leading-[1.35] tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              {t.review}
            </blockquote>

            {/* Author row */}
            <div ref={authorRef} className="flex items-center  justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-['Syne',sans-serif] font-black text-lg text-white"
                  style={{
                    background: `linear-gradient(135deg, ${t.avatarBg?.includes('blue') ? '#009edd,#0277bd' : t.avatarBg?.includes('violet') ? '#8b5cf6,#6d28d9' : t.avatarBg?.includes('emerald') ? '#10b981,#059669' : t.avatarBg?.includes('rose') ? '#f43f5e,#e11d48' : '#f59e0b,#d97706'})`,
                    boxShadow: '0 0 0 3px #f8fafc, 0 0 0 5px rgba(0,158,221,0.3)',
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-['Syne',sans-serif] text-slate-900 font-bold text-base">{t.name}</p>
                  <p className="font-['DM_Mono',monospace] text-[11px] text-[#8b949e] mt-0.5">{t.role}</p>
                </div>
              </div>

              {/* Stars + verified */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-0.5">
                  {[...Array(t.stars || 5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#009edd]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-['DM_Mono',monospace] text-[10px] text-[#009edd] tracking-[0.06em]">Verified Customer</span>
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-10">
              {TESTIMONIALS.map((_, i) => (
                <ProgressBar
                  key={i}
                  index={i}
                  active={active}
                  duration={AUTO_DURATION}
                  onClick={handleSwitch}
                />
              ))}
              <span className="ml-3 font-['DM_Mono',monospace] text-[10px] text-[#8b949e] tracking-[0.06em]">
                {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Avatar sidebar */}
          <div
            className="hidden lg:flex flex-col gap-1 pt-2 border-l border-slate-200/70 pl-8"
          >
            <p className="font-['DM_Mono',monospace] text-[9px] text-[#8b949e] uppercase tracking-[0.12em] mb-4 px-4">
              Reviews
            </p>
            {TESTIMONIALS.map((testimonial, i) => (
              <AvatarPill
                key={testimonial.id}
                t={testimonial}
                isActive={i === active}
                onClick={() => handleSwitch(i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;