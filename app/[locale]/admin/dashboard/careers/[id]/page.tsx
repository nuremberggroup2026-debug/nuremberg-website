
import { editCareerAction } from "../(actions)/editCareer";
import { notFound } from "next/navigation";
import { getCareerById } from "@/app/server/careers/services";
import EditCareerForm from "@/components/careers/EditCareerForm";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const course = (await getCareerById(id));

  if (!course || !course.data) {
    notFound();
  }

  return (
    <EditCareerForm
      career={course.data}
      action={editCareerAction}
    />
  );
}

export default Page;
