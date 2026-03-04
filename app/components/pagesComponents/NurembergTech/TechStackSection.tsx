"use client";

import React from "react";
import { Code2 } from "lucide-react";

export default function TechStackSection() {
  return (
    <section className="py-40 px-10 md:px-20 flex flex-col lg:flex-row gap-20 bg-zinc-950/20">
      <div className="lg:w-1/2">
        <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-12 leading-none">
          The_Stack.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { n: "Next.js 15", d: "High-Performance Framework" },
            { n: "Three.js", d: "3D Rendering Engine" },
            { n: "Tailwind CSS", d: "Atomic Styling Utility" },
            { n: "Edge Compute", d: "Global Deployment Node" },
          ].map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-cyan-400/20 transition-all"
            >
              <p className="text-white font-black tracking-widest mb-1 italic uppercase">
                {t.n}
              </p>
              <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">
                {t.d}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-1/2">
        <div className="h-full p-12 rounded-[50px] bg-gradient-to-br from-cyan-400/5 to-transparent border border-white/5 relative overflow-hidden group">
          <Code2
            className="absolute -bottom-16 -right-16 text-cyan-400/5 group-hover:scale-110 transition-transform duration-1000"
            size={300}
          />

          <div className="relative z-10 space-y-8">
            <div className="w-16 h-1 bg-cyan-400" />

            <h3 className="text-4xl font-black italic uppercase tracking-tighter">
              Clean_Code <br /> Architecture.
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg font-medium">
              Modular coding standards engineered for maintainability and
              effortless scaling. Every line of code is optimized for the{" "}
              <span className="text-cyan-400">Alpha_Protocol</span>.
            </p>

            <div className="flex items-center gap-6 text-[9px] font-mono tracking-widest text-cyan-400 uppercase">
              <span> Refactored</span>
              <span> Optimized</span>
              <span> Deployed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}