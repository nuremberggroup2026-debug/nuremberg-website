

import Desktop from "@/app/components/pagesComponents/AlphaProduction/desktopComponent";
import Phone from "@/app/components/pagesComponents/AlphaProduction/phoneComponent";
type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}


export default  async function Page({params}:PageProps) {
    const { locale } = await params;
  return (
    <div>
      <div className="hidden  md:block">
        <Desktop />
      </div>
      <div className="block md:hidden">
        <Phone locale={locale} />
      </div>
    </div>
  );
}