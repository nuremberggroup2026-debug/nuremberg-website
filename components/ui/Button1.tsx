import React, { ReactNode, ComponentPropsWithoutRef } from "react";

interface CancelButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  className?: string;
}

export default function Button1({
  children,
  className = "",
  ...props
}: CancelButtonProps) {
  return (
    <button
      className={`
        group/btn relative w-full md:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-300 transition-all
        active:scale-95  shadow-[0_5px_15px_rgba(0,0,0,0.05)]
        hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]
        hover:bg-gray-100
        ${className}
      `}
      {...props}
    >
      {/* Optional background pulse border */}
      <div className="absolute inset-0 pointer-events-none border border-gray-200 rounded-full scale-0 group-hover/btn:scale-100 transition-transform duration-1000 group-hover/btn:bg-gray-100/20 -z-10" />

      {/* Content */}
      <div className="flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-sm transition-all duration-500">
        <span>{children}</span>
      </div>
    </button>
  );
}