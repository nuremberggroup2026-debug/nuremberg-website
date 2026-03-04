"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <button 
      onClick={toggleLocale} 
      className="group relative flex items-center w-[85px] h-8 bg-black border-2 border-white/20 hover:border-cyan-500 transition-all duration-300 pointer-events-auto overflow-hidden"
    >
      <div className="flex-[1.4] flex items-center justify-center h-full bg-white/[0.05]">
        <span className="text-[16px] font-[1000] font-mono text-white group-hover:text-cyan-400 transition-colors leading-none tracking-[-0.1em]">
          {locale === "en" ? "EN" : "AR"}
        </span>
      </div>

      <div className="w-[2px] h-full bg-white/20 group-hover:bg-cyan-500 transition-colors" />

      <div className="flex-1 flex items-center justify-center h-full">
        <span className="text-[11px] font-[900] font-mono text-gray-500 group-hover:text-white transition-colors leading-none">
          {locale === "en" ? "AR" : "EN"}
        </span>
      </div>

      <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-500 opacity-0 group-hover:opacity-100 animate-pulse" />
    </button>
  );
}