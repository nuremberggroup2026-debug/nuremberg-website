import FormSection from "@/app/components/pagesComponents/About/FormSection"
import {sendEmailAction} from "../about-us/(actions)/sendEmailAction"

type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}





export default async function page({ params }: PageProps) {
     const { locale } = await params;

  return (
    <div>
      <FormSection locale={locale} action={sendEmailAction}/>
    </div>
  )
}
