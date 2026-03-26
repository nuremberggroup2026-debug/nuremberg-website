
import TeamCard from "./TeamCard";
import { aboutData } from "@/data/AboutData";
import type {translatedMembers} from "@/types/index"


type Locale = "en" | "ar";
interface PageProps {
  locale: Locale;
    team: translatedMembers[];

}



export default function TeamSection({team,locale}:PageProps) {
  const teamItems = aboutData[locale]?.team || aboutData.en.team;

  return (
    <section className="py-40 px-6 md:px-20">
      <div className="max-w-7xl mx-auto ">
         <div className="text-center mb-20">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-cyan-500/40" />
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase font-bold">
            {locale === "ar" ? "تعرف علينا" : "Meet the Team"}
            </span>
            <div className="h-[1px] w-8 bg-cyan-500/40" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase   tracking-tighter italic">
            {locale==="ar"?"فريقنا":"Our Team"}
          </h2>
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