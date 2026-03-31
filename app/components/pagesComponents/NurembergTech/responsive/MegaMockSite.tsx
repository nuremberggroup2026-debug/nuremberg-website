"use client";

import React from 'react';
import { Target, Zap, Cpu, Globe, MousePointer2, Layers, Lock, CheckCircle2 } from 'lucide-react';

/**
 * مكون البطاقة البنيوية - Infrastructure
 */
const InfraCard = ({ title, icon: Icon, children, connected }) => (
  <div className={`relative bg-black text-blue-400 p-[2.5cqw] rounded-[1.5cqw] border-[0.2cqw] ${connected ? 'border-blue-600' : 'border-black'} flex-1`}>
    {connected && (
      <div className="absolute top-0 left-0 right-0 h-[0.4cqh] bg-blue-600 rounded-t-[1.5cqw]"></div>
    )}
    <div className="flex items-start justify-between mb-[2cqh]">
      <h3 className="font-bold text-[1.4cqw] text-white leading-tight uppercase italic">{title}</h3>
      {Icon && <Icon className="w-[2.5cqw] h-[2.5cqw] text-blue-500" />}
    </div>
    <div className="text-[1.1cqw] text-slate-400 font-medium leading-relaxed">
      {children}
    </div>
  </div>
);

/**
 * مكون الإحصائيات مع الرسم البياني
 */
const StatItem = ({ label, value }) => (
  <div className="flex-1 text-center group">
    <div className="font-black text-[4.5cqw] mb-[1cqh] text-blue-400 italic tracking-tighter group-hover:scale-110 transition-transform">{value}</div>
    <div className="text-[1.1cqw] font-bold text-gray-500 mb-[2cqh] uppercase tracking-widest">{label}</div>
    <div className="flex gap-[0.4cqw] justify-center h-[3cqh] items-end">
      {[40, 70, 50, 90, 60, 85].map((h, i) => (
        <div key={i} style={{ height: `${h}%` }} className="w-[0.5cqw] rounded-full bg-blue-500/40"></div>
      ))}
    </div>
  </div>
);

export const MegaMockSite = () => {
  return (
    <div className="w-full min-h-screen bg-[#F0F4F8] text-[#121111] p-[4cqw] font-sans @container selection:bg-blue-500/20">
      
      {/* شبكة التقسيم الرئيسية (Main Grid) */}
      <div className="grid grid-cols-1 @[1100px]:grid-cols-[1.2fr,2fr] gap-[6cqw]">
        
        {/* --- العمود الأيسر (Left Column) --- */}
        <div className="flex flex-col gap-[8cqh]">
          
          {/* الـ Hero والبادج */}
          <div className="space-y-[4cqh] flex flex-col items-center">
            <div className="flex items-center gap-[1cqw] self-start">
              <div className="bg-black text-blue-500 p-[0.8cqw] rounded-full">
                <Target className="w-[1.5cqw] h-[1.5cqw]" />
              </div>
              <div className="bg-black text-blue-400 px-[2cqw] py-[0.8cqh] rounded-full text-[1cqw] font-black uppercase tracking-[0.2em]">
                Next-Gen Deployment v4.0
              </div>
            </div>
            
            <h1 className="font-[1000] text-[8.5cqw] leading-[0.85] tracking-tighter uppercase italic text-center w-full">
              Scale Your<br />
              <span className="text-[#0070F3] drop-shadow-sm whitespace-pre-wrap break-words">DIGITAL ASSETS</span>
            </h1>
            
            <p className="text-[1.8cqw] text-slate-600 max-w-[40cqw] leading-relaxed font-medium text-center">
               An engineering-first interface for complex neural-cloud asset management. 
               Dynamic scaling with blue-core infrastructure.
            </p>
          </div>
          
          {/* قسم البنية التحتية (Infrastructure) */}
          <section>
            <h2 className="font-black text-[2.5cqw] uppercase italic mb-[5cqh] border-l-[0.5cqw] border-blue-600 pl-[1.5cqw]">Core Infrastructure</h2>
            <div className="flex flex-col gap-[3cqh] relative">
              <div className="flex gap-[2cqw]">
                <InfraCard title="Neural Core" icon={Cpu}>Architecture mapping for large-scale inference nodes.</InfraCard>
                <InfraCard title="Edge Link" connected>Sub-millisecond data synchronization across global zones.</InfraCard>
              </div>
              <div className="flex gap-[2cqw] ml-[4cqw]">
                <InfraCard title="API Shield" icon={Lock} connected>Encryption layers optimized for high-throughput traffic.</InfraCard>
                <div className="flex-1 border-[0.2cqw] border-dashed border-slate-300 rounded-[1.5cqw] flex items-center justify-center">
                  <span className="text-[1.2cqw] font-bold text-slate-400 uppercase italic">Buffer_Zone_Alpha</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* الإحصائيات (Stats) */}
          <section className="bg-black p-[4cqw] rounded-[3cqw] shadow-2xl">
            <div className="flex justify-between items-end gap-[2cqw]">
              <StatItem label="Uptime" value="99.9%" />
              <StatItem label="Nodes" value="1.2k" />
              <StatItem label="Flow" value="85TB/s" />
              <StatItem label="Devs" value="250k" />
            </div>
          </section>

          {/* المشاريع (Selected Projects) */}
          <section>
             <h2 className="font-black text-[2.5cqw] uppercase italic mb-[4cqh]">Case Terminals</h2>
             <div className="grid grid-cols-3 gap-[2cqw]">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square bg-slate-200 border-[0.1cqw] border-slate-300 rounded-[1cqw] p-[1cqw] flex flex-col justify-between group cursor-pointer hover:bg-white transition-colors">
                    <div className="w-full h-[0.4cqh] bg-slate-300 rounded-full group-hover:bg-blue-500" />
                    <div className="text-[0.8cqw] font-mono text-slate-400 uppercase">Project_0x0{i}</div>
                  </div>
                ))}
             </div>
          </section>
        </div>
        
        {/* --- العمود الأيمن (Right Column) --- */}
        <div className="flex flex-col gap-[8cqh]">
          
          {/* التسعير (Pricing) */}
          <div className="grid grid-cols-2 gap-[3cqw]">
            <div className="bg-black text-white p-[5cqw] rounded-[4cqw] border-[0.3cqw] border-blue-600 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-blue-600 text-white px-[2cqw] py-[1cqh] text-[1.1cqw] font-black uppercase italic">Best Value</div>
               <div>
                  <h4 className="text-[1.5cqw] font-black uppercase tracking-widest text-blue-400 mb-[2cqh]">Advanced Terminal</h4>
                  <div className="flex items-baseline gap-[0.5cqw] mb-[5cqh]">
                    <span className="text-[6cqw] font-[1000] tracking-tighter">$89</span>
                    <span className="text-[1.5cqw] text-slate-500">/mo</span>
                  </div>
                  <ul className="space-y-[2cqh]">
                    {["Full Edge Access", "24/7 Neural Sync", "Global Distribution"].map(t => (
                      <li key={t} className="flex items-center gap-[1cqw] text-[1.3cqw] font-bold uppercase italic"><CheckCircle2 className="w-[1.8cqw] h-[1.8cqw] text-blue-500" /> {t}</li>
                    ))}
                  </ul>
               </div>
               <button className="w-full py-[2.5cqh] bg-blue-600 rounded-[1.5cqw] mt-[6cqh] text-[1.6cqw] font-black uppercase italic hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">Select Plan</button>
            </div>

            <div className="bg-white/50 border-[0.3cqw] border-slate-200 p-[5cqw] rounded-[4cqw] flex flex-col justify-between">
               <div>
                  <h4 className="text-[1.5cqw] font-black uppercase tracking-widest text-slate-400 mb-[2cqh]">Starter Node</h4>
                  <div className="flex items-baseline gap-[0.5cqw] mb-[5cqh]">
                    <span className="text-[6cqw] font-[1000] tracking-tighter">$39</span>
                    <span className="text-[1.5cqw] text-slate-400">/mo</span>
                  </div>
                  <ul className="space-y-[2cqh] opacity-50">
                    {["Limited Access", "Email Support", "Standard Nodes"].map(t => (
                      <li key={t} className="flex items-center gap-[1cqw] text-[1.3cqw] font-bold uppercase italic"><CheckCircle2 className="w-[1.8cqw] h-[1.8cqw]" /> {t}</li>
                    ))}
                  </ul>
               </div>
               <button className="w-full py-[2.5cqh] border-[0.3cqw] border-black rounded-[1.5cqw] mt-[6cqh] text-[1.6cqw] font-black uppercase italic hover:bg-black hover:text-white transition-all">Start Trial</button>
            </div>
          </div>

          {/* نظام الـ ZAP (ZAP System) */}
          <section className="bg-slate-200 p-[4cqw] rounded-[3cqw] border-[0.1cqw] border-slate-300">
             <h3 className="text-[2.2cqw] font-black uppercase italic mb-[4cqh] flex items-center gap-[1cqw]"><Zap className="w-[2.5cqw] h-[2.5cqw] text-blue-600" /> System_Diagnostic</h3>
             <div className="grid grid-cols-2 gap-[4cqw]">
                <div className="space-y-[3cqh]">
                   <div className="h-[12cqh] bg-white rounded-[1.5cqw] border-[0.1cqw] border-slate-300 p-[1.5cqw] flex flex-col justify-between">
                      <div className="w-[5cqw] h-[0.6cqh] bg-blue-600 rounded-full" />
                      <div className="text-[1cqw] font-mono font-bold uppercase text-slate-400">Internal_Core_Link</div>
                   </div>
                   <div className="grid grid-cols-2 gap-[1.5cqw]">
                      <div className="h-[8cqh] bg-blue-500/5 rounded-[1cqw] border-[0.1cqw] border-blue-500/10" />
                      <div className="h-[8cqh] bg-blue-500/5 rounded-[1cqw] border-[0.1cqw] border-blue-500/10" />
                   </div>
                </div>
                <div className="bg-white rounded-[2cqw] border-[0.1cqw] border-slate-300 p-[2cqw] relative overflow-hidden">
                   <Globe className="absolute -right-[2cqw] -bottom-[2cqw] w-[15cqw] h-[15cqw] text-slate-100" />
                   <div className="relative z-10 space-y-[2cqh]">
                      <div className="w-[2cqw] h-[2cqw] bg-blue-500 rounded-full animate-ping" />
                      <div className="text-[1.2cqw] font-black uppercase italic">Global_Node_Map</div>
                      <div className="w-2/3 h-[0.3cqh] bg-slate-100" />
                   </div>
                </div>
             </div>
          </section>

          {/* شريط الحالة السفلي (Status Bar) */}
          <footer className="bg-black text-white p-[3cqw] rounded-[2cqw] flex justify-between items-center mt-auto">
             <div className="flex items-center gap-[1.5cqw]">
                <div className="w-[1.2cqw] h-[1.2cqw] bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]" />
                <span className="text-[1.2cqw] font-black uppercase italic tracking-widest">Global Status: Online</span>
             </div>
             <div className="flex gap-[3cqw] opacity-40">
                <MousePointer2 className="w-[2cqw] h-[2cqw]" />
                <Layers className="w-[2cqw] h-[2cqw]" />
             </div>
             <div className="text-[1cqw] font-mono uppercase tracking-[0.3em] text-blue-500">Pulsing_System: v.4.0.0</div>
          </footer>

        </div>
      </div>
    </div>
  );
};