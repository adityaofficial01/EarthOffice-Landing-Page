import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURES } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

// ─── Mini bar chart visual ────────────────────────────────────────────────────
function MiniBarChart() {
  const bars = [
    { height: 24, dim: true },
    { height: 40, dim: false },
    { height: 18, dim: true },
    { height: 32, dim: false },
    { height: 28, dim: true },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl flex-shrink-0 self-center"
      style={{
        width: 120,
        height: 84,
        background: 'rgba(0,158,221,0.06)',
        border: '1px solid rgba(0,158,221,0.12)',
      }}
    >
      <div className="flex items-end gap-[5px]">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="w-[13px] rounded-t-[3px]"
            style={{
              height: bar.height,
              background: bar.dim ? 'rgba(0,158,221,0.25)' : '#009edd',
            }}
          />
        ))}
      </div>
      <span
        className="font-['DM_Mono',monospace] tracking-[0.06em]"
        style={{ fontSize: 9, color: '#009edd' }}
      >
        2,400+ contacts
      </span>
    </div>
  );
}

// ─── Role chips visual ────────────────────────────────────────────────────────
function RoleChips() {
  const roles = [
    { label: 'Admin · Full access', color: '#22c55e' },
    { label: 'Manager · Edit',      color: '#009edd' },
    { label: 'Viewer · Read-only',  color: '#f59e0b' },
  ];

  return (
    <div className="flex flex-col gap-2 self-center flex-shrink-0">
      {roles.map((role, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-[10px] px-3 py-2 text-slate-700 whitespace-nowrap font-['Syne',sans-serif]"
          style={{
            fontSize: 11,
            background: 'rgba(0,158,221,0.06)',
            border: '1px solid rgba(0,158,221,0.12)',
          }}
        >
          <span
            className="w-[7px] h-[7px] rounded-full flex-shrink-0"
            style={{ background: role.color }}
          />
          {role.label}
        </div>
      ))}
    </div>
  );
}

// ─── Card tag / eyebrow ───────────────────────────────────────────────────────
function CardTag({ label }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 mb-2.5 font-['DM_Mono',monospace] text-[10px] tracking-[0.1em] uppercase"
      style={{ color: '#009edd' }}
    >
      <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: '#009edd' }} />
      {label}
    </div>
  );
}

// ─── Learn more link ──────────────────────────────────────────────────────────
function LearnMore({ visible }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 mt-4 text-[0.8rem] font-bold font-['Syne',sans-serif] transition-[opacity,transform] duration-[250ms]"
      style={{
        color: '#009edd',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(4px)',
      }}
    >
      Learn more
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
      </svg>
    </div>
  );
}

// ─── Base card shell ──────────────────────────────────────────────────────────
function CardShell({ children, cardRef, onHover, hovered }) {
  return (
    <div
      ref={cardRef}
      className="bg-white rounded-[20px] p-6 relative overflow-hidden cursor-default transition-[border-color,transform,box-shadow] duration-[250ms] h-full"
      style={{
        border: `1px solid ${hovered ? 'rgba(0,158,221,0.35)' : 'rgba(226,232,240,0.8)'}`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 36px rgba(0,158,221,0.13), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Top-edge cyan rule on hover */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] transition-opacity duration-[250ms]"
        style={{
          background: 'linear-gradient(90deg, transparent, #009edd, transparent)',
          opacity: hovered ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}

// ─── Card index number ────────────────────────────────────────────────────────
function CardIndex({ n }) {
  return (
    <span className="absolute top-[18px] right-5 font-['DM_Mono',monospace] text-[11px] font-medium text-slate-300 tracking-[0.1em]">
      {String(n).padStart(2, '0')}
    </span>
  );
}

// ─── Card icon bubble ─────────────────────────────────────────────────────────
function CardIcon({ icon, hovered }) {
  return (
    <div
      className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center text-xl mb-4 flex-shrink-0 transition-transform duration-[250ms]"
      style={{
        background: 'linear-gradient(135deg, rgba(0,158,221,0.12), rgba(2,119,189,0.06))',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }}
    >
      {icon}
    </div>
  );
}

// ─── Shared card title + description ─────────────────────────────────────────
function CardBody({ title, description, maxWidth }) {
  return (
    <>
      <h3 className="font-['DM_Serif_Display',serif] text-slate-900 text-xl leading-[1.2] mb-2 mt-0">
        {title}
      </h3>
      <p
        className="font-['Syne',sans-serif] text-sm text-slate-500 leading-[1.65] m-0"
        style={{ maxWidth: maxWidth ?? 'none' }}
      >
        {description}
      </p>
    </>
  );
}

// ─── Card A: Contacts ─────────────────────────────────────────────────────────
function CardContacts({ cardRef }) {
  const [hovered, setHovered] = React.useState(false);
  const feat = FEATURES[0];

  return (
    <CardShell cardRef={cardRef} hovered={hovered} onHover={setHovered}>
      <CardIndex n={1} />
      <div className="flex flex-wrap sm:flex-nowrap gap-6 items-start">
        <div className="flex-1 min-w-0">
          <CardIcon icon={feat?.icon ?? '👥'} hovered={hovered} />
          <CardTag label="Contacts" />
          <CardBody
            title={feat?.title ?? 'Contacts Management'}
            description={feat?.description ?? 'Centralise all your clients, partners, and leads in one intelligent hub. Sync across devices, search instantly, and never lose a connection again.'}
            maxWidth="38ch"
          />
          <LearnMore visible={hovered} />
        </div>
        <MiniBarChart />
      </div>
    </CardShell>
  );
}

// ─── Card B: Deals ────────────────────────────────────────────────────────────
function CardDeals({ cardRef }) {
  const [hovered, setHovered] = React.useState(false);
  const feat = FEATURES[1];

  return (
    <CardShell cardRef={cardRef} hovered={hovered} onHover={setHovered}>
      <CardIndex n={2} />
      <CardIcon icon={feat?.icon ?? '🔥'} hovered={hovered} />
      <CardTag label="Pipeline" />
      <CardBody
        title={feat?.title ?? 'Deals Tracking'}
        description={feat?.description ?? 'Visualise your entire sales pipeline at a glance. Move deals through stages and close faster with AI-powered insights.'}
      />
      <LearnMore visible={hovered} />
    </CardShell>
  );
}

// ─── Card C: Leads ────────────────────────────────────────────────────────────
function CardLeads({ cardRef }) {
  const [hovered, setHovered] = React.useState(false);
  const feat = FEATURES[2];

  return (
    <CardShell cardRef={cardRef} hovered={hovered} onHover={setHovered}>
      <CardIndex n={3} />
      <CardIcon icon={feat?.icon ?? '🎯'} hovered={hovered} />
      <CardTag label="Leads" />
      <CardBody
        title={feat?.title ?? 'Leads Management'}
        description={feat?.description ?? 'Capture, qualify, and nurture leads automatically. Score prospects so your team always focuses on the highest-value opportunities.'}
      />
      <LearnMore visible={hovered} />
    </CardShell>
  );
}

// ─── Card D: Organization Users ───────────────────────────────────────────────
function CardOrgUsers({ cardRef }) {
  const [hovered, setHovered] = React.useState(false);
  const feat = FEATURES[3];

  return (
    <CardShell cardRef={cardRef} hovered={hovered} onHover={setHovered}>
      <CardIndex n={4} />
      <div className="flex flex-wrap sm:flex-nowrap gap-6 items-start">
        <div className="flex-1 min-w-0">
          <CardIcon icon={feat?.icon ?? '🏢'} hovered={hovered} />
          <CardTag label="Teams" />
          <CardBody
            title={feat?.title ?? 'Organization Users'}
            description={feat?.description ?? 'Manage roles, permissions, and teams with ease. From individual contributors to entire departments — everyone gets exactly the access they need.'}
            maxWidth="38ch"
          />
          <LearnMore visible={hovered} />
        </div>
        <RoleChips />
      </div>
    </CardShell>
  );
}

// ─── Bento grid ───────────────────────────────────────────────────────────────
//
//  Mobile  (default)  → 1 col, all cards stacked
//  Tablet  (sm)       → 2 col, A & D span full width
//  Desktop (lg)       → original 3-col bento
//
function BentoGrid({ cardsRef }) {
  return (
    <>
      {/* ── Mobile: single column ── */}
      <div className="flex flex-col gap-3 sm:hidden">
        <CardContacts cardRef={el => (cardsRef.current[0] = el)} />
        <CardDeals    cardRef={el => (cardsRef.current[1] = el)} />
        <CardLeads    cardRef={el => (cardsRef.current[2] = el)} />
        <CardOrgUsers cardRef={el => (cardsRef.current[3] = el)} />
      </div>

      {/* ── Tablet: 2-col grid ── */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-3.5">
        <div className="col-span-2">
          <CardContacts cardRef={el => (cardsRef.current[0] = el)} />
        </div>
        <CardDeals cardRef={el => (cardsRef.current[1] = el)} />
        <CardLeads cardRef={el => (cardsRef.current[2] = el)} />
        <div className="col-span-2">
          <CardOrgUsers cardRef={el => (cardsRef.current[3] = el)} />
        </div>
      </div>

      {/* ── Desktop: 3-col bento ── */}
      <div className="hidden lg:grid grid-cols-3 gap-3.5">
        <div className="col-span-2">
          <CardContacts cardRef={el => (cardsRef.current[0] = el)} />
        </div>
        <div className="col-span-1">
          <CardDeals cardRef={el => (cardsRef.current[1] = el)} />
        </div>
        <div className="col-span-1">
          <CardLeads cardRef={el => (cardsRef.current[2] = el)} />
        </div>
        <div className="col-span-2">
          <CardOrgUsers cardRef={el => (cardsRef.current[3] = el)} />
        </div>
      </div>
    </>
  );
}

// ─── Stats strip ──────────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { value: '10×',    label: 'Faster Pipeline' },
    { value: '99.9%',  label: 'Uptime SLA' },
    { value: '2,400+', label: 'Teams Trust Us' },
    { value: '< 2h',   label: 'To Onboard' },
  ];

  return (
    <div
      className="mt-12 lg:mt-20 rounded-3xl overflow-hidden"
      style={{ background: '#0d1117', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
    >
      {/* Top cyan accent line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #009edd 40%, transparent)' }}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center py-7 px-4 lg:py-10 lg:px-6 hover:bg-white/[0.03] transition-colors duration-200"
            style={{
              borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
          >
            <span
              className="font-['DM_Serif_Display',serif] text-[2rem] lg:text-[2.5rem] leading-none tracking-[-0.03em] mb-2"
              style={{ color: '#009edd' }}
            >
              {stat.value}
            </span>
            <span
              className="font-['DM_Mono',monospace] text-[10px] tracking-[0.08em] uppercase text-center"
              style={{ color: '#8b949e' }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function FeaturesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 88%' },
        }
      );

      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length) {
        gsap.fromTo(
          validCards,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.75, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: validCards[0], start: 'top 88%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-16 lg:py-32 overflow-hidden bg-slate-50"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full lg:max-w-[85vw] mx-auto px-4 sm:px-8 lg:px-16">

        {/* ── Section heading ── */}
        <div ref={headingRef} className="mb-10 lg:mb-16">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-6 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#009edd' }} />
            <span>Core CRM</span>
            <span className="w-6 h-px bg-slate-300" />
            <span style={{ color: '#009edd' }}>All-in-one</span>
          </div>

          {/* Headline + subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
            <h2 className="font-['DM_Serif_Display',serif] text-slate-900 leading-[1.1] tracking-[-0.02em] m-0 text-[2rem] sm:text-[2.75rem] lg:text-[clamp(2.25rem,4vw,3.75rem)]">
              Everything you need,{' '}
              <span className="italic" style={{ color: '#009edd' }}>in one place.</span>
            </h2>
            <p className="font-['Syne',sans-serif] text-slate-500 text-[0.9rem] leading-[1.7] m-0 sm:max-w-[22ch] sm:text-right sm:shrink-0">
              Powerful tools to manage relationships, track revenue, and grow your business.
            </p>
          </div>

          {/* Divider */}
          <div
            className="mt-7 h-px"
            style={{ background: 'linear-gradient(90deg, rgba(0,158,221,0.3), #e2e8f0, transparent)' }}
          />
        </div>

        {/* ── Bento grid ── */}
        <BentoGrid cardsRef={cardsRef} />

        {/* ── Stats strip ── */}
        <StatsStrip />
      </div>
    </section>
  );
}

export default FeaturesSection;