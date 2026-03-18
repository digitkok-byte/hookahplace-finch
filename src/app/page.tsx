"use client";

import { useState, useEffect, useRef } from "react";
import ScrollHero from "@/components/ScrollHero";

const ACCENT = "#8B2020";
const MUTED = "#52525B";
const heading = "font-['Bebas_Neue',sans-serif]";

/* ── FadeIn with stagger support (taste-skill: staggered orchestration) ── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[#0A0A0A]">
      <ScrollHero />

      {/* Info sections — taste-skill: asymmetric split layout, divide-y instead of cards */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 py-24">
            <Contacts />
            <div className="hidden md:block" style={{ background: "#1C1C1C" }} />
            <Hours />
          </div>
        </FadeIn>

        <div className="h-px w-full" style={{ background: "#1C1C1C" }} />

        <FadeIn><Booking /></FadeIn>

        <div className="h-px w-full" style={{ background: "#1C1C1C" }} />

        <FadeIn><Footer /></FadeIn>
      </div>
    </main>
  );
}

/* ─── CONTACTS — taste-skill: divide-y grouping, no cards ─── */
function Contacts() {
  const items = [
    {
      label: "АДРЕС",
      value: "Москва, Кустанайская 10А",
      sub: "м. Шипиловская / Красногвардейская",
    },
    { label: "ТЕЛЕФОН", value: "+7 (995) 505-48-98" },
    { label: "TELEGRAM", value: "@hp_finch" },
  ];

  return (
    <div className="pr-0 md:pr-12 lg:pr-16">
      <p className="text-[11px] tracking-[0.2em] font-medium mb-8" style={{ color: ACCENT }}>
        01 — КОНТАКТЫ
      </p>

      <div className="divide-y" style={{ borderColor: "#1C1C1C" }}>
        {items.map((item, i) => (
          <FadeIn key={item.label} delay={i * 100}>
            <div className="py-5 first:pt-0">
              <p className="text-[10px] tracking-[0.15em] font-medium mb-2" style={{ color: MUTED }}>
                {item.label}
              </p>
              <p className="text-[15px] text-zinc-200 leading-relaxed">{item.value}</p>
              {item.sub && (
                <p className="text-[12px] mt-1" style={{ color: "#71717A" }}>{item.sub}</p>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ─── HOURS — taste-skill: separated into own column ─── */
function Hours() {
  const hours = [
    { day: "Пн — Чт", time: "13:00 — 02:00" },
    { day: "Пт — Сб", time: "13:00 — 04:00", accent: true },
    { day: "Воскресенье", time: "13:00 — 02:00" },
  ];

  return (
    <div className="pl-0 md:pl-12 lg:pl-16 mt-12 md:mt-0">
      <p className="text-[11px] tracking-[0.2em] font-medium mb-8" style={{ color: ACCENT }}>
        02 — ЧАСЫ РАБОТЫ
      </p>

      <div className="space-y-4">
        {hours.map((h, i) => (
          <FadeIn key={h.day} delay={i * 120}>
            <div className="flex justify-between items-baseline">
              <span className="text-[14px]" style={{ color: "#71717A" }}>{h.day}</span>
              <span
                className="text-[14px] tabular-nums"
                style={{
                  color: h.accent ? ACCENT : "#A1A1AA",
                  fontWeight: h.accent ? 600 : 400,
                }}
              >
                {h.time}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* taste-skill: tactile CTA */}
      <FadeIn delay={400}>
        <a
          href="tel:+79955054898"
          className="inline-flex items-center gap-2 mt-10 text-[12px] tracking-[0.15em] transition-all duration-300 hover:gap-3"
          style={{ color: ACCENT }}
        >
          <span>ПОЗВОНИТЬ</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </FadeIn>
    </div>
  );
}

/* ─── BOOKING — taste-skill: label above input, gap-2, tinted shadows ─── */
function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="booking" className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
        {/* Left — heading */}
        <div>
          <p className="text-[11px] tracking-[0.2em] font-medium mb-4" style={{ color: ACCENT }}>
            03 — БРОНИРОВАНИЕ
          </p>
          <h2 className={`${heading} text-[40px] md:text-[56px] tracking-tight leading-none text-zinc-100 mb-4`}>
            ЗАБРОНИРУЙТЕ СТОЛ
          </h2>
          <p className="text-[14px] leading-relaxed max-w-[45ch]" style={{ color: "#71717A" }}>
            Выберите удобную дату и время. Мы подготовим для вас лучшее место.
          </p>
        </div>

        {/* Right — form */}
        <div className="space-y-5">
          <Field label="ИМЯ" value={form.name} placeholder="Ваше имя" onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="ТЕЛЕФОН" value={form.phone} placeholder="+7 (___) ___-__-__" onChange={(v) => setForm({ ...form, phone: v })} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="ДАТА" value={form.date} placeholder="18.03" onChange={(v) => setForm({ ...form, date: v })} />
            <Field label="ВРЕМЯ" value={form.time} placeholder="20:00" onChange={(v) => setForm({ ...form, time: v })} />
          </div>
          <Field label="ГОСТЕЙ" value={form.guests} placeholder="2" onChange={(v) => setForm({ ...form, guests: v })} />

          {/* taste-skill: tactile feedback on :active */}
          <button
            onClick={() => setSubmitted(true)}
            className={`${heading} w-full mt-4 py-4 text-[14px] tracking-[0.2em] text-white transition-all duration-300 active:scale-[0.98] active:-translate-y-[1px]`}
            style={{
              background: submitted ? "#1C1C1C" : ACCENT,
              boxShadow: submitted ? "none" : "0 8px 24px -8px rgba(139,32,32,0.3)",
            }}
          >
            {submitted ? "ОТПРАВЛЕНО" : "ЗАБРОНИРОВАТЬ"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* taste-skill: label above input, structured gap-2 */
function Field({
  label, value, placeholder, onChange,
}: {
  label: string; value: string; placeholder: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] tracking-[0.15em] font-medium" style={{ color: MUTED }}>
        {label}
      </label>
      <input
        className="w-full h-12 px-4 bg-transparent text-[14px] text-zinc-200 placeholder:text-zinc-700 outline-none transition-all duration-300 focus:border-[#B40000]"
        style={{
          borderBottom: "1px solid #27272A",
        }}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ─── FOOTER — taste-skill: clean spacing, no card boxes ─── */
function Footer() {
  return (
    <footer className="py-20 flex flex-col md:flex-row md:justify-between md:items-end gap-10">
      {/* Left */}
      <div>
        <div className="w-8 h-px mb-6" style={{ background: ACCENT }} />
        <h3 className={`${heading} text-[32px] tracking-wider text-zinc-100`}>HOOKAHPLACE</h3>
        <p className={`${heading} text-[18px] tracking-[0.3em] mt-1`} style={{ color: ACCENT }}>FINCH</p>
        <p className="text-[13px] mt-4" style={{ color: "#52525B" }}>Москва, Кустанайская 10А</p>
      </div>

      {/* Right */}
      <div className="flex flex-col items-start md:items-end gap-4">
        <div className="flex gap-3">
          {[
            { label: "TG", href: "https://t.me/hp_finch" },
            { label: "TEL", href: "tel:+79955054898" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="w-10 h-10 flex items-center justify-center text-[10px] tracking-wider transition-all duration-300 active:scale-[0.96]"
              style={{
                border: "1px solid #27272A",
                color: "#71717A",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#27272A";
                e.currentTarget.style.color = "#71717A";
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px]" style={{ color: "#3F3F46" }}>
            © 2026 HookahPlace Finch
          </span>
          <span
            className="text-[9px] tracking-wider px-2 py-1"
            style={{ border: `1px solid ${ACCENT}`, color: ACCENT }}
          >
            18+
          </span>
        </div>
      </div>
    </footer>
  );
}
