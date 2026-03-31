import React from "react";

interface Stage {
  title1: string;
  title2: string;
  desc: string;
}

interface StageHeaderProps {
  stage: Stage;
  index: number;
  isAr:Boolean
}

export const StageHeader: React.FC<StageHeaderProps> = ({ stage, index,isAr}) => (
  <div className="relative z-50 w-full px-6 pointer-events-none flex flex-col items-center justify-center">
    
    <div className="inline-flex items-center gap-4 mb-4 opacity-50 shrink-0">
      <div className="h-[1px] w-8 md:w-12 bg-cyan-400" />
      <span className="text-cyan-400 font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-bold italic">
  {isAr ? `الوحدة_0${index + 1}` : `Module_0${index + 1}`}
</span>
      <div className="h-[1px] w-8 md:w-12 bg-cyan-400" />
    </div>

    <div className="relative flex flex-col items-center">
      <h2 
        className="text-4xl md:text-7xl lg:text-8xl font-[1000] italic tracking-tighter uppercase leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-700 text-center flex gap-2 justify-center"
      >
        <span className="text-white">{stage.title1}</span>
        <span className="text-cyan-400">{stage.title2}</span>
      </h2>
      
      <p className="text-white/40 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] mt-4 max-w-[90%] md:max-w-xl mx-auto text-center leading-relaxed italic">
        {stage.desc}
      </p>
    </div>

  </div>
);