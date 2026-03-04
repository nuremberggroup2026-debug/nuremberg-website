"use client";
import React from "react";
import { Layers, Terminal, Lock } from "lucide-react";
import DNACard from "@/app/components/pagesComponents/About/DNACard";
import { aboutData } from "@/data/AboutData";
import { useLocale } from "next-intl";

export default function DNASection() {
  const locale = useLocale() as "en" | "ar";
  const dnaItems = aboutData[locale]?.dna || aboutData.en.dna;

  const icons = [Layers, Terminal, Lock];

  return (
    <section className="py-40 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {dnaItems.map((item, idx) => {
          const Icon = icons[idx];
          return (
            <DNACard
              key={item.title}
              icon={<Icon size={28} />}
              title={item.title}
              desc={item.desc}
            />
          );
        })}
      </div>
    </section>
  );
}