"use client";

import React from "react";
import { Shield, Zap, Target, Users, ArrowUpRight } from "lucide-react";
import { homeData } from "@/data/Homadata";
import { useLocale } from "next-intl";

type WhyUsItem = {
  title: string;
  desc: string;
  stat: string;
};

export default function WhyUs() {
  const locale = useLocale() as "en" | "ar";

  const items: WhyUsItem[] =
    homeData[locale]?.whyUs || homeData.en.whyUs;

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase font-bold">
            Alpha_Standard
          </span>

          <h2 className="text-5xl md:text-7xl font-[1000] text-white uppercase italic tracking-tighter leading-none mt-6">
            {locale === "ar" ? "لماذا ألفا؟" : "WHY "}
            {locale !== "ar" && (
              <span className="text-cyan-500">ALPHA?</span>
            )}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-[#050505] p-8 flex flex-col justify-between min-h-[340px] rounded-xl transition-all duration-500
                         border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)] 
                         hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-lg">
                    {index === 0 && <Shield className="text-cyan-500" size={24} />}
                    {index === 1 && <Target className="text-cyan-500" size={24} />}
                    {index === 2 && <Zap className="text-cyan-500" size={24} />}
                    {index === 3 && <Users className="text-cyan-500" size={24} />}
                  </div>

                  <span className="text-[10px] font-mono text-cyan-500/60 font-bold">
                    {reason.stat}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white uppercase italic mb-4">
                  {reason.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {reason.desc}
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="text-cyan-500 self-end mt-6"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}