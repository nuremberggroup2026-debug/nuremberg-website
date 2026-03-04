"use client";
import React, { useRef } from "react";
import {
  Zap,
  Send,
  User,
  Mail,
  MessageSquare,
  Tag,
  AlertCircle,
  Settings,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { aboutData } from "@/data/AboutData";
import { useLocale } from "next-intl";

interface ProInputProps {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  isTextArea?: boolean;
}

export default function FormSection() {
  const containerRef = useRef<HTMLDivElement>(null);
    const locale = useLocale() as "en" | "ar";
  const texts = aboutData[locale]?.form || aboutData.en.form;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.to(".gear-rotate", {
        rotate: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".signal-bar", {
        scaleY: "random(0.3, 1)",
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.05,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center p-4 relative z-10 font-sans tracking-tight"
    >
      <div className="main-panel w-full max-w-[1050px] bg-[#050505]/95 backdrop-blur-2xl border-2 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.4)] overflow-hidden relative">
        <div className="absolute -top-24 -right-24 opacity-[0.05] text-white pointer-events-none">
          <Settings size={450} className="gear-rotate" />
        </div>

        <div className="grid lg:grid-cols-10 gap-0">
          <div className="lg:col-span-3 bg-white/[0.03] p-8 border-r-2 border-cyan-500/20 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-cyan-400 mb-6">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase italic">
                  {texts.systemStatus}
                </span>
              </div>

              <h2 className="text-4xl font-black text-white leading-none uppercase italic mb-4">
                {texts.dataTitle} <br />
                <span className="text-cyan-500">{texts.dataHighlight}</span>
              </h2>

              <div className="mt-8 flex items-end gap-[4px] h-12">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="signal-bar w-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] origin-bottom"
                    style={{ height: "100%" }}
                  />
                ))}
              </div>

              <p className="mt-8 text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest max-w-[200px]">
                {texts.nodeStatus}
              </p>
            </div>

            <div className="space-y-3 pt-6 font-mono text-[10px] text-gray-500 border-t border-white/10 relative z-10 uppercase tracking-tighter">
              <div className="flex justify-between">
                <span>{texts.latency}</span>{" "}
                <span className="text-cyan-400 font-bold">12ms</span>
              </div>
              <div className="flex justify-between">
                <span>{texts.nodeID}</span>{" "}
                <span className="text-white font-bold">Amman_01</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 md:p-10 relative">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <ProInput
                  label={texts.operatorName}
                  placeholder={texts.enterName}
                  icon={<User size={16} />}
                />
                <ProInput
                  label={texts.signalChannel}
                  placeholder={texts.enterEmail}
                  icon={<Mail size={16} />}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <ProInput
                  label={texts.targetHeader}
                  placeholder={texts.subject}
                  icon={<Tag size={16} />}
                />
                <ProInput
                  label={texts.priorityBit}
                  placeholder={texts.level}
                  icon={<AlertCircle size={16} />}
                />
              </div>

              <div className="input-field">
                <ProInput
                  label={texts.dataPayload}
                  placeholder={texts.messageContent}
                  isTextArea
                  icon={<MessageSquare size={16} />}
                />
              </div>

              <div className="input-field pt-2">
                <button
                  type="submit"
                  className="w-full h-14 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-sm tracking-[0.6em] uppercase transition-all flex items-center justify-center gap-4 group rounded-sm shadow-[0_10px_30px_rgba(8,145,178,0.3)]"
                >
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                  {texts.transmitSignal}
                  <Zap size={18} fill="currentColor" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProInput = ({
  label,
  placeholder,
  icon,
  isTextArea = false,
}: ProInputProps) => (
  <div className="input-field group flex flex-col gap-3">
    <div className="flex items-center gap-2.5">
      <span className="text-cyan-500 group-focus-within:text-cyan-400 transition-colors">
        {icon}
      </span>
      <label className="text-[11px] font-black text-white uppercase tracking-[0.2em] group-focus-within:text-cyan-400 transition-colors">
        {label}
      </label>
    </div>

    <div className="relative">
      {isTextArea ? (
        <textarea
          rows={2}
          placeholder={placeholder}
          className="w-full bg-black/60 border-2 border-white/20 p-4 text-sm font-bold text-white focus:outline-none focus:border-cyan-500/80 focus:bg-cyan-950/20 transition-all placeholder:text-white/10 resize-none rounded-sm uppercase tracking-wider"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-black/60 border-2 border-white/20 p-4 text-sm font-bold text-white focus:outline-none focus:border-cyan-500/80 focus:bg-cyan-950/20 transition-all placeholder:text-white/10 uppercase tracking-wider rounded-sm"
        />
      )}

      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-500 group-focus-within:w-full shadow-[0_0_15px_#22d3ee]" />
    </div>
  </div>
);