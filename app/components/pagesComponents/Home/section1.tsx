"use client";
import React from "react";
import { Cpu, Video, Share2 } from "lucide-react";
import { HeavyCard } from "@/app/components/shared/heavyCard";
import { InteractiveBackground } from "@/app/components/shared/interactivebackground";

export default function Section1() {
  return (
    <InteractiveBackground cols={4} rows={5}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-24 px-6">
        <div className="mb-16 text-center">
          <h2 className="text-cyan-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 animate-pulse">
            Core_Infrastructure
          </h2>
          <div className="h-[1px] w-24 bg-cyan-500/30 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch w-full max-w-7xl mx-auto">
          <HeavyCard
            icon={<Cpu size={32} />}
            title="System_Core"
            desc="Dedicated heavy-duty computing units for massive data arrays and real-time scaling."
          />
          <HeavyCard
            icon={<Video size={32} />}
            title="Visual_Flow"
            desc="Advanced rendering engine with hardware-accelerated shaders and dynamic lighting."
          />
          <HeavyCard
            icon={<Share2 size={32} />}
            title="Global_Link"
            desc="High-speed encrypted synchronization across all decentralized grid nodes globally."
          />
        </div>
      </div>
    </InteractiveBackground>
  );
}
