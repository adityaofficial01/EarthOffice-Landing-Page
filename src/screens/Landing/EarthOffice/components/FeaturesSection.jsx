import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURES } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

// ─── Mini bar chart visual (used in hero card) ───────────────────────────────
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
      style={{
        width: 130,
        height: 90,
        borderRadius: 12,
        background: 'rgba(0,158,221,0.06)',
        border: '1px solid rgba(0,158,221,0.12)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        padding: 12,
        flexShrink: 0,
        alignSelf: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
        {bars.map((bar, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: bar.height,
              borderRadius: '3px 3px 0 0',
              background: bar.dim ? 'rgba(0,158,221,0.25)' : '#009edd',
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          color: '#009edd',
          letterSpacing: '0.06em',
        }}
      >
        2,400+ contacts
      </span>
    </div>
  );
}

// ─── Role chips visual (used in wide card-d) ─────────────────────────────────
function RoleChips() {
  const roles = [
    { label: 'Admin · Full access', color: '#22c55e' },
    { label: 'Manager · Edit',      color: '#009edd' },
    { label: 'Viewer · Read-only',  color: '#f59e0b' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignSelf: 'center',
        flexShrink: 0,
      }}
    >
      {roles.map((role, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(0,158,221,0.06)',
            border: '1px solid rgba(0,158,221,0.12)',
            borderRadius: 10,
            padding: '8px 12px',
            fontSize: 11,
            color: '#334155',
            whiteSpace: 'nowrap',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: role.color,
              flexShrink: 0,
            }}
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
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#009edd',
        marginBottom: 10,
      }}
    >
      <span
        style={{ width: 5, height: 5, borderRadius: '50%', background: '#009edd' }}
      />
      {label}
    </div>
  );
}

// ─── Learn more arrow link ────────────────────────────────────────────────────
function LearnMore({ visible }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        marginTop: 16,
        fontSize: '0.8rem',
        fontWeight: 700,
        color: '#009edd',
        fontFamily: "'Syne', sans-serif",
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 0.25s, transform 0.25s',
      }}
    >
      Learn more
      <svg
        style={{ width: 14, height: 14 }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
      </svg>
    </div>
  );
}

// ─── Base card shell ──────────────────────────────────────────────────────────
function CardShell({ children, cardRef, style = {}, onHover, hovered }) {
  return (
    <div
      ref={cardRef}
      style={{
        background: '#fff',
        border: `1px solid ${hovered ? 'rgba(0,158,221,0.35)' : 'rgba(226,232,240,0.8)'}`,
        borderRadius: 20,
        padding: 28,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 36px rgba(0,158,221,0.13), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        ...style,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Top-edge cyan rule on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 2,
          background: 'linear-gradient(90deg, transparent, #009edd, transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s',
        }}
      />
      {children}
    </div>
  );
}

// ─── Card index number ────────────────────────────────────────────────────────
function CardIndex({ n }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: 20,
        right: 22,
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        color: '#cbd5e1',
        letterSpacing: '0.1em',
      }}
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}

// ─── Card icon bubble ─────────────────────────────────────────────────────────
function CardIcon({ icon, hovered, large = false }) {
  return (
    <div
      style={{
        width: large ? 52 : 46,
        height: large ? 52 : 46,
        borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(0,158,221,0.12), rgba(2,119,189,0.06))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: large ? 24 : 20,
        marginBottom: 18,
        flexShrink: 0,
        transition: 'transform 0.25s',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }}
    >
      {icon}
    </div>
  );
}

// ─── Card A: Contacts Management (col-span-2, row 1) ─────────────────────────
function CardContacts({ cardRef }) {
  const [hovered, setHovered] = React.useState(false);
  const feat = FEATURES[0];

  return (
    <CardShell
      cardRef={cardRef}
      hovered={hovered}
      onHover={setHovered}
      style={{ gridColumn: '1 / 3', gridRow: 1 }}
    >
      <CardIndex n={1} />
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <CardIcon icon={feat?.icon ?? '👥'} hovered={hovered} />
          <CardTag label="Contacts" />
          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.35rem',
              color: '#0f172a',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            {feat?.title ?? 'Contacts Management'}
          </h3>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.875rem',
              color: '#64748b',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '38ch',
            }}
          >
            {feat?.description ?? 'Centralise all your clients, partners, and leads in one intelligent hub. Sync across devices, search instantly, and never lose a connection again.'}
          </p>
          <LearnMore visible={hovered} />
        </div>
        <MiniBarChart />
      </div>
    </CardShell>
  );
}

// ─── Card B: Deals Tracking (col 3, row 1) ───────────────────────────────────
function CardDeals({ cardRef }) {
  const [hovered, setHovered] = React.useState(false);
  const feat = FEATURES[1];

  return (
    <CardShell
      cardRef={cardRef}
      hovered={hovered}
      onHover={setHovered}
      style={{ gridColumn: '3 / 4', gridRow: 1 }}
    >
      <CardIndex n={2} />
      <CardIcon icon={feat?.icon ?? '🔥'} hovered={hovered} />
      <CardTag label="Pipeline" />
      <h3
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.35rem',
          color: '#0f172a',
          margin: '0 0 8px',
          lineHeight: 1.2,
        }}
      >
        {feat?.title ?? 'Deals Tracking'}
      </h3>
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.875rem',
          color: '#64748b',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {feat?.description ?? 'Visualise your entire sales pipeline at a glance. Move deals through stages and close faster with AI-powered insights.'}
      </p>
      <LearnMore visible={hovered} />
    </CardShell>
  );
}

// ─── Card C: Leads Management (col 1, row 2) ─────────────────────────────────
function CardLeads({ cardRef }) {
  const [hovered, setHovered] = React.useState(false);
  const feat = FEATURES[2];

  return (
    <CardShell
      cardRef={cardRef}
      hovered={hovered}
      onHover={setHovered}
      style={{ gridColumn: '1 / 2', gridRow: 2 }}
    >
      <CardIndex n={3} />
      <CardIcon icon={feat?.icon ?? '🎯'} hovered={hovered} />
      <CardTag label="Leads" />
      <h3
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.35rem',
          color: '#0f172a',
          margin: '0 0 8px',
          lineHeight: 1.2,
        }}
      >
        {feat?.title ?? 'Leads Management'}
      </h3>
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.875rem',
          color: '#64748b',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {feat?.description ?? 'Capture, qualify, and nurture leads automatically. Score prospects so your team always focuses on the highest-value opportunities.'}
      </p>
      <LearnMore visible={hovered} />
    </CardShell>
  );
}

// ─── Card D: Organization Users (col 2–3, row 2) ─────────────────────────────
function CardOrgUsers({ cardRef }) {
  const [hovered, setHovered] = React.useState(false);
  const feat = FEATURES[3];

  return (
    <CardShell
      cardRef={cardRef}
      hovered={hovered}
      onHover={setHovered}
      style={{ gridColumn: '2 / 4', gridRow: 2 }}
    >
      <CardIndex n={4} />
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <CardIcon icon={feat?.icon ?? '🏢'} hovered={hovered} />
          <CardTag label="Teams" />
          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.35rem',
              color: '#0f172a',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            {feat?.title ?? 'Organization Users'}
          </h3>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.875rem',
              color: '#64748b',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '38ch',
            }}
          >
            {feat?.description ?? 'Manage roles, permissions, and teams with ease. From individual contributors to entire departments — everyone gets exactly the access they need.'}
          </p>
          <LearnMore visible={hovered} />
        </div>
        <RoleChips />
      </div>
    </CardShell>
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

      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 88%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: '#f8fafc' }}
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

      <div className="relative z-10 max-w-[85vw] mx-auto px-16">

        {/* ── Section heading ── */}
        <div ref={headingRef} className="mb-16">
          <div className="inline-flex items-center gap-2.5 mb-6 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#009edd]" />
            <span>Core CRM</span>
            <span className="w-6 h-px bg-slate-300" />
            <span className="text-[#009edd]">All-in-one</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              className="font-['DM_Serif_Display',serif] text-slate-900 leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
            >
              Everything you need,{' '}
              <span className="italic text-[#009edd]">in one place.</span>
            </h2>
            <p className="font-['Syne',sans-serif] text-slate-500 text-base leading-relaxed max-w-xs sm:text-right shrink-0">
              Powerful tools to manage relationships, track revenue, and grow your business.
            </p>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-[#009edd]/30 via-slate-200 to-transparent" />
        </div>

        {/* ── Bento feature grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 14,
          }}
        >
          <CardContacts cardRef={el => (cardsRef.current[0] = el)} />
          <CardDeals    cardRef={el => (cardsRef.current[1] = el)} />
          <CardLeads    cardRef={el => (cardsRef.current[2] = el)} />
          <CardOrgUsers cardRef={el => (cardsRef.current[3] = el)} />
        </div>

        {/* ── Stats strip ── */}
        <div
          className="mt-20 rounded-3xl overflow-hidden"
          style={{ background: '#0d1117', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
        >
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, #009edd 40%, transparent)' }}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: '10×',    label: 'Faster Pipeline' },
              { value: '99.9%',  label: 'Uptime SLA' },
              { value: '2,400+', label: 'Teams Trust Us' },
              { value: '< 2h',   label: 'To Onboard' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center py-10 px-6 border-r border-white/[0.07] last:border-r-0 hover:bg-white/[0.03] transition-colors duration-200"
              >
                <span
                  className="font-['DM_Serif_Display',serif] text-[2.5rem] leading-none text-[#009edd] tracking-[-0.03em] mb-2"
                >
                  {stat.value}
                </span>
                <span className="font-['DM_Mono',monospace] text-[11px] text-[#8b949e] tracking-[0.08em] uppercase text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;