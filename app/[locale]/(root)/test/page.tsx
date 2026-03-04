"use client";
import React, { useState } from "react";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function TestLoadingPage() {

  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-cyan-500 font-mono text-xl animate-pulse">SYSTEM_BOOT_COMPLETE</h1>
        <button 
          onClick={() => setReloadKey(prev => prev + 1)}
          className="px-6 py-2 border border-cyan-500/50 text-cyan-400 text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
        >
          Re-Initialize System
        </button>
      </div>

      <LoadingScreen 
        key={reloadKey} 
        onFinished={() => {
          console.log("Loading Finished!");
        }} 
      />
    </div>
  );
}