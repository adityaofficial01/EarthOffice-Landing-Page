import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEMPLATES = [
  {
    id: 1,
    tag: 'Onboarding',
    subject: 'Welcome to EarthOffice! 👋',
    preview: "Your account is ready. Here's how to get started in under 5 minutes.",
    from: 'team@earthoffice.io',
    time: '9:41 AM',
    accent: '#009edd',
    dot: '#009edd',
  },
  {
    id: 2,
    tag: 'Transactional',
    subject: 'Your order has shipped 📦',
    preview: 'Track your package and estimated delivery time below.',
    from: 'shipping@earthoffice.io',
    time: '2:15 PM',
    accent: '#38bdf8',
    dot: '#38bdf8',
  },
  {
    id: 3,
    tag: 'Promotional',
    subject: 'Exclusive offer — 40% off 🔥',
    preview: 'Limited time upgrade deal, just for you. Expires in 48 hours.',
    from: 'offers@earthoffice.io',
    time: 'Yesterday',
    accent: '#10b981',
    dot: '#10b981',
  },
  {
    id: 4,
    tag: 'Promotional',
    subject: 'Exclusive offer — 40% off 🔥',
    preview: 'Limited time upgrade deal, just for you. Expires in 48 hours.',
    from: 'offers@earthoffice.io',
    time: 'Yesterday',
    accent: '#009edd',
    dot: '#009edd',
  },
  {
    id: 5,
    tag: 'Promotional',
    subject: 'Exclusive offer — 40% off 🔥',
    preview: 'Limited time upgrade deal, just for you. Expires in 48 hours.',
    from: 'offers@earthoffice.io',
    time: 'Yesterday',
    accent: '#38bdf8',
    dot: '#10b981',
  },
];

const MINI_FEATURES = [
  { icon: '🎨', title: 'Rich editor for designing',    desc: 'Blocks, fonts, brand colours' },
  { icon: '📱', title: 'Mobile-First',           desc: 'Perfect on every screen' },
  { icon: '⚡', title: 'Smart Personalisation',  desc: 'CRM data auto-filled' },
  { icon: '📈', title: 'Built-in Analytics',     desc: 'Opens, clicks & conversions' },
];

// ── Stacked floating email card ────────────────────────────────────────────
function EmailCard({ t, index, cardRef }) {
  const topOffset = index * 88;
  const zIndex    = TEMPLATES.length - index;

  return (
    <div
      ref={cardRef}
      className="absolute w-full bg-white rounded-lg border border-slate-200/80 cursor-default overflow-hidden"
      style={{
        top: topOffset,
        zIndex,
        boxShadow: `0 ${8 + index * 8}px ${24 + index * 16}px rgba(0,0,0,${0.07 + index * 0.03})`,
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), z-index 0s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 24px 64px rgba(0,158,221,0.18), 0 0 0 1.5px ${t.accent}55`;
        e.currentTarget.style.zIndex = 20;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = `0 ${8 + index * 8}px ${24 + index * 16}px rgba(0,0,0,${0.07 + index * 0.03})`;
        e.currentTarget.style.zIndex = zIndex;
      }}
    >
      {/* Accent top stripe */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.accent}44, transparent)` }}
      />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-['Syne',sans-serif] text-[11px] font-black text-white"
            style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}bb)` }}
          >
            EO
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-['Syne',sans-serif] text-slate-800 text-[13px] font-bold truncate">{t.subject}</p>
            <p className="font-['DM_Mono',monospace] text-[10px] text-slate-400">{t.from}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="font-['DM_Mono',monospace] text-[10px] text-slate-400">{t.time}</span>
            <div className="w-2 h-2 rounded-full" style={{ background: t.accent }} />
          </div>
        </div>

        {/* Preview text */}
        <p className="font-['Syne',sans-serif] text-slate-500 text-sm leading-relaxed mb-5">{t.preview}</p>

        {/* Skeleton body lines */}
        <div className="space-y-2 mb-5">
          <div className="h-2 rounded-full bg-slate-100 w-full" />
          <div className="h-2 rounded-full bg-slate-100 w-5/6" />
          <div className="h-2 rounded-full bg-slate-100/70 w-4/6" />
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div
            className="h-8 w-28 rounded-lg flex items-center justify-center font-['Syne',sans-serif] text-[11px] font-bold text-white"
            style={{ background: t.accent }}
          >
            View email →
          </div>
          <span
            className="font-['DM_Mono',monospace] text-[9px] font-medium px-2.5 py-1 rounded-full tracking-[0.06em] uppercase"
            style={{ background: `${t.accent}12`, color: t.accent }}
          >
            {t.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
function EmailBuilderSection() {
  const sectionRef  = useRef(null);
  const rightRef    = useRef(null);
  const mockRef     = useRef(null);
  const cardsRef    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(rightRef.current,
        { x: 56, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%' } }
      );
      gsap.fromTo(mockRef.current,
        { x: -56, opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: mockRef.current, start: 'top 82%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-white"
    >
      {/* Very faint warm tint — differentiates from #f8fafc sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(0,158,221,0.03) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full sm:max-w-[85vw] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* ════════ LEFT — stacked floating email cards ════════ */}
          <div
            ref={mockRef}
            className="relative order-2 lg:order-1"
            style={{ minHeight: `${TEMPLATES.length * 88 + 220}px` }}
          >
            <div className="relative w-full   mx-auto">
              {TEMPLATES.map((t, i) => (
                <EmailCard
                  key={t.id}
                  t={t}
                  index={i}
                  cardRef={el => (cardsRef.current[i] = el)}
                />
              ))}
            </div>
          </div>

          {/* ════════ RIGHT — copy ════════ */}
          <div ref={rightRef} className="order-1 lg:order-2 pt-2">

            {/* Eyebrow — DM Mono */}
            <div className="inline-flex items-center gap-2.5 mb-7 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009edd]" />
              <span>Email Builder</span>
              <span className="w-6 h-px bg-slate-300" />
              <span className="text-[#009edd]">Visual editor</span>
            </div>

            {/* Headline — DM Serif Display */}
            <h2
              className="font-['DM_Serif_Display',serif] text-slate-900 leading-[1.08] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
            >
              Beautiful emails,{' '}
              <span className="italic text-[#009edd]">in minutes.</span>
            </h2>

            {/* Body */}
            <p className="font-['Syne',sans-serif] text-slate-500 text-[1.0625rem] leading-[1.75] max-w-[440px] mb-9">
              Choose from stunning templates, customise every pixel,
              and send emails that convert — no HTML needed.
            </p>

            {/* Ruled divider */}
            <div className="mb-8 h-px bg-gradient-to-r from-[#009edd]/20 via-slate-200 to-transparent" />

            {/* Mini feature grid */}
            <div className="grid grid-cols-2 gap-3.5 mb-10">
              {MINI_FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group p-4 rounded-2xl border border-slate-200/70 bg-[#f8fafc] transition-all duration-200 hover:border-[#009edd]/30 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,158,221,0.08)]"
                >
                  {/* Top-edge rule — identical to FeatureCard */}
                  <div className="feature-card-rule rounded-t-2xl" />
                  <span className="text-xl block mb-2">{f.icon}</span>
                  <p className="font-['Syne',sans-serif] text-slate-800 font-bold text-sm mb-1">{f.title}</p>
                  <p className="font-['DM_Mono',monospace] text-[11px] text-slate-400 tracking-[0.04em]">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              <button className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg border-0 cursor-pointer bg-[#009edd] text-white font-['Syne',sans-serif] text-[0.9rem] font-bold tracking-[0.02em] relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,158,221,0.5)] active:translate-y-0">
                Explore Templates
                <svg className="btn-primary-arrow transition-transform duration-200" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="font-['DM_Mono',monospace] text-[11px] text-slate-400 tracking-[0.06em]">No HTML required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailBuilderSection;