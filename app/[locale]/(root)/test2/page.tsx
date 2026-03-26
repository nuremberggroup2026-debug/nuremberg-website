"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

// 1. تعريف الأنواع (Interfaces)
interface ProjectItem {
  id: string | number;
  title: string;
  imageUrl: string;
}

interface MockWebsiteContentProps {
  title: string;
  items: ProjectItem[];
}

// 2. المكون الأساسي
const MockWebsiteContent: React.FC<MockWebsiteContentProps> = ({ title, items }) => {
  return (
    <div className="w-full flex flex-col bg-white min-h-[400vh]">
      <nav className="w-full h-12 px-4 flex items-center justify-between border-b border-zinc-100 bg-white/90 backdrop-blur-md sticky top-0 z-10">
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-900">
          {title}
        </span>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>
      </nav>
      
      <div className="p-4 space-y-6">
        <div className="py-4 border-b border-zinc-50">
          <div className="w-6 h-[2px] bg-cyan-400 mb-3" />
          <h3 className="text-xl font-black text-black leading-tight tracking-tighter uppercase italic">
            The Collection
          </h3>
        </div>

        {items.map((project, index) => (
          <div 
            key={`${project.id}-${index}`} 
            className="group w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 transition-all hover:border-cyan-400/30"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="p-4 bg-white">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black text-black uppercase tracking-tight">
                  {project.title}
                </h4>
                <div className="w-4 h-4 rounded-full border border-zinc-100 flex items-center justify-center">
                   <ArrowUpRight size={8} className="text-zinc-400" />
                </div>
              </div>
              <p className="text-[8px] text-zinc-400 mt-1 font-mono">Build_v2.06</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. المكون الحاوي (Container) الذي يمرر البيانات
export default function Showcase() {
  const dummyItems: ProjectItem[] = [
    { id: 1, title: "Cyber-Motion 2026", imageUrl: "https://picsum.photos/800/600?random=1" },
    { id: 2, title: "Neon Sequence", imageUrl: "https://picsum.photos/800/600?random=2" },
    { id: 3, title: "Abstract Core", imageUrl: "https://picsum.photos/800/600?random=3" },
    { id: 4, title: "Future Frame", imageUrl: "https://picsum.photos/800/600?random=4" },
  ];

  return (
    <div className="w-full">
      <MockWebsiteContent 
        title="Portfolio_Main_Hub" 
        items={dummyItems} 
      />
    </div>
  );
}