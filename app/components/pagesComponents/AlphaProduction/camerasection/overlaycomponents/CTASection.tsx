"use client";
import { ChevronRight, Instagram, Mail, Link2 } from "lucide-react";

interface Props {
  locale: "en" | "ar";
}

const translations = {
  en: {
    goAlpha: "GO ALPHA.",
    est: "EST_2026 // DUBAI_HQ",
    contactHub: "CONTACT_HUB",
    initiateProject: "INITIATE_PROJECT",
    startNow: "START_NOW",
    insta: "INSTA",
    vimeo: "VIMEO",
    allRights: "ALL_RIGHTS_RESERVED_2026",
  },
  ar: {
    goAlpha: "انطلق ألفا.",
    est: "تأسست_2026 // دبي_المقر",
    contactHub: "مركز_الاتصال",
    initiateProject: "ابدأ_المشروع",
    startNow: "ابدأ_الآن",
    insta: "إنستاغرام",
    vimeo: "فيميو",
    allRights: "جميع_الحقوق_محفوظة_2026",
  },
};

export default function CTASection({ locale }: Props) {
  const t = translations[locale]; // ✅ Type-safe

  return (
    <section className="h-screen w-screen flex justify-between items-center pb-24 px-12 md:px-24 relative">
      <div className="w-[38%] pointer-events-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-7xl md:text-9xl font-[1000] italic tracking-tighter leading-[0.8]">
            {t.goAlpha.split(" ")[0]}
            <br />
            <span className="text-cyan-500">{t.goAlpha.split(" ")[1]}</span>
          </h2>
          <p className="text-[9px] font-mono tracking-[0.5em] text-white/20">
            {t.est}
          </p>
        </div>

        <div className="group cursor-pointer border-l-2 border-cyan-500 pl-6">
          <p className="text-cyan-500 text-[10px] font-bold tracking-[0.5em] mb-2">
            {t.contactHub}
          </p>
          <div className="flex items-center gap-4 text-2xl font-black tracking-tighter group-hover:text-cyan-400 transition-colors">
            <Mail size={20} /> HELLO@ALPHA.PROD
          </div>
        </div>
      </div>

      <div className="w-[38%] flex flex-col items-end pointer-events-auto space-y-16">
        <button className="group relative flex items-center gap-8 pl-10 pr-4 py-6 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500 transition-all duration-700 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="text-left">
            <span className="text-[10px] font-mono text-cyan-500 mb-1 block tracking-[0.4em]">
              {t.initiateProject}
            </span>
            <span className="text-xl font-[1000] tracking-[0.5em]">
              {t.startNow}
            </span>
          </div>
          <div className="bg-cyan-500 p-5 group-hover:bg-white group-hover:text-cyan-500 transition-all rounded-lg">
            <ChevronRight size={28} strokeWidth={3} />
          </div>
        </button>

        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-8">
            <a href="#" className="flex items-center gap-3 group">
              <Instagram
                size={18}
                className="text-white/40 group-hover:text-cyan-500 transition-colors"
              />
              <span className="text-[10px] font-black tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                {t.insta}
              </span>
            </a>

            <a href="#" className="flex items-center gap-3 group">
              <Link2
                size={18}
                className="text-white/40 group-hover:text-cyan-500 transition-colors"
              />
              <span className="text-[10px] font-black tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                {t.vimeo}
              </span>
            </a>
          </div>

          <p className="text-[8px] font-mono text-white/10 tracking-[1.2em]">
            {t.allRights}
          </p>
        </div>
      </div>
    </section>
  );
}