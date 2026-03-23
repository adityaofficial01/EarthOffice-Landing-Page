import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

/* Pipeline row */
function PipelineRow({ stage, deals, pct, color, delay }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 1200 + delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between mb-1.5">
        <span className="text-[#b1bac4] text-xs font-medium">{stage}</span>
        <span className="font-['DM_Mono'] text-[0.7rem] text-[#8b949e]">{deals} deals</span>
      </div>
      <div className="h-[5px] bg-[#21262d] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: animated ? `${pct}%` : '0%',
            background: color,
            transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const h1Ref     = useRef(null);
  const paraRef   = useRef(null);
  const ctaRef    = useRef(null);
  const proofRef  = useRef(null);
  const rightRef  = useRef(null);
  const statsRef  = useRef(null);

  const startAnimations = React.useCallback(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(eyebrowRef.current,
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
      );
      const words = h1Ref.current.querySelectorAll('.word');
      gsap.fromTo(words,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.07, delay: 0.25 }
      );
      gsap.fromTo(paraRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.7 }
      );
      gsap.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.9 }
      );
      gsap.fromTo(proofRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1.05 }
      );
      const cards = rightRef.current.querySelectorAll('.reveal-card');
      gsap.fromTo(cards,
        { y: 56, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'expo.out', stagger: 0.12, delay: 0.35 }
      );
      gsap.fromTo(statsRef.current.querySelectorAll('.stat-item'),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', stagger: 0.09, delay: 1.2 }
      );
    }, sectionRef);
    return ctx;
  }, []);

  useEffect(() => {
    let ctx;

    const handleReveal = () => {
      window.__eoRevealed = true;
      ctx = startAnimations();
    };

    // If the event already fired before this effect ran, start immediately
    if (window.__eoRevealed) {
      ctx = startAnimations();
    } else {
      window.addEventListener('earthoffice:reveal', handleReveal, { once: true });
    }

    return () => {
      window.removeEventListener('earthoffice:reveal', handleReveal);
      ctx?.revert();
    };
  }, [startAnimations]);


  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-[#0d1117] overflow-hidden flex flex-col pt-20 font-['Syne',sans-serif]"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />
      {/* Orb 1 */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 720, height: 720, top: -200, right: -180,
          background: 'radial-gradient(circle, rgba(0,158,221,0.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Orb 2 */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500, height: 500, bottom: -100, left: -120,
          background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />
      {/* Vertical accent rule — needs gradient, stays as inline style */}
      <div
        className="absolute top-0 left-12 w-px h-full opacity-[0.18] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, #009edd 20%, #009edd 60%, transparent 100%)' }}
      />

      {/* ── Main content grid ── */}
      <div className="relative z-10  sm:max-w-[85vw] mx-auto w-full px-4 sm:px-16 pt-[72px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ════ LEFT ════ */}
        <div>
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 mb-8 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]"
          >
            {/* pulse animation lives in index.css as .eyebrow-dot */}
            <span className="eyebrow-dot w-1.5 h-1.5 rounded-full bg-[#009edd]" />
            <span className="text-[#b1bac4]">CRM · 2026 Edition</span>
            <span className="w-6 h-px bg-[#8b949e] opacity-40" />
            <span className="text-[#10b981] font-medium">Live</span>
          </div>

          {/* Headline — clamp() font-size stays inline */}
          <h1
            ref={h1Ref}
            className="font-['DM_Serif_Display',serif] leading-[1.08] tracking-[-0.02em] text-[#e6edf3] mb-6"
            style={{ fontSize: 'clamp(3rem, 5.5vw, 5.25rem)' }}
          >
            {['Manage', 'your', 'business.'].map((w, i) => (
              <span key={i} className="word inline-block mr-[0.22em]">{w}</span>
            ))}
            <br />
            <span className="word inline-block mr-[0.22em] italic">Simplify</span>
            {' '}
            <span className="word inline-block italic text-[#009edd]">everything.</span>
          </h1>

          {/* Paragraph */}
          <p ref={paraRef} className="text-[1.0625rem] leading-[1.75] text-[#b1bac4] max-w-[440px] mb-9">
            Earth Office unifies contacts, deals, leads,<br />
            emails and pages — supercharged with AI.
          </p>

          {/* CTAs — ::before shimmer + hover svg child selector stay in index.css as .btn-primary */}
          <div ref={ctaRef} className="flex flex-wrap gap-3.5 items-center mb-11">
            <button
              className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg border-0 cursor-pointer bg-[#009edd] text-white font-['Syne',sans-serif] text-[0.9rem] font-bold tracking-[0.02em] transition-[transform,box-shadow] duration-200 relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(0,158,221,0.55)] active:translate-y-0"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className=''>Start free trial</span>
              <svg className="btn-primary-arrow transition-transform duration-200" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="inline-flex items-center gap-3 px-[22px] py-[13px] rounded-lg cursor-pointer bg-transparent border border-white/[0.07] text-[#b1bac4] font-['Syne',sans-serif] text-[0.9rem] font-semibold transition-all duration-200 hover:border-[#009edd]/40 hover:text-[#009edd] hover:bg-[#009edd]/10">
              <span className="w-[30px] h-[30px] rounded-full bg-[#009edd]/10 flex items-center justify-center text-[#009edd]">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                  <path d="M0 1.5A1.5 1.5 0 0 1 2.25.201l9 5.5a1.5 1.5 0 0 1 0 2.598l-9 5.5A1.5 1.5 0 0 1 0 12.5v-11Z"/>
                </svg>
              </span>
              Watch demo
            </button>
          </div>

          {/* Social proof */}
          <div ref={proofRef} className="flex items-center gap-4">
            <div className="flex">
              {[
                { g: '#009edd,#0277bd', l: 'J' },
                { g: '#3b82f6,#1d4ed8', l: 'S' },
                { g: '#8b5cf6,#6d28d9', l: 'M' },
                { g: '#10b981,#059669', l: 'L' },
                { g: '#f59e0b,#d97706', l: 'A' },
              ].map((a, i) => (
                <div
                  key={i}
                  className="w-[34px] h-[34px] rounded-full border-2 border-[#0d1117] flex items-center justify-center font-['Syne'] text-[11px] font-extrabold text-white -ml-2 first:ml-0"
                  style={{ background: `linear-gradient(135deg,${a.g})`, zIndex: 5 - i }}
                >
                  {a.l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-px mb-0.5">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className="text-amber-400 text-[13px]">{s}</span>
                ))}
              </div>
              <p className="text-[0.8125rem] text-[#b1bac4] mt-0.5">
                <strong className="text-[#e6edf3]">4.9</strong> · 500+ teams trust Earth Office
              </p>
            </div>
          </div>
        </div>

        {/* ════ RIGHT ════ */}
        <div ref={rightRef} className="flex flex-col gap-3.5">

          {/* Mini cards */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* reveal-card ::before top-edge glow stays in index.css */}
            <div className="reveal-card relative overflow-hidden bg-[#161b22] border border-white/[0.07] rounded-2xl backdrop-blur-xl p-[22px_20px]">
              <span className="text-[22px] block mb-3">👥</span>
              <div className="font-['Syne'] text-[1.875rem] font-extrabold text-[#e6edf3] tracking-[-0.03em] leading-none mb-1">4,821</div>
              <div className="text-xs text-[#8b949e] font-medium tracking-[0.04em] mb-2.5">Contacts</div>
              <span className="inline-block font-['DM_Mono'] text-[10px] font-medium px-2 py-[3px] rounded bg-[#10b981]/10 text-[#10b981] tracking-[0.04em]">↑ 12.4%</span>
            </div>
            <div className="reveal-card relative overflow-hidden bg-[#161b22] border border-white/[0.07] rounded-2xl backdrop-blur-xl p-[22px_20px]">
              <span className="text-[22px] block mb-3">💰</span>
              <div className="font-['Syne'] text-[1.875rem] font-extrabold text-[#e6edf3] tracking-[-0.03em] leading-none mb-1">$84K</div>
              <div className="text-xs text-[#8b949e] font-medium tracking-[0.04em] mb-2.5">MRR</div>
              <span className="inline-block font-['DM_Mono'] text-[10px] font-medium px-2 py-[3px] rounded bg-[#009edd]/10 text-[#009edd] tracking-[0.04em]">On track</span>
            </div>
          </div>

          {/* Pipeline card */}
          <div className="reveal-card relative overflow-hidden bg-[#161b22] border border-white/[0.07] rounded-2xl backdrop-blur-xl p-[22px]">
            <div className="flex justify-between items-center mb-[18px]">
              <span className="text-sm font-bold text-[#e6edf3] tracking-[0.02em]">Sales Pipeline</span>
              <span className="flex items-center gap-1.5 font-['DM_Mono'] text-[10px] font-medium text-[#10b981] bg-[#10b981]/10 px-[9px] py-[3px] rounded-full">
                {/* pulse animation lives in index.css as .live-dot */}
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                Live
              </span>
            </div>
            {[
              { stage: 'Prospecting',   deals: 24, pct: 85, color: '#009edd', delay: 0   },
              { stage: 'Proposal Sent', deals: 14, pct: 60, color: '#38bdf8', delay: 100 },
              { stage: 'Negotiation',   deals: 9,  pct: 40, color: '#0277bd', delay: 200 },
              { stage: 'Closing',       deals: 5,  pct: 22, color: '#10b981', delay: 300 },
            ].map(r => <PipelineRow key={r.stage} {...r} />)}
          </div>

          {/* AI insight card */}
          <div
            className="reveal-card relative overflow-hidden border border-[#009edd]/20 rounded-2xl backdrop-blur-xl p-[18px_20px] flex items-center gap-4"
            style={{ background: 'linear-gradient(135deg, rgba(0,158,221,0.07) 0%, rgba(2,119,189,0.04) 100%)' }}
          >
            <div className="w-10 h-10 rounded-[10px] shrink-0 bg-[#009edd]/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009edd" strokeWidth="1.75">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zm-2 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-['DM_Mono'] text-[10px] font-medium tracking-[0.1em] uppercase text-[#009edd] mb-1">AI Insight</p>
              <p className="text-[0.8125rem] text-[#b1bac4] leading-[1.55]">
                Follow up with <strong className="text-[#e6edf3]">Luca Ferrari</strong> — idle 5 days.{' '}
                Close probability: <strong className="text-[#009edd]">87%</strong>
              </p>
            </div>
            <div className="shrink-0">
              <svg viewBox="0 0 36 36" width="52" height="52" className="block">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(0,158,221,0.15)" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15" fill="none" stroke="#009edd" strokeWidth="3"
                  strokeDasharray="81.7 94.2" strokeLinecap="round"
                  transform="rotate(-90 18 18)"/>
                <text x="18" y="22" textAnchor="middle" fill="#009edd" fontSize="8" fontWeight="700" fontFamily="DM Mono">87%</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ════ STATS BAR ════ */}
      <div
        ref={statsRef}
        className="relative z-10 max-w-[85vw] mx-auto w-full px-16 mt-12 pb-16 grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.07]"
      >
        {[
          { n: '2,400+', label: 'Businesses' },
          { n: '10×',    label: 'Faster Pipelines' },
          { n: '99.9%',  label: 'Uptime SLA' },
          { n: '< 2h',   label: 'To Onboard' },
        ].map((s, i) => (
          <div
            key={i}
            className="stat-item flex flex-col gap-1.5 py-8 px-6 border-r border-white/[0.07] last:border-r-0"
          >
            <span className="font-['DM_Serif_Display'] text-[2.25rem] leading-none text-[#009edd] tracking-[-0.03em]">{s.n}</span>
            <span className="text-[0.8125rem] text-[#8b949e] font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}