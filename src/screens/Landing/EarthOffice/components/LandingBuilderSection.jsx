import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Tiny animated cursor indicator for the builder canvas ──────────────────
function CursorDot() {
  return (
    <div className="absolute top-[68px] left-[112px] pointer-events-none z-10 flex items-center gap-2">
      <div
        className="w-5 h-5 rounded-full border-2 border-[#009edd] bg-[#009edd]/20 shadow-[0_0_10px_rgba(0,158,221,0.5)]"
        style={{ animation: 'cursor-bob 3s ease-in-out infinite' }}
      />
      <span
        className="bg-[#009edd] text-[#0d1117] font-['DM_Mono',monospace] text-[9px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap"
        style={{ animation: 'cursor-bob 3s ease-in-out infinite' }}
      >
        Dragging…
      </span>
    </div>
  );
}

function LandingBuilderSection() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -56, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 82%' } }
      );
      gsap.fromTo(rightRef.current,
        { x: 56, opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const checkItems = [
    '50+ professionally designed templates',
    'Real-time preview on all screen sizes',
    'Auto-connect forms to your CRM leads',
    'Custom domain publishing in one click',
  ];

  const elements = ['Hero', 'Text Block', 'Button', 'Image', 'Stats', 'Form'];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: '#f8fafc' }}
    >
      {/* Faint dot grid — consistent with FeaturesSection */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 80% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-[85vw] mx-auto px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ════════ LEFT — copy ════════ */}
          <div ref={leftRef}>

            {/* Eyebrow — DM Mono, matches system */}
            <div className="inline-flex items-center gap-2.5 mb-7 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009edd]" />
              <span>Landing Page Builder</span>
              <span className="w-6 h-px bg-slate-300" />
              <span className="text-[#009edd]">No Code</span>
            </div>

            {/* Headline — DM Serif Display */}
            <h2
              className="font-['DM_Serif_Display',serif] text-slate-900 leading-[1.08] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
            >
              Build stunning pages{' '}
              <span className="italic text-[#009edd]">without code.</span>
            </h2>

            {/* Body */}
            <p className="font-['Syne',sans-serif] text-slate-500 text-[1.0625rem] leading-[1.75] max-w-[440px] mb-9">
              Drag, drop, and publish high-converting landing pages in minutes —
              fully integrated with your CRM pipeline.
            </p>

            {/* Checklist */}
            <ul className="space-y-4 mb-10">
              {checkItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  {/* Ruled check icon */}
                  <div className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border border-[#009edd]/30 bg-[#009edd]/8">
                    <svg className="w-3 h-3 text-[#009edd]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="font-['Syne',sans-serif] text-sm font-medium text-slate-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA row */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg border-0 cursor-pointer bg-[#009edd] text-white font-['Syne',sans-serif] text-[0.9rem] font-bold tracking-[0.02em] relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,158,221,0.5)] active:translate-y-0"
              >
                Try Builder Free
                <svg className="btn-primary-arrow transition-transform duration-200" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="font-['DM_Mono',monospace] text-[11px] text-slate-400 tracking-[0.06em]">No credit card required</span>
            </div>
          </div>

          {/* ════════ RIGHT — dark builder mock ════════ */}
          <div
            ref={rightRef}
            className="relative rounded-xl! overflow-hidden"
            style={{
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,158,221,0.08)',
            }}
          >
            {/* ── Browser chrome ── */}
            <div
              className="flex items-center gap-2 px-5 py-3.5 border-b"
              style={{ background: '#161b22', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary-blue!" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
              </div>
              {/* URL bar */}
              <div
                className="flex-1 mx-3 h-6 rounded-md flex items-center gap-2 px-3"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="font-['DM_Mono',monospace] text-[10px] text-[#8b949e]">workspace.earthoffice.cloud/builder</span>
              </div>
              {/* Tabs hint */}
              <span className="font-['DM_Mono',monospace] text-[9px] text-[#8b949e] tracking-[0.08em] uppercase">Builder</span>
            </div>

            {/* ── Toolbar ── */}
            <div
              className="flex items-center gap-2 px-4 py-2 border-b"
              style={{ background: '#161b22', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              {['Desktop', 'Tablet', 'Mobile'].map((v, i) => (
                <span
                  key={v}
                  className={`font-['DM_Mono',monospace] text-[9px] px-2.5 py-1 rounded tracking-[0.06em] cursor-pointer ${
                    i === 0
                      ? 'bg-[#009edd]/15 text-[#009edd]'
                      : 'text-[#8b949e] hover:text-[#b1bac4]'
                  }`}
                >
                  {v}
                </span>
              ))}
              <div className="flex-1" />
              <span
                className="font-['DM_Mono',monospace] text-[9px] px-3 py-1 rounded cursor-pointer text-[#0d1117] font-bold"
                style={{ background: '#009edd' }}
              >
                Publish
              </span>
            </div>

            {/* ── Main builder body ── */}
            <div className="flex" style={{ minHeight: 360 }}>

              {/* Elements panel */}
              <div
                className="w-32 shrink-0 p-3 border-r"
                style={{ background: '#161b22', borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <p className="font-['DM_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.12em] text-[#009edd] mb-3 px-1">
                  Elements
                </p>
                {elements.map((el, i) => (
                  <div
                    key={el}
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg mb-0.5 cursor-pointer transition-colors ${
                      i === 0
                        ? 'bg-[#009edd]/15 border border-[#009edd]/25'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? 'bg-[#009edd]' : 'bg-white/20'}`} />
                    <span className={`font-['DM_Mono',monospace] text-[10px] ${i === 0 ? 'text-[#009edd]' : 'text-[#8b949e]'}`}>
                      {el}
                    </span>
                  </div>
                ))}

                {/* Layers divider */}
                <div className="mt-4 mb-3 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <p className="font-['DM_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.12em] text-[#8b949e] mb-2 px-1">
                  Layers
                </p>
                {['Hero', 'CTA Row', 'Cards'].map((l) => (
                  <div key={l} className="flex items-center gap-2 px-2 py-1.5 mb-0.5 cursor-pointer hover:bg-white/[0.04] rounded-lg">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                    <span className="font-['DM_Mono',monospace] text-[10px] text-[#8b949e]">{l}</span>
                  </div>
                ))}
              </div>

              {/* Canvas */}
              <div className="flex-1 p-5 relative overflow-hidden" style={{ background: '#0d1117' }}>
                <CursorDot />

                {/* Hero banner block */}
                <div
                  className="rounded-xl mb-3.5 p-4 border-2 border-dashed flex flex-col gap-2"
                  style={{
                    borderColor: 'rgba(0,158,221,0.35)',
                    background: 'linear-gradient(135deg, rgba(0,158,221,0.06) 0%, rgba(2,119,189,0.03) 100%)',
                    boxShadow: '0 0 0 3px rgba(0,158,221,0.06)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['DM_Mono',monospace] text-[9px] text-[#009edd] tracking-[0.08em] uppercase">Hero Banner</span>
                    <span className="font-['DM_Mono',monospace] text-[8px] text-[#8b949e]">Selected</span>
                  </div>
                  {/* Skeleton headline */}
                  <div className="h-2.5 rounded bg-white/10 w-3/4" />
                  <div className="h-2 rounded bg-white/[0.06] w-1/2" />
                  {/* Mini CTA */}
                  <div className="mt-1 flex gap-2">
                    <div className="h-6 w-16 rounded-md" style={{ background: '#009edd', opacity: 0.9 }} />
                    <div className="h-6 w-16 rounded-md border" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  </div>
                </div>

                {/* Text block */}
                <div className="rounded-xl mb-3 p-3 border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  <div className="space-y-1.5">
                    <div className="h-2 rounded bg-white/[0.08] w-full" />
                    <div className="h-2 rounded bg-white/[0.06] w-5/6" />
                    <div className="h-2 rounded bg-white/[0.06] w-4/6" />
                  </div>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-3 border flex flex-col gap-2"
                      style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg"
                        style={{ background: 'rgba(0,158,221,0.12)' }}
                      />
                      <div className="h-2 rounded bg-white/[0.08] w-3/4" />
                      <div className="h-1.5 rounded bg-white/[0.05] w-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Properties panel */}
              <div
                className="w-28 shrink-0 p-3 border-l"
                style={{ background: '#161b22', borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <p className="font-['DM_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.12em] text-[#009edd] mb-3 px-1">
                  Properties
                </p>
                {[
                  { prop: 'Width',   val: '100%' },
                  { prop: 'Height',  val: 'auto' },
                  { prop: 'Padding', val: '48px' },
                  { prop: 'Radius',  val: '16px' },
                  { prop: 'BG',      val: 'cyan/6' },
                ].map(({ prop, val }) => (
                  <div key={prop} className="mb-2.5">
                    <p className="font-['DM_Mono',monospace] text-[8px] text-[#8b949e] mb-1 tracking-[0.06em] uppercase">{prop}</p>
                    <div
                      className="font-['DM_Mono',monospace] text-[10px] text-[#b1bac4] px-2 py-1 rounded"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Status bar ── */}
            <div
              className="flex items-center justify-between px-5 py-2 border-t"
              style={{ background: '#161b22', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span className="font-['DM_Mono',monospace] text-[9px] text-[#8b949e]">Autosaved · 2s ago</span>
              </div>
              <span className="font-['DM_Mono',monospace] text-[9px] text-[#8b949e]">3 blocks · 1 selected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingBuilderSection;