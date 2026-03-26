
import React from "react";
import { MegaMockSite } from "@/app/components/pagesComponents/NurembergTech/responsive/MegaMockSite";

interface MockDeviceCanvasProps {
  children?: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  title?: string;
}

export const MockDeviceCanvas: React.FC<MockDeviceCanvasProps> = ({ 
  children, 
  className = "", 
  showHeader = true,
  title = "System Terminal"
}) => {
  return (
 
    <div className={`
      w-full h-full flex flex-col bg-white font-sans text-slate-900 
      overflow-x-hidden selection:bg-cyan-100 @container/device
      ${className}
    `}>
      
   
      {showHeader && (
        <nav className="w-full h-8 @[400px]:h-12 px-3 flex items-center justify-between border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-[100] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[7px] @[400px]:text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">
              {title}
            </span>
          </div>
          <div className="hidden @[300px]:flex bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
             <span className="text-[5px] @[400px]:text-[8px] text-slate-300 font-mono tracking-tight">nexus.v4</span>
          </div>
        </nav>
      )}

      <main className="flex-1 w-full relative overflow-y-auto overflow-x-hidden">
     
        <div className="text-[2.5cqw] @[500px]:text-[14px] @[800px]:text-base">
          {children}
          <MegaMockSite />
        </div>
      </main>

    </div>
  );
};