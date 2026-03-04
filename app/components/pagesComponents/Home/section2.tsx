import Section2Desktop from "./MissionVisionSection";
import Section2Mobile from "./Section2Mobile";

export default function Section2() {
  return (
    <>
      <div className="hidden lg:block">
        <Section2Desktop />
      </div>

      <div className="block lg:hidden">
        <Section2Mobile />
      </div>
    </>
  );
}