"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#B40000";
const heading = "font-['Bebas_Neue',sans-serif]";

// Top-left: brand (H1, H2, tagline)
const TOP_LINES = [
  { text: "HOOKAHPLACE", trigger: 0.06, style: "title" },
  { text: "FINCH", trigger: 0.12, style: "subtitle" },
  { text: "LOUNGE BAR", trigger: 0.18, style: "small" },
];

// Bottom-right: details accumulate upward
const BOTTOM_LINES = [
  { text: "ПРЕМИАЛЬНЫЕ КАЛЬЯНЫ", trigger: 0.38, style: "medium" },
  { text: "АВТОРСКИЕ НАПИТКИ", trigger: 0.44, style: "medium" },
  { text: "АТМОСФЕРА", trigger: 0.50, style: "accent" },
  { text: "ЮГ МОСКВЫ", trigger: 0.68, style: "medium" },
  { text: "КУСТАНАЙСКАЯ 10А", trigger: 0.74, style: "small" },
  { text: "ЕЖЕДНЕВНО С 13:00", trigger: 0.80, style: "small" },
  { text: "ЗАБРОНИРОВАТЬ →", trigger: 0.86, style: "cta" },
];

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);
  const v3Ref = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const videos = [v1Ref.current, v2Ref.current, v3Ref.current];
    if (videos.some((v) => !v)) return;

    let loaded = 0;
    const check = () => { loaded++; if (loaded >= 3) setReady(true); };

    videos.forEach((v) => {
      const handler = () => { if (v!.readyState >= 2) check(); };
      v!.addEventListener("canplay", handler);
      v!.load();
      if (v!.readyState >= 2) check();
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const videos = [v1Ref.current, v2Ref.current, v3Ref.current];
    if (!container || videos.some((v) => !v)) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const scrollable = container.scrollHeight - window.innerHeight;
        const scrolled = -rect.top;
        const fraction = Math.max(0, Math.min(1, scrolled / scrollable));

        setProgress(fraction);

        const sectionSize = 1 / 3;
        const sectionIndex = Math.min(2, Math.floor(fraction / sectionSize));
        const localProgress = (fraction - sectionIndex * sectionSize) / sectionSize;

        videos.forEach((v, i) => {
          if (v && v.duration && ready) {
            if (i === sectionIndex) {
              v.currentTime = Math.min(localProgress, 0.999) * v.duration;
            } else if (i < sectionIndex) {
              v.currentTime = v.duration * 0.999;
            } else {
              v.currentTime = 0;
            }
          }
        });

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);

  const sectionSize = 1 / 3;
  const activeSection = Math.min(2, Math.floor(progress / sectionSize));

  const getVideoOpacity = (index: number) => {
    if (index === activeSection) return 1;
    if (index === activeSection - 1) {
      const t = (progress - activeSection * sectionSize) / (sectionSize * 0.08);
      return Math.max(0, 1 - t);
    }
    return 0;
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: "1200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video layers */}
        {[
          { ref: v1Ref, src: "/hero-video.mp4" },
          { ref: v2Ref, src: "/section-video.mp4" },
          { ref: v3Ref, src: "/section3-video.mp4" },
        ].map((v, i) => (
          <video
            key={i}
            ref={v.ref}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: getVideoOpacity(i), zIndex: i }}
            src={v.src}
            muted
            playsInline
            preload="auto"
          />
        ))}

        {/* Gradient overlays for both corners */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: [
              "linear-gradient(to bottom right, rgba(10,10,10,0.7) 0%, transparent 40%)",
              "linear-gradient(to top left, rgba(10,10,10,0.7) 0%, transparent 40%)",
            ].join(", "),
          }}
        />

        {/* Loading */}
        {!ready && (
          <div className="absolute inset-0 bg-[#0A0A0A] z-50 flex items-center justify-center">
            <div className={`${heading} text-3xl tracking-[0.15em] animate-pulse`} style={{ color: ACCENT }}>
              HOOKAHPLACE
            </div>
          </div>
        )}

        {/* ── TOP LEFT: Brand ── */}
        <div className="absolute top-0 left-0 z-20 pointer-events-none px-5 md:px-12 pt-12 md:pt-16 flex flex-col gap-0.5">
          {TOP_LINES.map((line, i) => {
            const entry = progress >= line.trigger ? clamp01((progress - line.trigger) / 0.04) : 0;
            return (
              <div
                key={i}
                style={{
                  opacity: entry,
                  transform: `translateY(${lerp(50, 0, entry)}px)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                {line.style === "title" && (
                  <h1
                    className={`${heading} text-[48px] md:text-[80px] lg:text-[100px] leading-[0.9] text-white`}
                    style={{ letterSpacing: "-1.5px" }}
                  >
                    {line.text}
                  </h1>
                )}
                {line.style === "subtitle" && (
                  <p
                    className={`${heading} text-[32px] md:text-[52px] leading-[1]`}
                    style={{ color: ACCENT, letterSpacing: "2px" }}
                  >
                    {line.text}
                  </p>
                )}
                {line.style === "small" && (
                  <p
                    className="text-[10px] md:text-xs tracking-[0.4em] font-medium uppercase mt-1"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
                  >
                    {line.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM RIGHT: Details accumulating upward ── */}
        <div className="absolute bottom-0 right-0 z-20 pointer-events-none px-5 md:px-12 pb-12 md:pb-16 flex flex-col items-end gap-0.5">
          {/* Render in reverse so newest items push up from bottom */}
          {[...BOTTOM_LINES].reverse().map((line, i) => {
            const appeared = progress >= line.trigger;
            const entry = appeared ? clamp01((progress - line.trigger) / 0.04) : 0;

            return (
              <div
                key={i}
                className="text-right"
                style={{
                  opacity: entry,
                  transform: `translateY(${lerp(50, 0, entry)}px)`,
                  transition: "transform 0.2s ease-out",
                  pointerEvents: line.style === "cta" && appeared ? "auto" : "none",
                }}
              >
                {line.style === "medium" && (
                  <p
                    className={`${heading} text-[22px] md:text-[30px] leading-[1.1]`}
                    style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "2px" }}
                  >
                    {line.text}
                  </p>
                )}
                {line.style === "accent" && (
                  <p
                    className={`${heading} text-[32px] md:text-[44px] leading-[1]`}
                    style={{
                      color: ACCENT,
                      letterSpacing: "2px",
                      textShadow: "0 0 40px rgba(180,0,0,0.3)",
                    }}
                  >
                    {line.text}
                  </p>
                )}
                {line.style === "small" && (
                  <p
                    className="text-[10px] md:text-xs tracking-[0.4em] font-medium uppercase"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
                  >
                    {line.text}
                  </p>
                )}
                {line.style === "cta" && (
                  <a
                    href="#booking"
                    className={`${heading} inline-block mt-2 text-[18px] md:text-[22px] tracking-wider transition-colors hover:text-white`}
                    style={{ color: ACCENT, letterSpacing: "2px" }}
                  >
                    {line.text}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll hint */}
        <ScrollHint visible={progress < 0.02} />

        {/* Progress line */}
        <div
          className="absolute bottom-0 left-0 h-px z-30"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${ACCENT}, #C9A96E)`,
          }}
        />
      </div>
    </div>
  );
}

function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute right-5 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Arrow up */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="animate-[scrollPulse_1.5s_ease-in-out_infinite]" style={{ opacity: 0.7 }}>
        <path d="M18 15l-6-6-6 6" />
      </svg>

      {/* Line */}
      <div className="w-px h-10" style={{ background: ACCENT, opacity: 0.4 }} />

      {/* SCROLL text */}
      <span
        className={`${heading} text-[14px] tracking-[0.2em] animate-[scrollPulse_1.5s_ease-in-out_infinite]`}
        style={{ color: ACCENT, opacity: 0.7, writingMode: "vertical-lr" }}
      >
        SCROLL
      </span>

      {/* Line */}
      <div className="w-px h-10" style={{ background: ACCENT, opacity: 0.4 }} />

      {/* Arrow down */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="animate-[scrollPulse_1.5s_ease-in-out_infinite_0.3s]" style={{ opacity: 0.7 }}>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
