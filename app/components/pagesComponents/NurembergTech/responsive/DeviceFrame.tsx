"use client";

import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
  type: "desktop" | "laptop" | "tablet" | "phone";
  active: boolean;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, type, active, className = "" }) => {
  // أزلنا الـ opacity المنخفضة جداً والـ scale الصغير لنسمح للـ ScrollTrigger بالتحكم بها
  const baseClass = `transition-all duration-700 ${active ? 'opacity-100' : 'opacity-40'} ${className}`;

  // Desktop Frame
  if (type === "desktop") {
    return (
      <div className={`flex flex-col items-center w-full max-w-[800px] mx-auto ${baseClass}`}>
        {/* جسم الشاشة */}
        <div className="relative w-full aspect-video bg-[#121212] rounded-[1.5rem] p-[1.5%] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/5">
          <div className="relative w-full h-full overflow-hidden bg-[#050505] rounded-lg border border-white/5">
            {children}
          </div>
        </div>
        {/* قاعدة الشاشة - تظهر فقط في الشاشات الأكبر لتقليل الفوضى في الموبايل */}
        <div className="hidden md:flex flex-col items-center w-full">
          <div className="w-20 h-10 bg-[#1a1a1a] shadow-inner" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }} />
          <div className="w-44 h-1.5 bg-[#222] rounded-full shadow-2xl" />
        </div>
      </div>
    );
  }

  // Laptop Frame
  if (type === "laptop") {
    return (
      <div className={`relative w-full max-w-[650px] mx-auto ${baseClass}`}>
        {/* الشاشة العلوية */}
        <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] border-[6px] md:border-[10px] border-[#222] rounded-t-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
          <div className="relative w-full h-full overflow-hidden bg-[#080808]">
            {children}
          </div>
        </div>
        {/* قاعدة اللابتوب */}
        <div className="relative w-[112%] h-3 bg-gradient-to-b from-[#333] to-black -ml-[6%] rounded-b-xl border-t border-white/10 shadow-xl" />
        {/* تجويف الفتح */}
        <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-16 h-1 bg-black/50 rounded-t-sm" />
      </div>
    );
  }

  // Tablet Frame
  if (type === "tablet") {
    return (
      <div className={`relative w-full max-w-[320px] aspect-[3/4.2] bg-[#0f0f0f] border-[8px] md:border-[12px] border-[#1a1a1a] rounded-[2.5rem] md:rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] overflow-hidden ring-1 ring-white/10 mx-auto ${baseClass}`}>
        <div className="relative w-full h-full overflow-hidden bg-[#050505] rounded-[1.8rem] md:rounded-[2.2rem]">
          {children}
        </div>
        {/* زر الهوم الوهمي أو الحساس */}
        <div className="absolute right-[-2px] top-20 w-[3px] h-12 bg-white/5 rounded-l-md" />
      </div>
    );
  }

  // Phone Frame
  return (
    <div className={`relative w-full max-w-[200px] aspect-[9/19] bg-[#0c0c0c] border-[6px] md:border-[9px] border-[#1f1f1f] rounded-[2.5rem] md:rounded-[3.2rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] overflow-hidden ring-1 ring-white/20 mx-auto ${baseClass}`}>
      <div className="relative w-full h-full overflow-hidden bg-[#050505] rounded-[2rem] md:rounded-[2.6rem]">
        {children}
      </div>
      {/* الـ Dynamic Island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 md:w-16 h-4 md:h-5 bg-black rounded-full z-40 border border-white/5 shadow-inner flex items-center justify-center">
        <div className="w-1 h-1 bg-white/5 rounded-full ml-auto mr-3" />
      </div>
    </div>
  );
};