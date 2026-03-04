"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface HeavyCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const HeavyCard: React.FC<HeavyCardProps> = ({ icon, title, desc }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      transformPerspective: 1200,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative group flex flex-col h-full transition-transform duration-500"
    >
      <div className="absolute -inset-[1px] bg-white/5 group-hover:bg-cyan-500/40 transition duration-700 blur-[1px]" />

      <div className="relative bg-[#080808]/90 backdrop-blur-sm p-10 lg:p-12 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl">
        <div className="mb-8 text-cyan-500 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
          {icon}
        </div>

        <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter mb-4 italic text-white leading-none">
          {title}
        </h3>

        <p className="text-gray-500 text-[11px] leading-relaxed font-mono uppercase tracking-[0.15em] mb-12 flex-grow">
          {desc}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase">Encryption</span>
            <span className="text-[10px] font-mono text-cyan-600 tracking-widest uppercase">AES_256_ACTIVE</span>
          </div>
          <ArrowRight
            size={20}
            className="text-gray-700 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};
