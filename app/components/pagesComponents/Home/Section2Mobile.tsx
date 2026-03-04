"use client";

import React from "react";
import { useLocale } from "next-intl";
import { homeData } from "@/data/Homadata";

export default function Section2Mobile() {
  const locale = useLocale() as "en" | "ar";
  const content = homeData[locale]?.section2Mobile || homeData.en.section2Mobile;

  return (
    <div className="w-full bg-black text-white font-sans">
      {content.map((item, idx) => {
        const isRightAligned = idx % 2 !== 0;

        return (
          <section
            key={item.id}
            className="relative px-6 py-20 border-b border-cyan-500/10"
          >
            {/* الرقم الخلفي */}
            <div
              className={`absolute top-10 font-black text-[28vw] leading-none select-none pointer-events-none opacity-[0.04] text-cyan-500
              ${isRightAligned ? "left-4" : "right-4"}`}
            >
              {item.num}
            </div>

            <div
              className={`relative z-10 flex flex-col gap-6 ${
                isRightAligned ? "items-end text-right" : "items-start text-left"
              }`}
            >
              {/* Label */}
              <div className="flex items-center gap-2">
                {!isRightAligned && (
                  <div className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
                )}

                <span className="text-cyan-500 font-mono text-[10px] tracking-[0.35em] uppercase italic">
                  {item.label} _ {item.num}
                </span>

                {isRightAligned && (
                  <div className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
                )}
              </div>

              {/* Title */}
              <h2 className="text-4xl font-black italic uppercase leading-[1] tracking-tight">
                {item.title.split(" ")[0]} <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px #06b6d4" }}
                >
                  {item.title.split(" ")[1]}
                </span>
              </h2>

              {/* Divider */}
              <div className="w-16 h-[2px] bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />

              {/* Description */}
              <div
                className={`max-w-sm ${
                  isRightAligned ? "border-r-4 pr-5" : "border-l-4 pl-5"
                } border-cyan-500/30`}
              >
                <p className="text-gray-400 font-mono text-sm leading-relaxed uppercase italic">
                  {item.desc}
                </p>
              </div>

              {/* HUD Info */}
              <div className="flex gap-4 text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] pt-4">
                <span>Optimized</span>
                <span>Stable</span>
                <span>v4.2</span>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}