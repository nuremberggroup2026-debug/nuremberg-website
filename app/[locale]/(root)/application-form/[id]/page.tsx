import { getCareerById } from '@/app/server/careers/services'
import { notFound } from 'next/navigation'
import NewApplicationForm from '@/components/applications/NewApplicationForm'
import { newApplicationAction } from "../(actions)/newApplication"
import {InteractiveBackground} from "@/app/components/shared/interactivebackground"
import { generateApplicationMetadata } from '@/lib/constants/metadata'

interface Props {
  params: Promise<{ id: string, locale: "en" | "ar" }>
}

export async function generateMetadata({params}:Props){
  const {locale,id}= await params
  return generateApplicationMetadata({id,locale})

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