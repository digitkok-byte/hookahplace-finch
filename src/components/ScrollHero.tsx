"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#B40000";
const heading = "font-['Bebas_Neue',sans-serif]";

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Load video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      if (video.readyState >= 2) setReady(true);
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.load();

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, []);

  // Scroll → video time
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

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

        if (video.duration && ready) {
          video.currentTime = fraction * video.duration;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      {/* Fixed viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
        />

        {/* Dark overlay — fades out as lamp turns on */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-100"
          style={{ opacity: Math.max(0, 0.6 - progress * 1.2) }}
        />

        {/* Warm glow overlay — appears as lamp lights up */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, rgba(180, 0, 0, ${progress * 0.08}) 0%, transparent 70%)`,
          }}
        />

        {/* Loading screen */}
        {!ready && (
          <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
            <div
              className={`${heading} text-2xl tracking-widest animate-pulse`}
              style={{ color: ACCENT }}
            >
              HOOKAHPLACE
            </div>
          </div>
        )}

        {/* Content — appears after lamp turns on */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-16 md:pb-20 z-10">
          {/* HOOKAHPLACE */}
          <h1
            className={`${heading} text-6xl md:text-[120px] lg:text-[160px] leading-[0.9] tracking-tight text-white`}
            style={{
              opacity: clamp01((progress - 0.5) / 0.2),
              transform: `translateY(${Math.max(0, (1 - clamp01((progress - 0.5) / 0.2)) * 40)}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            HOOKAHPLACE
          </h1>

          {/* FINCH */}
          <p
            className={`${heading} text-3xl md:text-5xl tracking-[0.15em] mt-2`}
            style={{
              color: ACCENT,
              opacity: clamp01((progress - 0.6) / 0.15),
              transform: `translateY(${Math.max(0, (1 - clamp01((progress - 0.6) / 0.15)) * 30)}px)`,
              transition: "transform 0.1s ease-out",
              textShadow:
                progress > 0.65
                  ? `0 0 ${20 + (progress - 0.65) * 40}px rgba(180, 0, 0, ${0.3 + progress * 0.3})`
                  : "none",
            }}
          >
            FINCH
          </p>

          {/* CTA Button */}
          <a
            href="#booking"
            className="inline-block mt-8 px-10 py-4 text-sm font-semibold tracking-wider text-white transition-all hover:opacity-80 max-w-fit"
            style={{
              background: ACCENT,
              opacity: clamp01((progress - 0.75) / 0.15),
              transform: `translateY(${Math.max(0, (1 - clamp01((progress - 0.75) / 0.15)) * 20)}px)`,
            }}
          >
            ЗАБРОНИРОВАТЬ СТОЛ
          </a>
        </div>

        {/* Scroll hint */}
        <ScrollHint visible={progress < 0.05} />
      </div>
    </div>
  );
}

function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <span
        className="text-[10px] tracking-[0.3em] text-white/50 font-light animate-pulse"
      >
        SCROLL
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1"
        className="opacity-40 animate-pulse"
      >
        <path d="M7 10l5 5 5-5" />
      </svg>
    </div>
  );
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}
