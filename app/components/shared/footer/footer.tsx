"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import {
  ArrowUpRight, Command, Globe, Cpu,
  Instagram, Linkedin, Github, ChevronUp,
  Activity, Zap
} from "lucide-react";

export default function ProfessionalBalancedFooter() {
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";

  const translations = {
    en: {
      description:
        "Architecting high-performance digital ecosystems and cinematic narratives with surgical precision.",
      modules: "Modules",
      backend: "Backend Systems",
      alpha: "Alpha Production",
      cloud: "Cloud Security",
      web3: "Web3 Lab",
      initiate: "Initiate_Project",
      uptime: "Uptime",
      latency: "Latency",
      station: "Station_02",
      location: "Amman, Jordan",
      network: "Network_Mainnet",
      kernel: "Kernel_V2.6.0",
      email: "HELLO@NTECH.PRO"
    },
    ar: {
      description:
        "نقوم ببناء أنظمة رقمية عالية الأداء وصناعة تجارب سينمائية بدقة هندسية متناهية.",
      modules: "الوحدات",
      backend: "أنظمة الخلفية",
      alpha: "إنتاج ألفا",
      cloud: "أمن السحابة",
      web3: "مختبر Web3",
      initiate: "ابدأ_مشروعك",
      uptime: "مدة_التشغيل",
      latency: "زمن_الاستجابة",
      station: "المحطة_02",
      location: "عمّان، الأردن",
      network: "الشبكة_الرئيسية",
      kernel: "النواة_V2.6.0",
      email: "HELLO@NTECH.PRO"
    }
  };

  const t = translations[locale];

  const [ping, setPing] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * (18 - 12 + 1) + 12));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const modules = [t.backend, t.alpha, t.cloud, t.web3];

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-[#030303] text-white px-4 md:px-16 pb-12 relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/5">

        {/* LEFT */}
        <div className="md:col-span-5 p-10 md:p-16 space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black border border-cyan-500/30 flex items-center justify-center rounded-xl">
              <Command size={22} className="text-cyan-500" />
            </div>
            <div>
              <span className="text-2xl font-black uppercase italic tracking-tighter block">
                Nuremberg_
              </span>
              <span className="text-[9px] font-mono text-cyan-500/60 tracking-[0.3em] uppercase">
                Tech_Evolution
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            {t.description}
          </p>

          <div className="flex gap-4">
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Github size={18} />} />
          </div>
        </div>

        {/* MODULES */}
        <div className="md:col-span-3 p-10 md:p-16">
          <h4 className="text-cyan-500/50 text-[10px] font-black uppercase tracking-[0.5em] mb-10">
            {t.modules}
          </h4>

          <ul className="space-y-6">
            {modules.map((item) => (
              <li
                key={item}
                className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer break-words"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-4 p-10 md:p-16 flex flex-col justify-between">
          <div>
            <h4 className="text-cyan-500/50 text-[10px] font-black uppercase tracking-[0.5em] mb-10">
              {t.initiate}
            </h4>

            <a href="mailto:hello@ntech.pro">
              <span className="text-xl md:text-2xl font-black uppercase italic tracking-tighter break-words">
                {t.email}
              </span>
              <ArrowUpRight className="inline-block ml-3 text-cyan-500" size={20} />
            </a>
          </div>

          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-2 gap-4">

              <StatCard
                icon={<Activity size={12} />}
                label={t.uptime}
                value="99.99%"
              />

              <StatCard
                icon={<Zap size={12} />}
                label={t.latency}
                value={`${ping}ms`}
              />

            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] text-gray-600 block uppercase tracking-[0.3em]">
                  {t.station}
                </span>
                <span className="text-[9px] text-white/40 block uppercase tracking-[0.3em] break-words">
                  {t.location}
                </span>
              </div>

              <button
                onClick={scrollToTop}
                className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-xl hover:bg-cyan-500 hover:text-black transition-all duration-500"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-10 py-6 border-t border-white/5 flex justify-between items-center bg-black/50">
        <div className="flex gap-6 text-[9px] font-black text-gray-700 uppercase">
          <div className="flex items-center gap-2">
            <Globe size={12} /> {t.network}
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={12} /> {t.kernel}
          </div>
        </div>

        {/* حل مشكلة النص الطويل 
        <div className="text-[9px] font-black text-gray-800 uppercase break-words">
          © 2026 Nuremberg_Technology_Holdings
        </div>
        */}
      </div>
    </footer>
  );
}

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-500 cursor-pointer rounded-xl">
    {icon}
  </div>
);

const StatCard = ({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
    <div className="flex items-center gap-2 text-cyan-500 mb-1">
      {icon}
      <span className="text-[8px] font-mono font-black uppercase tracking-widest">
        {label}
      </span>
    </div>
    <span className="text-xs font-mono font-bold tracking-tighter">
      {value}
    </span>
  </div>
);