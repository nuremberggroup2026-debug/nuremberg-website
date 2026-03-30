"use client";
import React, { useState } from "react";
import { ArrowUpRight, Share2,Globe } from "lucide-react";
import type { translatedProjects } from "@/types/index";
import Image from "next/image";

interface Props {
  projects: translatedProjects[];
  isAr: Boolean;
}

export default function ProjectsSection({ projects, isAr }: Props) {
  const [active, setActive] = useState(0);
  const displayProjects = projects.slice(0, 4);

  return (
    <section className="py-20 md:py-20 bg-[#020202] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Projects Container */}
        <div className="flex flex-col md:flex-row w-full gap-3 md:h-[550px]">
          {displayProjects.map((p, i) => {
            const isActive = active === i;
            return (
              <div
                key={p.id}
                onClick={() => setActive(i)}
                className={`relative overflow-hidden rounded-[2rem] transition-all duration-700 ease-in-out border ${
                  isActive
                    ? "grow md:h-full bg-white/3 border-cyan-500/40 shadow-[0_0_40px_rgba(34,211,238,0.05)]"
                    : "md:w-25 bg-white/[0.01] border-white/5 hover:border-white/20"
                }`}
              >
                {/* --- MOBILE VIEW (Stacked Layout with Smooth Height) --- */}
                <div className="md:hidden">
                  <div
                    className={`flex items-center justify-between w-full h-16 px-6 transition-colors duration-500 ${isActive ? "bg-cyan-500/10" : ""}`}
                  >
                    <span
                      className={`font-mono font-bold transition-colors ${isActive ? "text-cyan-400" : "text-white/20"}`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-bold uppercase tracking-widest text-[10px] transition-colors ${isActive ? "text-white" : "text-white/30"}`}
                    >
                      {p.project_name}
                    </span>
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? "bg-cyan-400 scale-150 shadow-[0_0_10px_#22d3ee]" : "bg-white/10"}`}
                    />
                  </div>

                  <div
                    className={`grid transition-all duration-700 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="relative w-full aspect-[16/10]">
                        <Image
                          src={p.project_image || "/images/fallback.jpg"}
                          fill
                          priority={isActive}
                          quality={100}
                          sizes="100vw"
                          className="object-cover"
                          alt={p.project_name}
                        />
                      </div>

                      <div className="p-6 space-y-5 bg-linear-to-b from-white/5 to-transparent">
                        <p className="text-[13px] font-mono text-gray-400 leading-relaxed border-l-2 border-cyan-500/50 pl-4">
                          {p.project_description}
                        </p>
                        {p.project_link && (
                          <a
                            href={p.project_link}
                            target="_blank"
                            className="block"
                          >
                            <button className="w-full h-14 bg-white text-black font-[1000] italic flex items-center justify-center gap-3 rounded-2xl active:scale-95 transition-all">
                              {isAr ? "زيارة الموقع" : "Visit Website"}
                              <ArrowUpRight size={18} />
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- DESKTOP VIEW (Accordion) --- */}
                <div className="hidden md:block h-full">
                  <Image
                    src={p.project_image || "/images/fallback.jpg"}
                    fill
                    quality={100}
                    sizes="(max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-all duration-1000 ${
                      isActive
                        ? "opacity-30 grayscale-0 scale-100"
                        : "opacity-5 scale-110 grayscale"
                    }`}
                    alt={p.project_name}
                  />

                  {/* Collapsed Vertical Label */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${isActive ? "opacity-0 invisible translate-y-10" : "opacity-100 visible translate-y-0"}`}
                  >
                    <span className="text-cyan-500 font-mono font-bold mb-8 text-xl">
                      0{i + 1}
                    </span>
                    <span className="text-white/20 font-black italic  -rotate-90 whitespace-nowrap text-sm">
                      {p.project_name}
                    </span>
                  </div>

                  {/* Active Desktop Content */}
                  <div
                    className={`absolute inset-0 p-16 flex flex-col justify-between transition-all duration-1000 delay-100 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12 pointer-events-none"}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                      <Globe size={24} />
                    </div>

                    <div className="flex items-end justify-between gap-12">
                      <div className="max-w-4xl">
                        <h3 className="text-5xl font-[1000] italic uppercase text-white tracking-tighter mb-6 leading-[0.85]">
                          {p.project_name}
                        </h3>
                        <p className="text-sm font-mono text-cyan-400/60 border-l-2 border-cyan-500/40 pl-6 max-w-full">
                          {p.project_description}
                        </p>
                      </div>

                      {p.project_link && (
                        <a
                          href={p.project_link}
                          target="_blank"
                          className="group/btn relative"
                        >
                          {/* Outer Glow Effect */}
                          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-2xl opacity-0 group-hover/btn:opacity-40 transition-opacity duration-500 animate-pulse" />

                          <button className="relative h-24 w-24 rounded-full bg-white text-black flex items-center justify-center transition-all duration-500 group-hover/btn:bg-cyan-400 group-hover/btn:scale-110 group-hover/btn:rotate-[360deg]">
                            <ArrowUpRight
                              size={40}
                              className="transition-transform duration-500 group-hover/btn:scale-125"
                            />
                          </button>

                          {/* Label for Button */}
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-500 font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap tracking-widest">
                            {isAr
                              ? `زيارة ${p.project_name}`
                              : `Visit ${p.project_name}`}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
