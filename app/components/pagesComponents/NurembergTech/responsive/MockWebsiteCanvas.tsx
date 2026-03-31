
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
      
   


      <main className="flex-1 w-full relative overflow-y-auto overflow-x-hidden">
     
        <div className="text-[2.5cqw] @[500px]:text-[14px] @[800px]:text-base">
          {children}
          <MegaMockSite />
        </div>
      </main>

    </div>
  );
};