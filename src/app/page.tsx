"use client";

import { useState, useEffect, useRef } from "react";
import ScrollHero from "@/components/ScrollHero";

const ACCENT = "#8B2020";
const MUTED = "#6C757D";
const heading = "font-['Bebas_Neue',sans-serif]";

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <ScrollHero />
      <FadeIn><Contacts /></FadeIn>
      <FadeIn><Booking /></FadeIn>
      <FadeIn><Footer /></FadeIn>
    </main>
  );
}

/* ─── CONTACTS ─── */
function Contacts() {
  const items = [
    {
      label: "АДРЕС",
      value: "Москва, Кустанайская 10А",
      sub: "м. Шипиловская / Красногвардейская",
    },
    { label: "ТЕЛЕФОН", value: "+7 995 505-48-98" },
    { label: "TELEGRAM", value: "@hp_finch" },
  ];

  const hours = [
    { day: "Пн — Чт", time: "13:00 — 02:00" },
    { day: "Пт — Сб", time: "13:00 — 04:00", accent: true },
    { day: "Воскресенье", time: "13:00 — 02:00" },
  ];

  return (
    <section className="px-5 py-20 md:px-12 max-w-3xl">
      <h2 className={`${heading} text-[36px] md:text-[48px] tracking-wider mb-10`}>
        КОНТАКТЫ
      </h2>

      <div className="space-y-5 mb-12">
        {items.map((item) => (
          <div key={item.label} className="flex gap-3">
            <div className="w-[2px] shrink-0 mt-1" style={{ background: ACCENT, height: 16 }} />
            <div>
              <p className="text-[11px] tracking-wider font-medium mb-1" style={{ color: MUTED }}>
                {item.label}
              </p>
              <p className="text-sm">{item.value}</p>
              {item.sub && (
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{item.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px w-full mb-8" style={{ background: "#1A1A1A" }} />

      <h3 className={`${heading} text-[24px] tracking-wider mb-4`}>ЧАСЫ РАБОТЫ</h3>
      <div className="space-y-2">
        {hours.map((h) => (
          <div key={h.day} className="flex justify-between text-sm">
            <span style={{ color: "#9CA3AF" }}>{h.day}</span>
            <span
              className={h.accent ? "font-semibold" : ""}
              style={h.accent ? { color: ACCENT } : {}}
            >
              {h.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── BOOKING ─── */
function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });

  return (
    <section id="booking" className="px-5 py-20 md:px-12 max-w-3xl">
      <h2 className={`${heading} text-[36px] md:text-[48px] tracking-wider mb-3`}>
        БРОНИРОВАНИЕ
      </h2>
      <p className="text-sm mb-8" style={{ color: MUTED }}>
        Забронируйте стол заранее
      </p>

      <div className="space-y-5">
        <Field label="ИМЯ" value={form.name} placeholder="Ваше имя" onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="ТЕЛЕФОН" value={form.phone} placeholder="+7 (___) ___-__-__" onChange={(v) => setForm({ ...form, phone: v })} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="ДАТА" value={form.date} placeholder="17.03" onChange={(v) => setForm({ ...form, date: v })} />
          <Field label="ВРЕМЯ" value={form.time} placeholder="20:00" onChange={(v) => setForm({ ...form, time: v })} />
        </div>
        <Field label="ГОСТЕЙ" value={form.guests} placeholder="2" onChange={(v) => setForm({ ...form, guests: v })} />
      </div>

      <button
        className={`${heading} w-full mt-8 py-4 text-sm tracking-wider text-white transition-opacity hover:opacity-80`}
        style={{ background: ACCENT }}
      >
        ЗАБРОНИРОВАТЬ
      </button>
    </section>
  );
}

function Field({
  label, value, placeholder, onChange,
}: {
  label: string; value: string; placeholder: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-wider font-medium mb-1.5" style={{ color: MUTED }}>
        {label}
      </label>
      <input
        className="w-full h-12 px-4 bg-[#111] text-sm text-white placeholder:text-[#444] outline-none border-none focus:ring-1 focus:ring-[#B40000]"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="px-5 py-16 md:px-12 flex flex-col items-start gap-4">
      <div className="h-px w-12 mb-2" style={{ background: ACCENT }} />
      <h3 className={`${heading} text-[28px] tracking-wider`}>HOOKAHPLACE</h3>
      <p className={`${heading} text-[18px] tracking-widest`} style={{ color: ACCENT }}>FINCH</p>

      <div className="flex gap-4 mt-2">
        {[
          { label: "TG", href: "https://t.me/hp_finch" },
          { label: "TEL", href: "tel:+79955054898" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="w-10 h-10 flex items-center justify-center border border-[#333] hover:border-[#B40000] transition-colors text-xs text-white/60"
          >
            {s.label}
          </a>
        ))}
      </div>

      <p className="text-xs mt-4" style={{ color: MUTED }}>Москва, Кустанайская 10А</p>
      <p className="text-[11px]" style={{ color: "#333" }}>© 2026 HookahPlace Finch</p>
      <div
        className="w-8 h-8 flex items-center justify-center text-[10px] font-semibold mt-1"
        style={{ border: `1px solid ${ACCENT}`, color: ACCENT }}
      >
        18+
      </div>
    </footer>
  );
}
