"use client";

import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
  type: "desktop" | "laptop" | "tablet" | "phone";
  active: boolean;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, type, active, className = "" }) => {
  const activeClass = active ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.96]';
  
  // إعدادات هندسية ثابتة لكل جهاز لضمان الواقعية
  const specs = {
    phone: {
      aspect: "aspect-[9/19.5]",
      maxWidth: "max-w-[280px]",
      maxHeight: "max-h-[85vh]",
      border: "border-[clamp(6px,1.2cqw,10px)]",
      radius: "rounded-[clamp(2.5rem,5cqw,3.5rem)]",
      innerRadius: "rounded-[clamp(2rem,4.2cqw,3rem)]"
    },
    tablet: {
      aspect: "aspect-[3/4]",
      maxWidth: "max-w-[450px]",
      maxHeight: "max-h-[80vh]",
      border: "border-[clamp(8px,1.5cqw,14px)]",
      radius: "rounded-[clamp(2rem,4cqw,3rem)]",
      innerRadius: "rounded-[clamp(1.6rem,3.4cqw,2.6rem)]"
    },
    laptop: {
      aspect: "aspect-[16/10]",
      maxWidth: "max-w-[850px]",
      maxHeight: "max-h-[70vh]",
      border: "border-[clamp(6px,1cqw,12px)]",
      radius: "rounded-t-[clamp(1rem,2cqw,1.8rem)]"
    },
    desktop: {
      aspect: "aspect-video",
      maxWidth: "max-w-[1000px]",
      maxHeight: "max-h-[75vh]",
      border: "border-[clamp(8px,1cqw,15px)]",
      radius: "rounded-[clamp(1.5rem,2.5cqw,2rem)]"
    }
  };

  // --- 1. Desktop Frame ---
  if (type === "desktop") {
    return (
      <div className={`flex flex-col items-center w-full mx-auto transition-all duration-1000 ease-in-out ${activeClass} ${className}`}>
        <div className={`relative w-full ${specs.desktop.maxWidth} ${specs.desktop.aspect} ${specs.desktop.maxHeight} bg-[#1a1a1a] ${specs.desktop.radius} p-[1%] ${specs.desktop.border} border-[#222] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 overflow-hidden`}>
          <div className="relative w-full h-full overflow-hidden bg-[#050505] rounded-[0.8rem] border border-black/40">
            {children}
          </div>
        </div>
        {/* Stand */}
        <div className="flex flex-col items-center w-full -mt-[1px]">
          <div className="w-[12%] h-[5vh] bg-[#1a1a1a] shadow-xl" style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }} />
          <div className="w-[30%] h-[8px] bg-[#222] rounded-full shadow-2xl border-t border-white/5" />
        </div>
      </div>
    );
  }

  // --- 2. Laptop Frame ---
  if (type === "laptop") {
    return (
      <div className={`relative w-full mx-auto transition-all duration-1000 ease-in-out ${activeClass} ${className}`}>
        <div className={`relative w-full ${specs.laptop.maxWidth} ${specs.laptop.aspect} ${specs.laptop.maxHeight} mx-auto bg-[#151515] ${specs.laptop.border} border-[#222] ${specs.laptop.radius} shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/5 z-20`}>
          <div className="relative w-full h-full bg-[#080808] overflow-hidden">{children}</div>
        </div>
        {/* Base */}
        <div className="relative w-full max-w-[950px] h-[1.5vh] bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] mx-auto rounded-b-2xl border-t border-white/10 shadow-2xl z-10" />
      </div>
    );
  }

  // --- 3. Tablet Frame ---
  if (type === "tablet") {
    return (
      <div className={`relative w-full ${specs.tablet.maxWidth} ${specs.tablet.aspect} ${specs.tablet.maxHeight} bg-[#0f0f0f] ${specs.tablet.border} border-[#1a1a1a] ${specs.tablet.radius} shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10 mx-auto transition-all duration-1000 ease-in-out ${activeClass} ${className}`}>
        <div className={`relative w-full h-full overflow-hidden bg-[#050505] ${specs.tablet.innerRadius} border border-black/50`}>
          {children}
        </div>
      </div>
    );
  }

  // --- 4. Phone Frame ---
  return (
    <div className={`relative w-full ${specs.phone.maxWidth} ${specs.phone.aspect} ${specs.phone.maxHeight} bg-[#0c0c0c] ${specs.phone.border} border-[#1a1a1a] ${specs.phone.radius} shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/15 mx-auto transition-all duration-1000 ease-in-out ${activeClass} ${className}`}>
      <div className={`relative w-full h-full overflow-hidden bg-[#050505] ${specs.phone.innerRadius} border border-black/80`}>
        {children}
      </div>
      {/* Dynamic Island */}
      <div className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[35%] h-[2.5%] bg-black rounded-full z-40 border border-white/5 shadow-inner" />
    </div>
  );
};