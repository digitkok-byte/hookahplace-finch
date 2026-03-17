"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#B40000";
const heading = "font-['Bebas_Neue',sans-serif]";

// Text lines that accumulate — rise from bottom to top, stack at top
const TEXT_LINES = [
  // Section 1
  { text: "HOOKAHPLACE", trigger: 0.06, style: "title" },
  { text: "FINCH", trigger: 0.12, style: "subtitle" },
  { text: "LOUNGE BAR", trigger: 0.18, style: "small" },

  // Section 2
  { text: "ПРЕМИАЛЬНЫЕ КАЛЬЯНЫ", trigger: 0.38, style: "medium" },
  { text: "АВТОРСКИЕ НАПИТКИ", trigger: 0.44, style: "medium" },
  { text: "АТМОСФЕРА", trigger: 0.50, style: "accent" },

  // Section 3
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

  // Load all 3 videos
  useEffect(() => {
    const videos = [v1Ref.current, v2Ref.current, v3Ref.current];
    if (videos.some((v) => !v)) return;

    let loaded = 0;
    const check = () => {
      loaded++;
      if (loaded >= 3) setReady(true);
    };

    videos.forEach((v) => {
      const handler = () => { if (v!.readyState >= 2) check(); };
      v!.addEventListener("canplay", handler);
      v!.load();
      if (v!.readyState >= 2) check();
    });
  }, []);

  // Scroll → video time
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

        {/* Left gradient for text readability */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.3) 50%, transparent 80%)",
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

        {/* ── Accumulated text — LEFT side, stacking TOP to BOTTOM from top ── */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="px-5 md:px-12 pt-12 md:pt-16 flex flex-col gap-0.5">
            {TEXT_LINES.map((line, i) => {
              const appeared = progress >= line.trigger;
              const entry = appeared
                ? clamp01((progress - line.trigger) / 0.04)
                : 0;

              return (
                <div
                  key={i}
                  style={{
                    opacity: entry,
                    transform: `translateY(${lerp(60, 0, entry)}px)`,
                    transition: "transform 0.2s ease-out",
                    pointerEvents: line.style === "cta" && appeared ? "auto" : "none",
                  }}
                >
                  {line.style === "title" && (
                    <h1
                      className={`${heading} text-[52px] md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight text-white`}
                      style={{ letterSpacing: "-1.5px" }}
                    >
                      {line.text}
                    </h1>
                  )}
                  {line.style === "subtitle" && (
                    <p
                      className={`${heading} text-[36px] md:text-[52px] leading-[1] tracking-wider`}
                      style={{ color: ACCENT, letterSpacing: "2px" }}
                    >
                      {line.text}
                    </p>
                  )}
                  {line.style === "small" && (
                    <p
                      className="text-[11px] md:text-xs tracking-[0.4em] font-medium uppercase mt-1"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
                    >
                      {line.text}
                    </p>
                  )}
                  {line.style === "medium" && (
                    <p
                      className={`${heading} text-[24px] md:text-[32px] leading-[1.1] tracking-wider`}
                      style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "2px" }}
                    >
                      {line.text}
                    </p>
                  )}
                  {line.style === "accent" && (
                    <p
                      className={`${heading} text-[36px] md:text-[48px] leading-[1]`}
                      style={{
                        color: ACCENT,
                        letterSpacing: "2px",
                        textShadow: "0 0 40px rgba(180,0,0,0.3)",
                      }}
                    >
                      {line.text}
                    </p>
                  )}
                  {line.style === "cta" && (
                    <a
                      href="#booking"
                      className={`${heading} inline-block mt-3 text-[18px] md:text-[22px] tracking-wider transition-colors hover:text-white`}
                      style={{ color: ACCENT, letterSpacing: "2px" }}
                    >
                      {line.text}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
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
      className="absolute bottom-8 left-5 md:left-12 z-30 flex items-center gap-3 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="w-px h-8 bg-white/20 animate-pulse" />
      <span className="text-[9px] tracking-[0.5em] text-white/25 font-light" style={{ fontFamily: "Inter, sans-serif" }}>
        SCROLL
      </span>
    </div>
  );
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
