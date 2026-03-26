import Section2Desktop from "./MissionVisionSection";
import Section2Mobile from "./Section2Mobile";
type Locale = "en" | "ar";
interface PageProps {
  locale: Locale;
}

export default function Section2({locale}:PageProps) {
  return (
    <>
      <div className="hidden lg:block">
        <Section2Desktop />
      </div>

      <div className="block lg:hidden">
        <Section2Mobile locale={locale} />
      </div>
    </>
  );
}