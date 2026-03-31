"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Command,
  Globe,
  Cpu,
  Instagram,
  Linkedin,
  ChevronUp,
  Activity,
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
} from "lucide-react";

interface Props {
  locale: "en" | "ar";
}

export default function ProfessionalBalancedFooter({ locale }: Props) {
  const isArabic = locale === "ar";

  const t = {
    description:
      locale === "ar"
        ? "نساعد الشركات على النمو من خلال حلول رقمية ذكية."
        : "We help businesses grow through smart digital solutions.",

    important: locale === "ar" ? "روابط مهمة" : "Important Links",
    home: locale === "ar" ? "الرئيسية" : "Home",
    about: locale === "ar" ? "من نحن" : "About Us",
    alphaLink: locale === "ar" ? "ألفا للإنتاج" : "Alpha Production",
    tech: locale === "ar" ? "نورمبيرغ تك" : "Nuremberg Tech",

    initiate: locale === "ar" ? "ابدأ مشروعك" : "Start Project",

    uptime: locale === "ar" ? "الاعتمادية" : "Reliability",
    latency: locale === "ar" ? "الأداء" : "Performance",

    station: locale === "ar" ? "المكتب" : "Office",
    location: locale === "ar" ? "عمّان، الأردن" : "Amman, Jordan",

    network: locale === "ar" ? "بيئة التشغيل" : "Live Environment",
    kernel: locale === "ar" ? "إصدار النظام" : "System Version",

    email: "hello@ntech.pro",
    phone: "+962 7 9000 0000",
  };

  const [ping, setPing] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 7) + 12);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
<div className="h-screen flex flex-col justify-end">
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-[#030303] text-white px-4 md:px-16 pb-5 relative"
    >
      
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/5">
        {/* LEFT */}
        <div className="md:col-span-4 p-10 md:p-16 space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black border border-cyan-500/30 flex items-center justify-center rounded-xl">
              <Command size={22} className="text-cyan-500" />
            </div>
            <div>
              <span className="text-2xl font-black uppercase italic tracking-tighter block">
                {locale === "en" ? "Nuremberg Group" : "مجموعة نورمبغ"}
              </span>
              <span className="text-[9px] font-mono text-cyan-500/60 tracking-[0.3em] uppercase">
                {locale === "en" ? "Tech_Evolution" : "تطور التكنولوجيا"}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            {t.description}
          </p>

          <div className="flex gap-4">
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Facebook size={18} />} />
          </div>
        </div>

        {/* LINKS */}
        <div className="md:col-span-3 p-10 md:p-16">
          <h4 className="text-cyan-500/50 text-[10px] font-black uppercase tracking-[0.5em] mb-10">
            {t.important}
          </h4>

          <ul className="space-y-6">
            <FooterLink href="/home" label={t.home} />
            <FooterLink href="/about-us" label={t.about} />
            <FooterLink href="/alpha-production" label={t.alphaLink} />
            <FooterLink href="/nuremberg-tech" label={t.tech} />
          </ul>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-4 p-10 md:p-16 flex flex-col justify-between">
          <div>
            <h4 className="text-cyan-500/50 text-[10px] font-black uppercase tracking-[0.5em] mb-10">
              {t.initiate}
            </h4>

            <a
              href={`mailto:${t.email}`}
              className="inline-flex items-start gap-3 group"
            >
              <span className="text-lg md:text-xl font-black uppercase italic tracking-tighter group-hover:text-cyan-500 transition-colors">
                {t.email}
              </span>
              <ArrowUpRight
                className="mt-1 text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                size={20}
              />
            </a>

            <div className="mt-6 space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-cyan-500" /> {t.email}
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-cyan-500" /> {t.phone}
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-cyan-500" /> {t.location}
              </div>
            </div>
          </div>
        </div>
      </div>

   
    </footer>
    </div>
  );
}

const FooterLink = ({ href, label }: any) => (
  <li className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white">
    <Link href={href}>{label}</Link>
  </li>
);

const SocialIcon = ({ icon }: any) => (
  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:border-cyan-500 hover:text-cyan-500 transition rounded-xl">
    {icon}
  </div>
);

const StatCard = ({ icon, label, value }: any) => (
  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition">
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
