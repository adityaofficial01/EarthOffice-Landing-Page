import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRICING_PLANS } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

// ─── Single pricing card ──────────────────────────────────────────────────
function PricingCard({ plan, index, cardRef }) {
  const ruleRef   = useRef(null);
  const glowRef   = useRef(null);
  const priceRef  = useRef(null);
  const isPopular = plan.popular;

  // Entrance: price counter tick-up
  useEffect(() => {
    if (!priceRef.current) return;
    const raw = parseFloat(String(plan.price).replace(/[^0-9.]/g, ''));
    if (!raw) return; // "Free" — skip

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: priceRef.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: raw,
          duration: 1.1,
          ease: 'power3.out',
          onUpdate: () => {
            if (priceRef.current) {
              priceRef.current.textContent = '$' + Math.round(obj.val);
            }
          },
        });
      },
    });
    return () => st.kill();
  }, [plan.price]);

  const handleEnter = (e) => {
    if (isPopular) return;
    gsap.to(e.currentTarget, { y: -8, duration: 0.35, ease: 'power2.out' });
    gsap.to(ruleRef.current, { scaleX: 1, duration: 0.5, ease: 'power3.out' });
    gsap.to(glowRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    e.currentTarget.style.borderColor = 'rgba(0,158,221,0.3)';
    e.currentTarget.style.boxShadow   = '0 12px 48px rgba(0,158,221,0.12), 0 2px 8px rgba(0,0,0,0.04)';
  };
  const handleLeave = (e) => {
    if (isPopular) return;
    gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: 'power2.inOut' });
    gsap.to(ruleRef.current, { scaleX: 0, duration: 0.35, ease: 'power2.inOut' });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });
    e.currentTarget.style.borderColor = 'rgba(226,232,240,0.7)';
    e.currentTarget.style.boxShadow   = '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)';
  };

  if (isPopular) {
    /* ── Popular card — dark hero style ── */
    return (
      <div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: '#0d1117',
          border: '1px solid rgba(0,158,221,0.25)',
          boxShadow: '0 0 0 1px rgba(0,158,221,0.1), 0 32px 80px rgba(0,0,0,0.22), 0 0 60px rgba(0,158,221,0.08)',
          transform: 'translateY(-12px)',
        }}
      >
        {/* Top cyan rule */}
        <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #009edd 30%, #009edd 70%, transparent)' }} />

        {/* Most popular badge */}
        <div className="absolute top-5 right-5">
          <span
            className="font-['DM_Mono',monospace] text-[9px] font-bold px-3 py-1.5 rounded-full tracking-[0.1em] uppercase text-[#0d1117]"
            style={{ background: '#009edd', boxShadow: '0 0 12px rgba(0,158,221,0.5)' }}
          >
            Most Popular
          </span>
        </div>

        <div className="p-9 flex flex-col flex-1">
          {/* Index */}
          <span className="font-['DM_Mono',monospace] text-[11px] text-[#8b949e] tracking-[0.1em] mb-6">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Name + desc */}
          <h3 className="font-['Syne',sans-serif] font-extrabold text-[#e6edf3] text-2xl mb-1.5 tracking-[-0.01em]">{plan.name}</h3>
          <p className="font-['DM_Mono',monospace] text-[11px] text-[#8b949e] mb-8 tracking-[0.04em]">{plan.desc}</p>

          {/* Price */}
          <div className="flex items-end gap-1.5 mb-8 pb-8 border-b border-white/[0.07]">
            <span
              ref={priceRef}
              className="font-['DM_Serif_Display',serif] leading-none tracking-[-0.04em] text-[#e6edf3]"
              style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
            >
              {plan.price}
            </span>
            <span className="font-['DM_Mono',monospace] text-[12px] text-[#8b949e] mb-2">{plan.period}</span>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-10 flex-1">
            {plan.features.map((feat, fi) => (
              <li key={fi} className="flex items-start gap-3">
                <div className="mt-0.5 w-4 h-4 rounded-md border border-[#009edd]/40 bg-[#009edd]/10 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#009edd" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="font-['Syne',sans-serif] text-[13px] text-[#b1bac4] leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className="btn-primary w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl border-0 cursor-pointer bg-[#009edd] text-white font-['Syne',sans-serif] text-[0.9rem] font-bold tracking-[0.02em] relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,158,221,0.6)] active:translate-y-0"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {plan.cta}
            <svg className="btn-primary-arrow transition-transform duration-200" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  /* ── Standard card — white ── */
  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-2xl border border-slate-200/70 overflow-hidden flex flex-col cursor-default"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Animated top rule */}
      <div
        ref={ruleRef}
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{
          background: 'linear-gradient(90deg, #009edd, rgba(0,158,221,0.2))',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
      {/* Hover glow */}
      <div
        ref={glowRef}
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,158,221,0.1) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      <div className="p-8 flex flex-col flex-1 relative z-10">
        {/* Index */}
        <span className="font-['DM_Mono',monospace] text-[11px] text-slate-300 tracking-[0.1em] mb-6">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Name + desc */}
        <h3 className="font-['Syne',sans-serif] font-extrabold text-slate-900 text-xl mb-1.5 tracking-[-0.01em]">{plan.name}</h3>
        <p className="font-['DM_Mono',monospace] text-[11px] text-slate-400 mb-8 tracking-[0.04em]">{plan.desc}</p>

        {/* Price */}
        <div className="flex items-end gap-1.5 mb-8 pb-8 border-t border-slate-100 pt-8">
          <span
            ref={priceRef}
            className="font-['DM_Serif_Display',serif] text-slate-900 leading-none tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
          >
            {plan.price}
          </span>
          <span className="font-['DM_Mono',monospace] text-[11px] text-slate-400 mb-1.5">{plan.period}</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-9 flex-1">
          {plan.features.map((feat, fi) => (
            <li key={fi} className="flex items-start gap-3">
              <div className="mt-0.5 w-4 h-4 rounded-md border border-[#009edd]/30 bg-[#009edd]/8 flex items-center justify-center shrink-0">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#009edd" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="font-['Syne',sans-serif] text-[13px] text-slate-600 leading-relaxed">{feat}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="btn-primary w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-xl border-0 cursor-pointer bg-[#009edd] text-white font-['Syne',sans-serif] text-[0.875rem] font-bold tracking-[0.02em] relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_0_24px_rgba(0,158,221,0.45)] active:translate-y-0"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {plan.cta}
          <svg className="btn-primary-arrow transition-transform duration-200" width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────
function PricingSection() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const headlineRef = useRef(null);
  const paraRef     = useRef(null);
  const dividerRef  = useRef(null);
  const cardsRef    = useRef([]);
  const footerRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading timeline ────────────────────────────────────────────────
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
      );

      // ── Cards: staggered rise with slight scale ─────────────────────────
      // Popular card (middle) arrives second — offset for spotlight effect
      const cards = cardsRef.current;
      const order = [cards[0], cards[2], cards[1]]; // side cards first, popular last
      gsap.fromTo(order,
        { y: 64, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: cards[0], start: 'top 88%' },
          onComplete: () => {
            // Subtle float on popular card
            gsap.to(cards[1], {
              y: '-=4',
              duration: 2.5,
              ease: 'power1.inOut',
              yoyo: true,
              repeat: -1,
            });
          },
        }
      );

      // ── Footer note ─────────────────────────────────────────────────────
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 92%' },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-white"
    >
      {/* Subtle radial wash */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-72 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,158,221,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Very faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 30%, black 20%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full sm:max-w-[1280px] mx-auto px-4 sm:px-16">

        {/* ── Heading ── */}
        <div className="mb-16">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 mb-6 font-['DM_Mono',monospace] text-[11px] tracking-[0.12em] uppercase text-[#8b949e]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#009edd]" />
            <span>Simple Pricing</span>
            <span className="w-6 h-px bg-slate-300" />
            <span className="text-[#009edd]">No hidden fees</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              ref={headlineRef}
              className="font-['DM_Serif_Display',serif] text-slate-900 leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
            >
              <span className="hword inline-block mr-[0.2em]">Plans</span>
              <span className="hword inline-block mr-[0.2em]">that</span>
              <span className="hword inline-block mr-[0.2em]">grow</span>
              <br />
              <span className="hword inline-block mr-[0.2em]">with</span>
              <span className="hword inline-block italic text-[#009edd]">you.</span>
            </h2>
            <p
              ref={paraRef}
              className="font-['Syne',sans-serif] text-slate-500 text-base leading-relaxed max-w-xs sm:text-right shrink-0"
            >
              No hidden fees. Cancel anytime. Start free, scale when ready.
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

        {/* ── Cards grid ── */}
        {/* Popular card is intentionally offset via its own translateY(-12px) */}
        <div className="grid lg:grid-cols-3 gap-6 items-end mb-12">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={i}
              cardRef={el => (cardsRef.current[i] = el)}
            />
          ))}
        </div>

        {/* ── Footer ── */}
        <div ref={footerRef} className="flex items-center justify-center gap-3">
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, transparent, #e2e8f0)' }} />
          <p className="font-['Syne',sans-serif] text-slate-400 text-sm">
            Need custom pricing?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#009edd] font-bold hover:underline focus:outline-none underline-offset-2"
            >
              Talk to sales
            </button>
          </p>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, #e2e8f0, transparent)' }} />
        </div>
      </div>
    </section>
  );
}

export default PricingSection;