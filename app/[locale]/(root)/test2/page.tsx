"use client";

import React from "react";
import { 
  Camera, Film, Layers, Video, Target, ChevronRight, 
  Mail, Phone, MapPin, Instagram, Facebook, Linkedin, 
  MonitorPlay, Scissors, Clapperboard, Share2, PlayCircle
} from "lucide-react";

export default function AlphaProductionPage() {
  return (
    <div className="bg-[#020202] text-white min-h-screen font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Framing Your Story */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background Light Effects (توهج العدسة) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-[1px] bg-cyan-500" />
              <span className="text-[10px] md:text-xs font-mono text-cyan-500 uppercase tracking-[0.5em] font-black animate-pulse">Alpha Productions</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[140px] font-[1000] italic uppercase tracking-tighter leading-[0.8]">
              Framing <br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #fff' }}>Your Story</span>
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-light max-w-2xl mx-auto lg:mx-0 leading-tight italic">
              Visualizing the unseen through professional lenses and elite technology.
            </p>
          </div>
        </div>

        {/* Floating Technical HUD Elements (للموبايل والديسكتوب) */}
        <div className="absolute bottom-10 left-10 hidden md:block opacity-20 font-mono text-[10px] tracking-widest uppercase">
          REC [●] 4K RAW <br /> ISO 400 | 24FPS
        </div>
      </section>

      {/* 2. OUR TARGET - The Mission */}
      <section className="relative py-32 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-cyan-500/10 rounded-full text-cyan-500">
                  <Target size={32} />
               </div>
               <h2 className="text-4xl font-black italic uppercase tracking-tighter">Our Target</h2>
            </div>
            <p className="text-white/60 text-xl leading-relaxed font-light">
              Created to open your eyes to a whole new world. If you have a story, <span className="text-white font-bold italic underline decoration-cyan-500 decoration-2 underline-offset-8">we will be your eyes through our lens.</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {['Content Creation', 'Photography', 'Video Production', 'Video Editing', 'Animation'].map((skill) => (
               <div key={skill} className="p-4 border border-white/10 bg-black rounded-xl text-[10px] font-mono text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full" /> {skill}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE OFFER - Three Pillars */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-[1000] italic uppercase text-center mb-24 tracking-tighter">
            What We <span className="text-cyan-500">Offer</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group p-8 border border-white/10 rounded-3xl bg-white/[0.02] hover:bg-cyan-500 transition-all duration-500">
               <Clapperboard size={40} className="text-cyan-500 group-hover:text-black mb-8" />
               <h3 className="text-2xl font-black italic uppercase mb-6 group-hover:text-black">Pre-Production</h3>
               <ul className="space-y-3 text-white/40 group-hover:text-black/60 font-mono text-[10px] uppercase tracking-widest">
                  <li>• Concept Development</li>
                  <li>• Script Development</li>
                  <li>• Location Scouting</li>
                  <li>• Talent Acquisition</li>
               </ul>
            </div>
            {/* Service 2 */}
            <div className="group p-8 border border-white/10 rounded-3xl bg-white/[0.02] hover:bg-cyan-500 transition-all duration-500">
               <Camera size={40} className="text-cyan-500 group-hover:text-black mb-8" />
               <h3 className="text-2xl font-black italic uppercase mb-6 group-hover:text-black">Production</h3>
               <ul className="space-y-3 text-white/40 group-hover:text-black/60 font-mono text-[10px] uppercase tracking-widest">
                  <li>• Directing</li>
                  <li>• Lighting Management</li>
                  <li>• Audio Recording</li>
                  <li>• Production Design</li>
               </ul>
            </div>
            {/* Service 3 */}
            <div className="group p-8 border border-white/10 rounded-3xl bg-white/[0.02] hover:bg-cyan-500 transition-all duration-500">
               <Scissors size={40} className="text-cyan-500 group-hover:text-black mb-8" />
               <h3 className="text-2xl font-black italic uppercase mb-6 group-hover:text-black">Post-Production</h3>
               <ul className="space-y-3 text-white/40 group-hover:text-black/60 font-mono text-[10px] uppercase tracking-widest">
                  <li>• Video Editing</li>
                  <li>• Special Effects</li>
                  <li>• Music Creation</li>
                  <li>• Encoding & Distribution</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTION SPECTRUM - Videos Alpha Offers */}
      <section className="py-32 bg-cyan-500 text-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <h2 className="text-6xl font-[1000] italic uppercase tracking-tighter leading-[0.8]">
              Videos <br /> Alpha <br /> Offers
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Commercials", "Web Marketing", "Film Making", 
              "Music Videos", "Animation Design", "Concerts Coverage",
              "Testimonials", "Training Videos"
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 border-b border-black/20 py-4 group cursor-default">
                <PlayCircle size={20} className="group-hover:scale-125 transition-transform" />
                <span className="font-bold italic uppercase tracking-tight text-xl">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT & FOOTER */}
      <footer className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-cyan-500 font-mono text-xs uppercase tracking-[0.4em]">Get In Touch</h4>
              <p className="text-3xl font-black italic uppercase">info@nurembergtech.com</p>
              <p className="text-2xl font-bold">00962796105229</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-cyan-500 font-mono text-xs uppercase tracking-[0.4em]">Where We Are</h4>
              <p className="text-xl font-light leading-relaxed">Abdoun Hills <br /> Amman, Jordan</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-cyan-500 font-mono text-xs uppercase tracking-[0.4em]">Social</h4>
              <div className="flex gap-6">
                <Instagram className="hover:text-cyan-500 cursor-pointer transition-colors" />
                <Facebook className="hover:text-cyan-500 cursor-pointer transition-colors" />
                <Linkedin className="hover:text-cyan-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Nuremberg Tech Group</p>
            <p className="text-[10px] font-mono text-white/20 uppercase">© 2026 All Rights Reserved</p>
          </div>
        </div>
      </footer>

    </div>
  );
}