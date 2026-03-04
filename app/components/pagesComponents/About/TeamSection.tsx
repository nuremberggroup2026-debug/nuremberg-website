"use client";
import React from "react";
import TeamCard from "./TeamCard";
import { aboutData } from "@/data/AboutData";
import { useLocale } from "next-intl";
import type {translatedMembers} from "@/types/index"

interface Props {
  team: translatedMembers[];
}


export default function TeamSection({team}:Props) {
  const locale = useLocale() as "en" | "ar";
  const teamItems = aboutData[locale]?.team || aboutData.en.team;

  return (
    <section className="py-40 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 reveal-up">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic">
            {teamItems.heading}
          </h2>
          <div className="h-[2px] w-24 bg-cyan-500 mt-6 shadow-[0_0_15px_#06b6d4]" />
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {team.map((member, idx) => (
            <TeamCard
              key={idx}
              name={member.name}
              role={member.position}
              img={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}