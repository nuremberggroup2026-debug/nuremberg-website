import React, { ReactNode, ComponentPropsWithoutRef } from "react";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";

interface FancyButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  locale?: "en" | "ar";
  arrow?: boolean; // whether to show arrow icon
  className?: string;
}

export default function Button2({
  children,
  locale = "en",
  arrow = true,
  className = "",
  ...props
}: FancyButtonProps) {
  return (
    <button
      className={`
        group/btn relative w-full md:w-auto px-8 py-3 bg-black text-cyan-600 transition-all 
        active:scale-95  shadow-[0_10px_20px_rgba(0,0,0,0.08)]
        hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]
        ${className}
      `}
      {...props}
    >
      {/* Background pulse border */}
      <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 rounded-full scale-0 group-hover/btn:scale-100 transition-transform duration-1000 group-hover/btn:bg-cyan-500/10 -z-10" />

      {/* Top-left animated border */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 
        group-hover/btn:w-full group-hover/btn:h-full group-hover/btn:border-cyan-500 group-hover/btn:animate-pulse transition-all duration-700" />

      {/* Bottom-right animated border */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 
        group-hover/btn:w-full group-hover/btn:h-full group-hover/btn:border-cyan-500 group-hover/btn:animate-pulse transition-all duration-700" />

      {/* Content */}
      <div className="flex items-center justify-center gap-4 font-black italic uppercase  text-cyan-400 text-base group-hover/btn:gap-6 transition-all duration-500">
        <span className="animate-pulse">{children}</span>

      </div>
    </button>
  );
}