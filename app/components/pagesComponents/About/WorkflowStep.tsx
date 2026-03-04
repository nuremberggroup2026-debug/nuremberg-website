"use client";
import React from "react";

interface StepProps {
  number: string;
  title: string;
  desc: string;
}

export default function WorkflowStep({ number, title, desc }: StepProps) {
  return (
    <div className="flex gap-12 py-12 group">
      <span className="text-cyan-500/20 font-black text-4xl group-hover:text-cyan-500 transition-all duration-500 italic">
        {number}
      </span>
      <div>
        <h4 className="text-xl font-black uppercase tracking-tight mb-3 group-hover:translate-x-2 transition-transform duration-500">
          {title}
        </h4>
        <p className="text-gray-500 text-base leading-relaxed max-w-md font-mono">
          {desc}
        </p>
      </div>
    </div>
  );
}