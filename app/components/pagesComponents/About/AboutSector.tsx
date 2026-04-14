import { Monitor, Video, BarChart3 } from "lucide-react";
import { aboutData } from "@/data/AboutData";
import { MobileSectorsAccordion } from "./MobileSectorsAccordion";
import { DesktopSectorsGrid } from "./DesktopSectorsGrid";

type Locale = "en" | "ar";
interface PageProps {
  locale: Locale;
}

export default function AboutSectors({ locale }: PageProps) {
  const sectorsText = aboutData[locale]?.sectors || aboutData.en.sectors;
  const iconsMap = [Monitor, Video, BarChart3];

  return (
    <section className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-px w-8 bg-cyan-500/40" />
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase font-bold">
              {sectorsText.titleSectionLabel}
            </span>
            <div className="h-px w-8 bg-cyan-500/40" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
            {sectorsText.titleLine1}{" "}
            <span className="text-cyan-500">{sectorsText.titleLine2}</span>
          </h2>
        </div>

        {/* Responsive Components */}
        <MobileSectorsAccordion  locale={locale} />
        <DesktopSectorsGrid locale={locale} iconsMap={iconsMap} />
      </div>
    </section>
  );
}
