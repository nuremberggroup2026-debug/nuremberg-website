
import { Zap, ShieldCheck, Monitor, Database, PenTool, Box } from "lucide-react";
import { nurembergData } from "@/data/nurembergData";
import FeatureCard from "./FeatureCard";
type Locale = "en" | "ar";
interface PageProps {
  locale: Locale;
}



export default function FeaturesSection({locale}:PageProps) {
  const data = nurembergData[locale].features; 

const icons = [Zap, ShieldCheck, Monitor, Database, PenTool, Box];
  return (
    <section className="py-32 px-10 md:px-20 bg-zinc-950/40 border-y border-white/5">
      <div className="text-left mb-20 flex flex-row justify-center space-y-4">
       
        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
          {data.subtitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.cards.map((card, idx) => {
          const Icon = icons[idx];
          return (
            <FeatureCard
              key={idx}
              icon={Icon}
              tag={card.tag}
              title={card.title}
              desc={card.desc}
            />
          );
        })}
      </div>
    </section>
  );
}