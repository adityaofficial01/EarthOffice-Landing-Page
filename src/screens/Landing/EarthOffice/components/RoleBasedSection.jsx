import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROLE_FEATURES } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    key: 'individual',
    label: 'Individual',
    icon: '👤',
    sub: 'For freelancers & solopreneurs',
    stats: [
      { label: 'My Contacts',  value: '247',     color: '#009edd' },
      { label: 'Active Deals', value: '12',      color: '#009edd' },
      { label: 'Revenue MTD',  value: '$18,400', color: '#10b981' },
    ],
  },
  {
    key: 'organization',
    label: 'Organization',
    icon: '🏢',
    sub: 'For teams & enterprises',
    stats: [
      { label: 'Team Members',     value: '24',       color: '#009edd' },
      { label: 'Shared Pipelines', value: '8',        color: '#009edd' },
      { label: 'Team Revenue',     value: '$184,000', color: '#10b981' },
    ],
  },
];

// ─── Animated stat row ────────────────────────────────────────────────────
function StatRow({ label, value, color, delay }) {
  const rowRef  = useRef(null);
  const valRef  = useRef(null);

  useEffect(() => {
    gsap.fromTo(rowRef.current,
      { x: 16, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay }
    );
    gsap.fromTo(valRef.current,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: delay + 0.05 }
    );
  }, [delay, value]); // re-animate when value changes (role switch)

  return (
    <div
      ref={rowRef}
      className="flex items-center justify-between px-5 py-4 rounded-xl border border-slate-100 bg-[#f8fafc] mb-2.5 last:mb-0"
    >
      <span className="font-['Syne',sans-serif] text-slate-500 text-sm">{label}</span>
      <span
        ref={valRef}
        className="font-['DM_Serif_Display',serif] text-xl leading-none tracking-[-0.02em]"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Feature row ──────────────────────────────────────────────────────────
function FeatureRow({ feat, index }) {
  const rowRef   = useRef(null);
  const glowRef  = useRef(null);

  useEffect(() => {
    gsap.fromTo(rowRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: index * 0.07 }
    );
  }, [feat, index]);

  const handleEnter = () => {
    gsap.to(rowRef.current, { x: 6, borderColor: 'rgba(0,158,221,0.3)', backgroundColor: 'rgba(0,158,221,0.04)', duration: 0.25, ease: 'power2.out' });
    gsap.to(glowRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(rowRef.current, { x: 0, borderColor: 'rgba(226,232,240,0.7)', backgroundColor: '#f8fafc', duration: 0.3, ease: 'power2.inOut' });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.3, ease: 'power2.inOut' });
  };

  return (
    <div
      ref={rowRef}
      className="relative flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-200/70 bg-[#f8fafc] overflow-hidden cursor-default"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Hover glow */}
      <div
        ref={glowRef}
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none opacity-0"
        style={{ background: 'linear-gradient(270deg, rgba(0,158,221,0.06), transparent)' }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
        style={{ background: 'linear-gradient(135deg, rgba(0,158,221,0.1), rgba(2,119,189,0.06))' }}
      >
        {feat.icon}
      </div>

      <span className="font-['Syne',sans-serif] text-slate-700 text-sm font-medium flex-1">{feat.text}</span>

      {/* Check */}
      <div className="w-5 h-5 rounded-md border border-[#009edd]/30 bg-[#009edd]/8 flex items-center justify-center shrink-0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#009edd" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────
function RoleBasedSection() {
  const [activeRole, setActiveRole] = useState('individual');
  const sectionRef   = useRef(null);
  const eyebrowRef   = useRef(null);
  const headlineRef  = useRef(null);
  const paraRef      = useRef(null);
  const dividerRef   = useRef(null);
  const toggleRef    = useRef(null);
  const featuresRef  = useRef(null);
  const dashRef      = useRef(null);
  // Pill that slides under the active tab
  const pillRef      = useRef(null);

  const role = ROLES.find(r => r.key === activeRole);
  const features = ROLE_FEATURES[activeRole] || [];

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
      .fromTo(paraRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(toggleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo([featuresRef.current, dashRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        '-=0.3'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Role switch animation ────────────────────────────────────────────────
  const switchRole = (key) => {
    if (key === activeRole) return;

    // Slide pill to new position
    const idx = ROLES.findIndex(r => r.key === key);
    gsap.to(pillRef.current, {
      x: idx * pillRef.current.parentElement.offsetWidth / 2,
      duration: 0.4,
      ease: 'power3.inOut',
    });

    // Fade out left panel + dashboard
    const tl = gsap.timeline();
    tl.to([featuresRef.current, dashRef.current],
      { opacity: 0, y: 10, duration: 0.2, ease: 'power2.in', stagger: 0.05 }
    )
    .call(() => setActiveRole(key))
    .fromTo([featuresRef.current, dashRef.current],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.06 },
      '+=0.05'
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-white"
    >
      {/* Subtle radial tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 75% 55%, rgba(0,158,221,0.03) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full sm:max-w-[85vw] mx-auto px-4 sm:px-8 lg:px-16">

        {/* ── Heading ── */}
        <div className="mb-14">

          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 mb-6 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#009edd]" />
            <span>Role-Based System</span>
            <span className="w-6 h-px bg-slate-300" />
            <span className="text-[#009edd]">Adapts to you</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              ref={headlineRef}
              className="font-['DM_Serif_Display',serif] text-slate-900 leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
            >
              {['Built', 'for'].map((w, i) => (
                <span key={i} className="hword inline-block mr-[0.2em]">{w}</span>
              ))}
              <br />
              <span className="hword inline-block mr-[0.2em]">every</span>
              <span className="hword inline-block italic text-[#009edd]">team size.</span>
            </h2>
            <p
              ref={paraRef}
              className="font-['Syne',sans-serif] text-slate-500 text-base leading-relaxed max-w-xs sm:text-right shrink-0"
            >
              Whether solo or leading 500 people, Earth Office adapts to you.
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

        {/* ── Role toggle ── */}
        <div ref={toggleRef} className="flex justify-center mb-14">
          <div
            className="relative flex p-1.5 rounded-lg border border-slate-200/80 bg-[#f8fafc]"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            {/* Sliding pill */}
            <div
              ref={pillRef}
              className="absolute top-1.5 left-1.5 rounded-xl bg-[#009edd] pointer-events-none"
              style={{
                width: 'calc(50% - 6px)',
                height: 'calc(100% - 12px)',
                boxShadow: '0 4px 14px rgba(0,158,221,0.35)',
                transition: 'none', // GSAP handles this
              }}
            />
            {ROLES.map((r) => (
              <button
                key={r.key}
                onClick={() => switchRole(r.key)}
                className="relative z-10 px-10 py-3 rounded-md! text-sm font-bold font-['Syne',sans-serif] transition-colors duration-300 focus:outline-none"
                style={{ color: activeRole === r.key ? '#ffffff' : '#64748b' }}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content grid ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Features list */}
          <div ref={featuresRef} className="space-y-2.5">
            {/* Section label */}
            <div className="flex items-center gap-2 mb-5">
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#8b949e] uppercase tracking-[0.1em]">
                Included features
              </span>
              <div className="flex-1 h-px bg-slate-100" />
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#009edd]">
                {features.length} features
              </span>
            </div>
            {features.map((feat, i) => (
              <FeatureRow key={`${activeRole}-${i}`} feat={feat} index={i} />
            ))}
          </div>

          {/* Dashboard card */}
          <div
            ref={dashRef}
            className="bg-white rounded-xl border border-slate-200/70 overflow-hidden"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,158,221,0.1)' }}
          >
            {/* Card header — dark */}
            <div
              className="px-8 py-6"
              style={{ background: '#0d1117', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: 'rgba(0,158,221,0.12)' }}
                >
                  {role.icon}
                </div>
                <div>
                  <h3 className="font-['Syne',sans-serif] font-bold text-[#e6edf3] text-lg">
                    {role.key === 'individual' ? 'Individual Plan' : 'Organization Plan'}
                  </h3>
                  <p className="font-['DM_Mono',monospace] text-[11px] text-[#8b949e] mt-0.5">{role.sub}</p>
                </div>
                {/* Live indicator */}
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="eyebrow-dot w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span className="font-['DM_Mono',monospace] text-[9px] text-[#8b949e]">Live</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="font-['DM_Mono',monospace] text-[10px] text-[#8b949e] uppercase tracking-[0.1em]">
                  Dashboard
                </span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {role.stats.map((s, i) => (
                <StatRow key={`${activeRole}-${s.label}`} label={s.label} value={s.value} color={s.color} delay={i * 0.08} />
              ))}

              {/* Mini sparkline — decorative */}
              <div className="mt-5 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['DM_Mono',monospace] text-[10px] text-[#8b949e] uppercase tracking-[0.08em]">Activity · 7d</span>
                  <span className="font-['DM_Mono',monospace] text-[10px] text-[#10b981]">↑ 14.2%</span>
                </div>
                {/* Bar chart sparkline */}
                <div className="flex items-end gap-1 h-10">
                  {[40, 65, 45, 80, 55, 90, 72].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 6
                          ? '#009edd'
                          : `rgba(0,158,221,${0.15 + i * 0.04})`,
                        transition: `height 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <button
                className="btn-primary w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-lg border-0 cursor-pointer bg-[#009edd] text-white font-['Syne',sans-serif] text-[0.9rem] font-bold tracking-[0.02em] relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,158,221,0.5)] active:translate-y-0"
              >
                Get Started as {role.label}
                <svg className="btn-primary-arrow transition-transform duration-200" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoleBasedSection;