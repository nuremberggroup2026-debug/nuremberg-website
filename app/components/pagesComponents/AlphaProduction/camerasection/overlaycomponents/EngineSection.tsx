"use client";

interface Props {
  locale: "en" | "ar";
}

const translations = {
  en: {
    liveProduction: "Live Production Alpha",
    alphaEngine: "ALPHA ENGINE",
    description:
      "Experience the pinnacle of software craftsmanship. Engineered for extreme reliability and sub-millisecond precision.",
    architecture: "Architecture",
    architectureValue: "Distributed",
    latency: "Latency",
    latencyValue: "< 1.2ms",
    accessTerminal: "Access Terminal",
    systemHandshake: "System_Handshake: Verified",
    secureLink: "Secure_Link: Active",
    sourceControl: "Source_Control",
    mainframe: "Mainframe_v2",
  },
  ar: {
    liveProduction: "إنتاج مباشر ألفا",
    alphaEngine: "ألفا المحرك",
    description:
      "اختبر قمة صناعة البرمجيات. مصمم لأقصى درجات الاعتمادية ودقة أقل من المللي ثانية.",
    architecture: "الهندسة المعمارية",
    architectureValue: "موزع",
    latency: "الكمون",
    latencyValue: "< 1.2ms",
    accessTerminal: "الوصول إلى المحطة",
    systemHandshake: "مبادلة النظام: تم التحقق",
    secureLink: "رابط آمن: نشط",
    sourceControl: "التحكم بالمصدر",
    mainframe: "Mainframe_v2",
  },
};

export default function EngineSection({ locale }: Props) {
  const t = translations[locale];

  return (
    <section className="relative w-full   h-screen flex items-center justify-center px-6 md:px-16 py-32 overflow-hidden">
      
      {/* Background Frame Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 w-40 h-40 border-l border-t border-cyan-500/20"></div>
        <div className="absolute bottom-16 right-16 w-40 h-40 border-r border-b border-cyan-500/20"></div>

        <div className="absolute top-1/2 left-6 -translate-y-1/2 hidden xl:block">
          <div className="rotate-90 origin-left text-[9px] font-mono text-cyan-500/30 tracking-[1em] uppercase whitespace-nowrap">
            Production_Environment // Alpha_Protocol_v2.0
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
        
        {/* Text Side */}
        <div className="lg:col-span-6 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em] font-black">
                {t.liveProduction}
              </span>
            </div>

            <h1 className="text-6xl md:text-[110px] font-[1000] text-white italic uppercase tracking-tighter leading-[0.85]">
              ALPHA <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
              >
                {t.alphaEngine}
              </span>
            </h1>
          </div>

          <div className="max-w-xl space-y-8">
            <p className="text-white/60 text-xl font-light leading-relaxed">
              {t.description}
            </p>

            <div className="grid grid-cols-2 gap-10 border-y border-white/10 py-10">
              <div>
                <div className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-1">
                  {t.architecture}
                </div>
                <div className="text-white font-black italic text-xl uppercase">
                  {t.architectureValue}
                </div>
              </div>
              <div>
                <div className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-1">
                  {t.latency}
                </div>
                <div className="text-white font-black italic text-xl uppercase">
                  {t.latencyValue}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <button className="px-12 py-4 bg-white text-black font-[1000] italic uppercase tracking-tighter text-lg hover:bg-cyan-500 transition-all duration-300 active:scale-95">
                {t.accessTerminal}
              </button>

              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest leading-tight">
                {t.systemHandshake} <br />
                {t.secureLink}
              </div>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/15 shadow-2xl group">

            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
              alt="Production Server Architecture"
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />

            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest italic">
                {t.sourceControl}
              </div>
              <div className="text-white font-black italic text-2xl uppercase tracking-tight">
                {t.mainframe}
              </div>
            </div>

            <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] skew-x-12"></div>
          </div>

          <div className="absolute -bottom-16 -right-16 w-56 h-56 border border-white/5 rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}