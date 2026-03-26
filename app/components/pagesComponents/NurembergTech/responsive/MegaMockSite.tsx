"use client";

import React from "react";
import { 
  Cpu, Globe, Shield, Zap, BarChart3, 
  Users,  CheckCircle2, ArrowRight, 
  Layers, MousePointer2, Code2
} from "lucide-react";

export const MegaMockSite: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-white text-slate-900 selection:bg-cyan-100">
      
      {/* --- 1. Hero Section --- */}
      <section className="relative min-h-[85cqh] flex flex-col items-center justify-center text-center px-[6cqw] py-[12cqh] border-b border-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f0f9ff_0%,#ffffff_70%)] -z-10" />
        
        {/* Badge */}
        <div className="inline-flex items-center gap-[1.5cqw] px-[3cqw] py-[0.8cqh] bg-slate-900 text-white rounded-full mb-[5cqh] shadow-2xl">
          <div className="w-[1.2cqw] h-[1.2cqw] bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
          <span className="text-[1.3cqw] font-bold uppercase tracking-[0.2em]">Next-Gen Deployment v4.0</span>
        </div>

        <h1 className="text-[8cqw] font-[1000] tracking-tighter leading-[0.9] uppercase italic mb-[4cqh] max-w-[80cqw]">
          Scale Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Digital Assets</span>
        </h1>
        
        <p className="text-[2.2cqw] text-slate-500 max-w-[50cqw] mx-auto mb-[8cqh] leading-relaxed">
          The ultimate interface for high-performance cloud ecosystems. Real-time neural monitoring, edge-link security, and aesthetic mastery in one terminal.
        </p>

        <div className="flex flex-col @[500px]:flex-row gap-[2.5cqw] w-full max-w-[50cqw]">
          <button className="flex-1 h-[7cqh] bg-slate-950 text-white rounded-[2cqw] text-[1.8cqw] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-[1.5cqw]">
            Get Started <ArrowRight size={14} className="w-[2cqw] h-[2cqw]" />
          </button>
          <button className="flex-1 h-[7cqh] border-2 border-slate-100 rounded-[2cqw] text-[1.8cqw] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
            Watch Demo
          </button>
        </div>
      </section>

      {/* --- 2. Trust Bar / Logos --- */}
      <div className="py-[4cqh] border-b border-slate-50 flex flex-wrap justify-center gap-[6cqw] opacity-30 grayscale contrast-125 px-[4cqw]">
        {["SpaceX", "Neuralink", "OpenAI", "Stripe"].map((logo) => (
          <span key={logo} className="text-[2.5cqw] font-black italic uppercase tracking-tighter">{logo}</span>
        ))}
      </div>

      {/* --- 3. Core Features (The Bento Box) --- */}
      <section className="py-[12cqh] px-[5cqw]">
        <div className="flex flex-col items-center mb-[8cqh]">
          <h2 className="text-[3.5cqw] font-black uppercase italic tracking-tighter">Core Infrastructure</h2>
          <div className="h-[0.5cqh] w-[8cqw] bg-cyan-500 mt-[1cqh]" />
        </div>

        <div className="grid grid-cols-1 @[600px]:grid-cols-2 @[1000px]:grid-cols-3 gap-[3cqw]">
          {/* Card 1 */}
          <div className="@[600px]:col-span-2 p-[5cqw] rounded-[4cqw] bg-slate-50 border border-slate-100 flex flex-col justify-between h-[35cqh] group overflow-hidden relative">
            <div className="absolute right-0 top-0 p-[4cqw] opacity-5">
              <Layers size={120} className="w-[15cqw] h-[15cqw]" />
            </div>
            <div className="bg-white w-[8cqw] h-[8cqw] rounded-[2cqw] flex items-center justify-center shadow-sm">
              <Cpu className="text-cyan-500 w-[4cqw] h-[4cqw]" />
            </div>
            <div>
              <h3 className="text-[3cqw] font-black uppercase italic">Advanced Neural Core</h3>
              <p className="text-[1.8cqw] text-slate-400 mt-[1cqh] max-w-[40cqw]">AI-driven optimization that predicts load spikes before they happen.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-[5cqw] rounded-[4cqw] bg-slate-900 text-white flex flex-col justify-between h-[35cqh] shadow-2xl">
            <div className="bg-white/10 w-[8cqw] h-[8cqw] rounded-[2cqw] flex items-center justify-center">
              <Zap className="text-cyan-400 w-[4cqw] h-[4cqw]" />
            </div>
            <h3 className="text-[2.5cqw] font-black uppercase leading-tight tracking-tight">Zero Latency <br/>Edge Network</h3>
          </div>

          {/* Card 3 */}
          <div className="p-[5cqw] rounded-[4cqw] bg-cyan-500 text-white flex flex-col justify-between h-[35cqh] shadow-xl shadow-cyan-100">
            <div className="bg-white/20 w-[8cqw] h-[8cqw] rounded-[2cqw] flex items-center justify-center">
              <Shield className="w-[4cqw] h-[4cqw]" />
            </div>
            <h3 className="text-[2.5cqw] font-black uppercase leading-tight tracking-tight">Military-Grade <br/>Encryption</h3>
          </div>

          {/* Card 4 (Small) */}
          <div className="p-[5cqw] rounded-[4cqw] border-2 border-slate-50 flex flex-col justify-between h-[35cqh] hover:border-cyan-100 transition-colors">
            <div className="bg-slate-50 w-[8cqw] h-[8cqw] rounded-[2cqw] flex items-center justify-center">
              <Code2 className="text-slate-400 w-[4cqw] h-[4cqw]" />
            </div>
            <h3 className="text-[2.2cqw] font-black uppercase">Open API <br/>Standards</h3>
          </div>
        </div>
      </section>

      {/* --- 4. Stats Section --- */}
      <section className="py-[10cqh] bg-slate-950 text-white mx-[3cqw] rounded-[5cqw] px-[8cqw] relative">
        <div className="grid grid-cols-2 @[800px]:grid-cols-4 gap-[6cqw]">
          {[
            { l: "Uptime", v: "99.9%", i: <Zap /> },
            { l: "Global Nodes", v: "1.2k", i: <Globe /> },
            { l: "Throughput", v: "85TB/s", i: <BarChart3 /> },
            { l: "Developers", v: "250k", i: <Users /> },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-[1cqh]">
              <div className="text-cyan-400 w-[3cqw] h-[3cqw] mb-[1cqh]">{s.i}</div>
              <div className="text-[4.5cqw] font-[1000] tracking-tighter">{s.v}</div>
              <div className="text-[1.4cqw] uppercase tracking-[0.3em] text-white/30">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. Selected Projects --- */}
      <section className="py-[15cqh] px-[6cqw]">
        <div className="flex justify-between items-end mb-[8cqh]">
          <div className="space-y-[1cqh]">
            <p className="text-cyan-500 font-mono text-[1.4cqw] uppercase tracking-widest"> Portfolios</p>
            <h2 className="text-[4.5cqw] font-black uppercase italic tracking-tighter">Case Terminals</h2>
          </div>
          <button className="text-[1.6cqw] font-black uppercase border-b-2 border-slate-900 pb-1">View All</button>
        </div>

        <div className="grid grid-cols-1 @[700px]:grid-cols-2 gap-[4cqw]">
          {[1, 2].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-[3.5cqw] overflow-hidden bg-slate-100 ring-1 ring-slate-200 relative">
                <img 
                  src={`https://picsum.photos/1200/800?random=${i + 15}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                  alt="work" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-[5cqw] flex flex-col justify-end">
                   <p className="text-cyan-400 font-mono text-[1.2cqw] mb-2">PROJECT_ALPHA_{i}</p>
                   <h4 className="text-white text-[3cqw] font-black uppercase">Infrastructure Sync</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 6. Pricing --- */}
      <section className="py-[12cqh] px-[6cqw] bg-slate-50">
        <div className="max-w-[45cqw] mx-auto text-center mb-[8cqh]">
          <h2 className="text-[4cqw] font-black uppercase italic mb-[2cqh]">Flexible Licensing</h2>
          <p className="text-[1.8cqw] text-slate-500">Pay only for the throughput you actually use. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 @[800px]:grid-cols-2 gap-[3cqw] max-w-[80cqw] mx-auto">
          {/* Pro Plan */}
          <div className="bg-white p-[6cqw] rounded-[4cqw] shadow-xl border-2 border-cyan-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cyan-500 text-white px-[3cqw] py-[1cqh] rounded-bl-[2cqw] text-[1.2cqw] font-black uppercase">Best Value</div>
            <h3 className="text-[2.5cqw] font-black uppercase italic mb-[4cqh]">Advanced Terminal</h3>
            <div className="flex items-baseline gap-1 mb-[4cqh]">
              <span className="text-[6cqw] font-[1000] tracking-tighter text-slate-950">$89</span>
              <span className="text-[2cqw] text-slate-400">/mo</span>
            </div>
            <ul className="space-y-[2.5cqh] mb-[6cqh]">
              {["Unlimited Edge Nodes", "24/7 Neural Support", "Priority Global CDN", "Custom API Access"].map(t => (
                <li key={t} className="flex items-center gap-[1.5cqw] text-[1.7cqw] font-bold text-slate-600">
                  <CheckCircle2 size={16} className="text-cyan-500 w-[2.2cqw] h-[2.2cqw]" /> {t}
                </li>
              ))}
            </ul>
            <button className="w-full py-[2.5cqh] bg-slate-950 text-white rounded-[2.5cqw] text-[1.8cqw] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Select Plan</button>
          </div>

          {/* Basic Plan */}
          <div className="bg-white/50 p-[6cqw] rounded-[4cqw] border-2 border-slate-100 flex flex-col justify-between">
            <div>
              <h3 className="text-[2.5cqw] font-black uppercase italic mb-[4cqh]">Entry Node</h3>
              <div className="flex items-baseline gap-1 mb-[4cqh]">
                <span className="text-[6cqw] font-[1000] tracking-tighter text-slate-950">$29</span>
                <span className="text-[2cqw] text-slate-400">/mo</span>
              </div>
              <ul className="space-y-[2.5cqh] mb-[6cqh]">
                {["10 Global Nodes", "Email Support", "Standard CDN"].map(t => (
                  <li key={t} className="flex items-center gap-[1.5cqw] text-[1.7cqw] font-bold text-slate-400">
                    <CheckCircle2 size={16} className="text-slate-300 w-[2.2cqw] h-[2.2cqw]" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-[2.5cqh] border-2 border-slate-900 text-slate-900 rounded-[2.5cqw] text-[1.8cqw] font-black uppercase tracking-widest active:scale-95 transition-all">Start Free Trial</button>
          </div>
        </div>
      </section>

      {/* --- 7. Footer --- */}
      <footer className="bg-white pt-[15cqh] pb-[8cqh] px-[8cqw] border-t border-slate-50">
        <div className="grid grid-cols-2 @[800px]:grid-cols-4 gap-[8cqw] mb-[12cqh]">
          <div className="col-span-2 @[800px]:col-span-1 space-y-[4cqh]">
            <div className="w-[8cqw] h-[8cqw] bg-slate-950 rounded-[2.5cqw] flex items-center justify-center rotate-45">
              <div className="w-[3cqw] h-[3cqw] bg-cyan-400 rounded-sm" />
            </div>
            <p className="text-[1.6cqw] text-slate-400 leading-relaxed max-w-[20cqw]">Architecting the neural interfaces of tomorrow.</p>
          </div>
          {["Product", "Company", "Social"].map((cat) => (
            <div key={cat} className="space-y-[3cqh]">
              <h4 className="text-[1.8cqw] font-black uppercase">{cat}</h4>
              <ul className="space-y-[1.5cqh] text-[1.5cqw] text-slate-400 font-bold">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col @[600px]:flex-row justify-between items-center gap-[4cqh] pt-[4cqh] border-t border-slate-50">
          <p className="text-[1.2cqw] font-mono text-slate-300 uppercase tracking-[0.5em]">© 2026 Nuremberg Tech // End of Line</p>
          <div className="flex gap-[4cqw]">
             <MousePointer2 size={16} className="text-slate-200 w-[2.5cqw] h-[2.5cqw]" />
             <div className="h-[2.5cqw] w-[1px] bg-slate-100" />
             <span className="text-[1.2cqw] font-black text-slate-200 uppercase tracking-widest">Global Status: Online</span>
          </div>
        </div>
      </footer>

    </div>
  );
};