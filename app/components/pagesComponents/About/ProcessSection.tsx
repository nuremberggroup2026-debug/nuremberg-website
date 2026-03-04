"use client";
import React from "react";
import WorkflowStep from "./WorkflowStep";
import { aboutData } from "@/data/AboutData";
import { useLocale } from "next-intl";

export default function ProcessSection() {
  const locale = useLocale() as "en" | "ar";
  const processItems = aboutData[locale]?.process || aboutData.en.process;

  return (
    <section className="py-40 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div className="reveal-up">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic leading-none">
            {processItems.headingBefore}{" "}
            <span className="text-cyan-500 underline decoration-1 underline-offset-8">
              {processItems.headingHighlight}
            </span>{" "}
            {processItems.headingAfter}
          </h2>

          <div>
            {processItems.steps.map((step) => (
              <WorkflowStep
                key={step.number}
                number={step.number}
                title={step.title}
                desc={step.desc}
              />
            ))}
          </div>
        </div>

        <div className="reveal-up relative aspect-square md:aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
          <img
            src={processItems.image}
            className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-110 hover:scale-100"
            alt="Process Visual"
          />
        </div>
      </div>
    </section>
  );
}