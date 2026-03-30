import { getCareerById } from '@/app/server/careers/services'
import { notFound } from 'next/navigation'
import NewApplicationForm from '@/components/applications/NewApplicationForm'
import { newApplicationAction } from "../(actions)/newApplication"
import {InteractiveBackground} from "@/app/components/shared/interactivebackground"

interface Props {
  params: Promise<{ id: string, locale: "en" | "ar" }>
}

async function Page({ params }: Props) {
  const { id, locale } = await params;
  const selectedCourse = await getCareerById(id);

  if (!selectedCourse || selectedCourse.data === null) return notFound();

  return (
    <main className="min-h-screen bg-[#020202] relative overflow-hidden flex flex-col">
      <InteractiveBackground>
        <NewApplicationForm 
          action={newApplicationAction} 
          locale={locale} 
          career={selectedCourse.data} 
        />
      </InteractiveBackground>
    

    </main>
  );
}

export default Page;