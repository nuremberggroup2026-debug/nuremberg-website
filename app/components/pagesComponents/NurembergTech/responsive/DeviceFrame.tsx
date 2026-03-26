import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
  type: "desktop" | "laptop" | "tablet" | "phone";
  active: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, type, active }) => {
  const baseClass = `transition-all duration-700 ${active ? 'scale-105 opacity-100' : 'scale-95 opacity-20'}`;

  if (type === "desktop") {
    return (
      <div className={`hidden lg:flex flex-col items-center w-1/3 mb-10 ${baseClass}`}>
        <div className="relative w-full aspect-video bg-[#151515] rounded-2xl p-3 border border-white/5 shadow-2xl overflow-hidden ring-1 ring-white/10">
          <div className="relative w-full h-full overflow-hidden bg-white rounded-lg">{children}</div>
        </div>
        <div className="w-20 h-14 bg-zinc-800" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }} />
        <div className="w-40 h-1 bg-zinc-700 rounded-full shadow-lg" />
      </div>
    );
  }

  if (type === "laptop") {
    return (
      <div className={`relative w-1/3 mb-4 hidden md:block ${baseClass}`}>
        <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] border-[10px] border-[#222] rounded-t-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
          <div className="relative w-full h-full overflow-hidden bg-zinc-50">{children}</div>
        </div>
        <div className="w-[110%] h-3 bg-gradient-to-b from-zinc-700 to-black -ml-[5%] rounded-b-lg border-t border-white/10 shadow-xl" />
      </div>
    );
  }

  if (type === "tablet") {
    return (
      <div className={`relative w-40 md:w-52 aspect-[3/4.2] bg-[#0f0f0f] border-[10px] border-[#1a1a1a] rounded-[2.8rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden mb-3 ring-1 ring-white/20 ${baseClass}`}>
        <div className="relative w-full h-full overflow-hidden bg-white rounded-[2rem]">{children}</div>
      </div>
    );
  }

  return (
    <div className={`relative w-28 md:w-34 h-[220px] md:h-[280px] bg-[#0c0c0c] border-[7px] border-[#1f1f1f] rounded-[2.8rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] overflow-hidden mb-1 shrink-0 ring-1 ring-white/20 ${baseClass}`}>
      <div className="relative w-full h-full overflow-hidden bg-white rounded-[2.3rem]">{children}</div>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 md:w-12 h-4 bg-black rounded-full z-40 border border-white/5 shadow-inner" />
    </div>
  );
};