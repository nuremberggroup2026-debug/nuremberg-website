"use client";

import React, { useRef, useEffect, PropsWithChildren, useMemo } from "react";
import gsap from "gsap";

export const InteractiveBackground: React.FC<
  PropsWithChildren<{ cols?: number; rows?: number; className?: string }>
> = ({ cols = 4, rows = 30, className = "", children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = containerRef.current?.querySelectorAll(".snake-path");

      paths?.forEach((path, i) => {
        gsap.to(path, {
          strokeDashoffset: -400,
          duration: 3,
          repeat: -1,
          ease: "none",
          delay: i * 0.15,
        });
      });

      if (glowRef.current) {
        const xTo = gsap.quickTo(glowRef.current, "x", {
          duration: 0.6,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(glowRef.current, "y", {
          duration: 0.6,
          ease: "power3.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          xTo(e.clientX - 400);
          yTo(e.clientY - 400);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const tiles = useMemo(
    () => Array.from({ length: cols * rows }),
    [cols, rows]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen bg-[#020202] overflow-hidden ${className}`}
    >
      {/* 1. الشبكة الهيكلية */}
      <div
        className="absolute inset-0 grid w-full h-full p-4 pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "12px",
        }}
      >
        {tiles.map((_, i) => (
          <div
            key={i}
            className="relative bg-[#0d0d0d]/40 border-t border-l border-white/[0.03] overflow-hidden"
          >
            <svg className="absolute inset-0 w-full h-full">
              <rect
                width="100%"
                height="100%"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="80 320"
                strokeDashoffset="400"
                className="snake-path opacity-25"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* 2. الوهج التفاعلي (الماوس) */}
      <div
        ref={glowRef}
        className="absolute w-[800px] h-[800px] pointer-events-none z-[2] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* 3. طبقة التظليل الشاملة */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-black/40" />

      {/* 4. الفريم الدائري العميق */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(2, 2, 2, 0.4) 40%, rgba(2, 2, 2, 0.9) 80%, #020202 100%)",
        }}
      />

      {/* 5. طبقة النويز */}
      <div className="absolute inset-0 z-[5] opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* المحتوى */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};