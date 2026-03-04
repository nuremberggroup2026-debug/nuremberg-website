import { getCategoryById } from "@/app/server/categories/services";
import { updateCategoryAction } from "../(actions)/editCategory";
import { notFound } from "next/navigation";
import EditCategoryForm from "@/components/categories/EditCategoryForm";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const category = await getCategoryById(id); 
  if (!category || !category.data) {
    notFound();
  }

  return (
    <EditCategoryForm
    
      category={category.data}
      action={updateCategoryAction}
    />
  );
}

export default Page;
