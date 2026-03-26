"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  ArrowUpRight,
  Command,
  Globe,
  Cpu,
  Instagram,
  Linkedin,
  Github,
  ChevronUp,
  Activity,
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
} from "lucide-react";

export default function ProfessionalBalancedFooter() {
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";
  const addressAr= process.env.NEXT_PUBLIC_ADDRESS_AR
  const addressEn= process.env.NEXT_PUBLIC_ADDRESS_EN
  const phoneNum=process.env.NEXT_PUBLIC_PHONE_NUMBER

  const translations = {
    en: {
      description:
        "We help businesses grow through smart digital solutions, combining strategy, design, and technology to deliver real results.",
      modules: "Solutions",
      backend: "Backend Systems",
      alpha: "Production",
      cloud: "Cloud & Security",
      web3: "Innovation Lab",
      initiate: "Start Project",
      important: "Important Links",
      about: "About Us",
      home:"Home",
      alphaLink: "Alpha Production",
      tech: "Nuremberg Tech",
      contact: "Contact",
      emailLabel: "Email",
      phoneLabel: "Phone",
      locationLabel: "Location",
      uptime: "Reliability",
      latency: "Performance",
      station: "Office",
      location: addressEn,
      network: "Live Environment",
      kernel: "System Version",
      email: process.env.NEXT_PUBLIC_EMAIL || process.env.NEXT_PUBLIC_Email || "hello@ntech.pro",
      phone: "+962 7 9000 0000",
    },
    ar: {
      description:
        "نساعد الشركات على النمو من خلال حلول رقمية ذكية، تجمع بين الاستراتيجية والتصميم والتقنية لتحقيق نتائج حقيقية.",
      modules: "الحلول",
      backend: "أنظمة الخلفية",
      alpha: "الإنتاج",
      cloud: "السحابة والأمان",
      web3: "مختبر الابتكار",
      initiate: "ابدأ مشروعك",
      important: "روابط مهمة",
      about: "من نحن",
      home:"الرئيسية",
      alphaLink: "ألفا للإنتاج",
      tech: "نورمبرغ تك",
      contact: "التواصل",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      locationLabel: "الموقع",
      uptime: "الاعتمادية",
      latency: "الأداء",
      station: "المكتب",
      location: addressAr,
      network: "بيئة التشغيل",
      kernel: "إصدار النظام",
      email: process.env.NEXT_PUBLIC_EMAIL || process.env.NEXT_PUBLIC_Email || "hello@ntech.pro",
      phone: "+962 7 9000 0000",
    },
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

 // const modules = [t.backend, t.alpha, t.cloud, t.web3];

  return (
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
                {locale==="en" ?"Nuremberg Group":"مجموعة نورمبغ"}
              </span>
              <span className="text-[9px] font-mono text-cyan-500/60 tracking-[0.3em] uppercase">
                {locale==="en"?"Tech_Evolution":"تطور التكنولوجيا"}
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

       
        {/* IMPORTANT LINKS */}
        <div className="md:col-span-3 p-10 md:p-16">
          <h4 className="text-cyan-500/50 text-[10px] font-black uppercase tracking-[0.5em] mb-10">
            {t.important}
          </h4>

          <ul className="space-y-6">
             <li className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer break-words">
              <Link href="/home">{t.home}</Link>
            </li>
            <li className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer break-words">
              <Link href="/about-us">{t.about}</Link>
            </li>
            <li className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer break-words">
              <Link href="/alpha-production">{t.alphaLink}</Link>
            </li>
            <li className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer break-words">
              <Link href="/nuremberg-tech">{t.tech}</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-4 py-10 md:py-16 flex flex-col justify-between">
          <div>
            <h4 className="text-cyan-500/50 text-[10px] font-black uppercase tracking-[0.5em] mb-10">
              {t.initiate}
            </h4>

            <a
              href={`mailto:${t.email}`}
              className="inline-flex items-start gap-3 group"
            >
              <span className="text-lg md:text-xl font-black uppercase italic tracking-tighter break-words group-hover:text-cyan-500 transition-colors">
                {t.email}
              </span>
              <ArrowUpRight
                className="mt-1 text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                size={20}
              />
            </a>

            <div className="mt-6 space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-3 break-words">
                <Mail size={14} className="text-cyan-500" />
                <a href={`mailto:${t.email}`} className="hover:text-white">
                  {t.email}
                </a>
              </div>

              <div className="flex items-center gap-3 break-words">
                <Phone size={14} className="text-cyan-500" />
                <a href={`tel:${phoneNum}` }className="hover:text-white">
                  {t.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 break-words">
                <MapPin size={14} className="text-cyan-500" />
                <span>{t.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-8">
          
            <div className="flex items-center justify-between gap-4">
            
              <button
                onClick={scrollToTop}
                className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-xl hover:bg-cyan-500 hover:text-black transition-all duration-500"
                aria-label="Scroll to top"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </footer>
  );
}

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-500 cursor-pointer rounded-xl">
    {icon}
  </div>
);

