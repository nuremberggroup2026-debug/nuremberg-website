"use client";
import { Video } from "lucide-react";

interface Props {
  locale: "en" | "ar";
}

const translations = {
  en: {
    system: "SYSTEM_v2.0",
    productions: "PRODUCTIONS",
  },
  ar: {
    system: "النظام_2.0",
    productions: "الإنتاج",
  },
};

export default function HeroSection({ locale }: Props) {
  const sideArea =
    "w-[38%] h-full flex flex-col justify-center px-8 md:px-16 pointer-events-none";

  const t = translations[locale]; // ✅ TypeScript يفهم أن locale صحيح

  return (
    <section className="h-screen w-screen flex justify-between items-center relative">
      <div className={sideArea}>
        <div className="pointer-events-auto p-10 bg-zinc-900/20 backdrop-blur-sm rounded-3xl border-l-8 border-cyan-500">
          <h1 className="text-7xl md:text-9xl font-[1000] italic leading-none tracking-tighter">
            ALPHA<span className="text-cyan-500">.</span>
          </h1>
          <p className="text-cyan-500 font-mono text-xs tracking-[1em] mt-4 font-bold">
            {t.system}
          </p>
        </div>
      </div>
      <div className={`${sideArea} items-end`}>
        <div className="pointer-events-auto text-right p-6 bg-zinc-900/30 backdrop-blur-md rounded-2xl border border-white/5">
          <h2 className="text-2xl font-light tracking-[0.6em] text-white/80 flex items-center gap-4 justify-end">
            {t.productions} <Video className="text-cyan-500" size={24} />
          </h2>
        </div>
      </div>
    </section>
  );
}