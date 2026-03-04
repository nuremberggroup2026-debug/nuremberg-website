"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Cpu,
  Database,
  ShieldCheck,
  Code2,
  Share2,
} from "lucide-react";
import type { translatedProjects } from "@/types/index";
import Image from "next/image";

interface Props {
  projects: translatedProjects[];
}

export default function ProjectsSection({ projects }: Props) {
  const [active, setActive] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 400);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section className="py-32  flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center gap-16 max-w-6xl w-full px-10">
        <div className="relative flex md:flex-col gap-6 order-2 md:order-1 z-20">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`group relative w-14 h-14 rounded-2xl border transition-all duration-500 flex items-center justify-center ${
                active === i
                  ? "bg-cyan-400 border-cyan-400 text-black shadow-[0_0_30px_rgba(34,211,238,0.2)] scale-110"
                  : "bg-white/5 border-white/10 text-white/40 hover:border-cyan-400/40 hover:text-white"
              }`}
            >
              <p className="text-sm font-black italic tracking-tighter">
                {i + 1}
              </p>

              {active === i && (
                <div className="hidden md:block absolute left-full w-10 h-[2px] bg-cyan-400 ml-2 animate-in slide-in-from-left-2 duration-300" />
              )}
            </button>
          ))}
        </div>

        <div className="relative flex-grow order-1 md:order-2 group w-full">
          <div
            className={`relative w-full aspect-video md:aspect-[21/9] rounded-[40px] overflow-hidden border transition-all duration-700 ${isChanging ? "border-cyan-400/50 scale-[0.98]" : "border-white/10 shadow-2xl shadow-cyan-900/10"}`}
          >
            <Image
              key={active}
 src={projects[active].project_image || "/images/fallback.jpg"}              fill
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isChanging ? "scale-110 blur-sm opacity-20" : "scale-100 grayscale-[0.5] group-hover:grayscale-0 opacity-40 group-hover:opacity-60"}`}
              alt=""
            />

            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80 pointer-events-none" />

            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-cyan-400 text-black rounded-md w-fit">
                    <Share2 size={12} className="animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-tighter italic">
                      Live_Module
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div
                  className={`space-y-2 transition-all duration-500 ${isChanging ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}
                >
                  <h3 className="text-4xl md:text-6xl font-[1000] italic tracking-tighter text-white uppercase leading-none">
                    {projects[active].project_name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-cyan-400/50" />
                    <p className="text-sm font-mono text-cyan-400 uppercase tracking-[0.2em]">
                      {projects[active].project_description}
                    </p>
                  </div>
                </div>

                <button className="relative group/btn overflow-hidden w-16 h-16 rounded-3xl bg-white text-black flex items-center justify-center transition-all duration-300 hover:bg-cyan-400 hover:w-48">
                  <span className="absolute left-6 font-black italic tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity">
                    VIEW_PROJECT
                  </span>
                  <ArrowUpRight
                    size={24}
                    className="group-hover/btn:translate-x-16 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center px-6">
            <div className="flex items-center gap-6">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full ${i < active + 1 ? "bg-cyan-400" : "bg-white/10"}`}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/20 italic">
                Node_Security: Verified
              </span>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">
              © 2026 Archive
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
