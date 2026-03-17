"use client";

import { useState } from "react";
import ScrollHero from "@/components/ScrollHero";

const ACCENT = "#B40000";
const heading = "font-['Bebas_Neue',sans-serif]";

export default function Home() {
  return (
    <main>
      <ScrollHero />
      <About />
      <Atmosphere />
      <Contacts />
      <Booking />
      <Footer />
    </main>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section className="px-6 py-20 md:px-16 max-w-4xl mx-auto">
      <h2 className={`${heading} text-4xl md:text-5xl tracking-wider mb-6`}>
        О НАС
      </h2>
      <p className="text-[#9CA3AF] text-sm md:text-base leading-relaxed max-w-xl mb-10">
        Новое лаунж-заведение всемирной сети HookahPlace на юге Москвы. Уютная
        атмосфера, премиальные кальяны и авторские напитки.
      </p>

      {/* Rating */}
      <div className="flex items-center gap-4 mb-6">
        <span className={`${heading} text-5xl`}>5.0</span>
        <div>
          <p style={{ color: ACCENT }}>★★★★★</p>
          <p className="text-xs text-[#6C757D]">178 отзывов</p>
        </div>
      </div>

      {/* Badge */}
      <div
        className="flex items-center gap-3 px-5 py-3 mb-10 max-w-fit"
        style={{ border: `1px solid ${ACCENT}` }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke={ACCENT}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z" />
        </svg>
        <span className="text-xs font-semibold tracking-wide">
          ЛАУРЕАТ «ХОРОШЕЕ МЕСТО 2026»
        </span>
      </div>

      {/* Divider */}
      <div className="h-px w-full mb-8" style={{ background: `${ACCENT}40` }} />

      {/* Services */}
      <h3 className={`${heading} text-2xl tracking-wider mb-4`}>УСЛУГИ</h3>
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: "🔞", label: "18+" },
          { icon: "📶", label: "Wi-Fi" },
          { icon: "🍹", label: "Напитки" },
          { icon: "🅿️", label: "Парковка" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-2 py-4 bg-[#111]"
          >
            <span className="text-xl">{s.icon}</span>
            <span className="text-[11px] font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── ATMOSPHERE ─── */
function Atmosphere() {
  return (
    <section className="px-6 py-20 md:px-16 max-w-4xl mx-auto">
      <h2 className={`${heading} text-4xl md:text-5xl tracking-wider mb-3`}>
        АТМОСФЕРА
      </h2>
      <p className="text-[#6C757D] text-sm mb-8">
        Тёмный лаунж с премиальным сервисом
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="h-56 md:h-72 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517638851339-a711cfcf3279?w=800&q=80')",
          }}
        />
        <div
          className="h-56 md:h-72 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80')",
          }}
        />
      </div>
    </section>
  );
}

/* ─── CONTACTS ─── */
function Contacts() {
  const items = [
    {
      label: "Адрес",
      value: "Москва, Кустанайская 10А",
      sub: "м. Шипиловская / Красногвардейская",
    },
    { label: "Телефон", value: "+7 995 505-48-98" },
    { label: "Telegram", value: "@hp_finch" },
  ];

  const hours = [
    { day: "Пн — Чт", time: "13:00 — 02:00" },
    { day: "Пт — Сб", time: "13:00 — 04:00", accent: true },
    { day: "Воскресенье", time: "13:00 — 02:00" },
  ];

  return (
    <section className="px-6 py-20 md:px-16 max-w-4xl mx-auto">
      <h2 className={`${heading} text-4xl md:text-5xl tracking-wider mb-8`}>
        КОНТАКТЫ
      </h2>

      {/* Map placeholder */}
      <div
        className="h-48 md:h-56 mb-8 bg-cover bg-center bg-[#111]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')",
        }}
      />

      {/* Info rows */}
      <div className="space-y-5 mb-10">
        {items.map((item) => (
          <div key={item.label} className="flex gap-3">
            <div
              className="w-1 shrink-0 mt-1"
              style={{ background: ACCENT, height: 16 }}
            />
            <div>
              <p className="text-[11px] text-[#6C757D] tracking-wider font-medium mb-1">
                {item.label}
              </p>
              <p className="text-sm">{item.value}</p>
              {item.sub && (
                <p className="text-xs text-[#9CA3AF] mt-0.5">{item.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hours */}
      <div className="h-px w-full mb-8 bg-[#1A1A1A]" />
      <h3 className={`${heading} text-2xl tracking-wider mb-4`}>
        ЧАСЫ РАБОТЫ
      </h3>
      <div className="space-y-2">
        {hours.map((h) => (
          <div key={h.day} className="flex justify-between text-sm">
            <span className="text-[#9CA3AF]">{h.day}</span>
            <span
              className={h.accent ? "font-semibold" : "font-medium"}
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
    <section id="booking" className="px-6 py-20 md:px-16 max-w-4xl mx-auto">
      <h2 className={`${heading} text-4xl md:text-5xl tracking-wider mb-3`}>
        БРОНИРОВАНИЕ
      </h2>
      <p className="text-[#6C757D] text-sm mb-8">
        Забронируйте стол заранее
      </p>

      <div className="space-y-5">
        <Field
          label="ИМЯ"
          value={form.name}
          placeholder="Ваше имя"
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <Field
          label="ТЕЛЕФОН"
          value={form.phone}
          placeholder="+7 (___) ___-__-__"
          onChange={(v) => setForm({ ...form, phone: v })}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="ДАТА"
            value={form.date}
            placeholder="17.03"
            onChange={(v) => setForm({ ...form, date: v })}
          />
          <Field
            label="ВРЕМЯ"
            value={form.time}
            placeholder="20:00"
            onChange={(v) => setForm({ ...form, time: v })}
          />
        </div>
        <Field
          label="ГОСТЕЙ"
          value={form.guests}
          placeholder="2"
          onChange={(v) => setForm({ ...form, guests: v })}
        />
      </div>

      <button
        className="w-full mt-8 py-4 text-sm font-semibold tracking-wider text-white transition-opacity hover:opacity-80"
        style={{ background: ACCENT }}
      >
        ЗАБРОНИРОВАТЬ
      </button>
    </section>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] text-[#6C757D] tracking-wider font-medium mb-1.5">
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
    <footer className="px-6 py-16 md:px-16 flex flex-col items-center gap-6">
      <h3 className={`${heading} text-3xl tracking-wide`}>HOOKAHPLACE</h3>
      <p className={`${heading} text-lg tracking-widest`} style={{ color: ACCENT }}>
        FINCH
      </p>
      <div className="w-10 h-px" style={{ background: ACCENT }} />

      {/* Social */}
      <div className="flex gap-4">
        {["Telegram", "Phone", "Instagram"].map((s) => (
          <div
            key={s}
            className="w-11 h-11 flex items-center justify-center border border-[#333] hover:border-[#B40000] transition-colors cursor-pointer"
          >
            <span className="text-xs text-white/70">
              {s === "Telegram" ? "TG" : s === "Phone" ? "📞" : "IG"}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#6C757D]">Москва, Кустанайская 10А</p>
      <p className="text-[11px] text-[#333]">© 2026 HookahPlace Finch</p>
      <div
        className="w-8 h-8 flex items-center justify-center text-[10px] font-semibold"
        style={{ border: `1px solid ${ACCENT}`, color: ACCENT }}
      >
        18+
      </div>
    </footer>
  );
}
