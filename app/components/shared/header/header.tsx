"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Shield, Box, Zap, Command, Home, Aperture, X } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import DigitalClock from "./DigitalClock";
import LanguageSwitcher from "../../language-switcher";

export default function CameraCyberNavbar() {
  const locale = useLocale();
  const [zoom, setZoom] = useState(1.0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Zoom effect
  useEffect(() => {
    const interval = setInterval(() => {
      setZoom((prev) => +(1.0 + Math.random() * 0.05).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      const frame = requestAnimationFrame(() => setIsMenuOpen(false));
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname]);

  // Navigation items
  const navItems = [
    { name: locale === "ar" ? "الرئيسية" : "Home", link: "/", icon: <Home className="group-hover:scale-125 transition-transform duration-700" size={14} /> },
    { name: locale === "ar" ? "معلومات عنا" : "About Us", link: "/about-us", icon: <Zap className="group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-700" size={14} /> },
    { name: locale === "ar" ? "ألفا برودكشن" : "Alpha Production", link: "/alpha-production", icon: <Aperture className="group-hover:-rotate-180 transition-transform duration-700" size={14} /> },
    { name: locale === "ar" ? "نورمبرغ تك" : "Nuremberg Tech", link: "/nuremberg-tech", icon: <Box className="group-hover:-translate-y-0.5 transition-transform duration-700" size={14} /> },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-6">
      {/* Corner borders */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40" />

      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto relative z-[70]">
        {/* Left: Logo + REC */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-11 h-11 flex items-center justify-center border border-white/10 bg-black/60 backdrop-blur-md p-1 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/favicon.ico" alt="Alpha Logo" className="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="hidden sm:flex flex-col leading-4">
              <span className="text-white text-[11px] font-black uppercase tracking-tighter italic">Nuremberg</span>
              <span className="text-cyan-500 text-[11px] font-mono tracking-[0.2em] uppercase opacity-80">Group</span>
            </div>
          </Link>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 px-4 flex items-center gap-3 relative overflow-hidden h-11">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]" />
            <span className="text-white font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 font-black">
              {locale === "ar" ? "تسجيل" : "REC"} <span className="text-gray-500">|</span> <span className="text-cyan-500">PROT_01</span>
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center bg-black/60 backdrop-blur-2xl border border-cyan-500/30 rounded-full px-2 py-1.5 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          {navItems.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={item.name}
                href={item.link}
                className={`relative group flex items-center gap-2 px-5 py-2 font-mono text-[10px] uppercase tracking-tighter transition-all duration-500 rounded-full 
                  ${isActive ? "text-cyan-400 bg-cyan-500/15 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]" : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"}`}
              >
                <span className={`${isActive ? "text-cyan-400 drop-shadow-[0_0_5px_#06b6d4]" : ""}`}>{item.icon}</span>
                {item.name}
                {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" />}
              </Link>
            );
          })}
        </nav>

        {/* Right panel */}
        <div className="hidden lg:flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/10 p-2 px-6 h-11">
          <div className="border-r border-white/10 pr-4">
            <LanguageSwitcher />
          </div>

          <div className="flex flex-col items-start border-r border-white/10 pr-4">
            <span className="text-[8px] text-gray-500 font-mono italic uppercase font-bold">{locale === "ar" ? "الساعة" : "Clock"}</span>
            <span className="text-[10px] text-white font-mono leading-none tracking-tighter font-black"><DigitalClock /></span>
          </div>

          <div className="flex flex-col items-start border-r border-white/10 pr-4">
            <span className="text-[8px] text-gray-500 font-mono italic uppercase font-bold">{locale === "ar" ? "تكبير" : "ZOOM"}</span>
            <span className="text-[10px] text-cyan-500 font-mono tracking-tighter transition-all leading-none font-black">x{zoom}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[8px] text-gray-500 font-mono uppercase italic font-bold">{locale === "ar" ? "الحالة" : "Status"}</span>
            <span className="text-[10px] text-cyan-500 font-mono animate-pulse tracking-widest leading-none font-black">{locale === "ar" ? "مباشر" : "LIVE"}</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2 pointer-events-auto">
          <div className="scale-75 origin-right">
             <LanguageSwitcher />
          </div>
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-11 h-11 border border-cyan-500/50 flex items-center justify-center cursor-pointer bg-black/40 text-cyan-500 active:bg-cyan-500/20 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : (
              <div className="flex flex-col gap-1">
                <div className="w-5 h-[2px] bg-cyan-500" />
                <div className="w-3 h-[2px] bg-cyan-500 self-end" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-[#020202]/95 backdrop-blur-[40px] transition-all duration-700 md:hidden pointer-events-auto z-[65] overflow-hidden ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        
        {/* Animated background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
            <div className="absolute w-[80vw] h-[80vw] border border-cyan-500/20 rounded-full animate-[ping_4s_linear_infinite]" />
            <div className="absolute w-[60vw] h-[60vw] border border-cyan-500/10 rounded-full animate-[ping_6s_linear_infinite]" />
            <div className="absolute w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent rotate-45 animate-[pulse_3s_infinite]" />
            <div className="absolute w-[1px] h-[100vh] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent animate-[pulse_3s_infinite]" />
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 space-y-10">
          <div className="flex flex-col items-center mb-8 animate-pulse">
             <span className="text-[10px] text-cyan-500 font-mono tracking-[0.6em] uppercase">{locale === "ar" ? "جارٍ التهيئة..." : "Initializing_Link..."}</span>
             <div className="h-[1px] w-32 bg-cyan-500/50 mt-2" />
          </div>

          <nav className="flex flex-col items-center gap-10">
            {navItems.map((item, idx) => (
              <Link
                key={item.name}
                href={item.link}
                className={`group flex items-center flex-col gap-2 transition-all duration-300 ${pathname === item.link ? "scale-110" : "hover:scale-105"}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-mono transition-colors ${pathname === item.link ? "text-cyan-500" : "text-white/20"}`}>
                    [0{idx + 1}]
                  </span>
                  <span className={`text-3xl font-[1000] uppercase italic tracking-tighter transition-all duration-500 ${pathname === item.link ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" : "text-white/40 group-hover:text-white"}`}>
                    {item.name}
                  </span>
                </div>
                {pathname === item.link && (
                  <div className="h-[2px] w-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-pulse" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}