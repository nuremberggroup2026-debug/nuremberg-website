import { getClientById } from "@/app/server/clients/services";
import EditClientForm from "@/components/clients/EditClientForm";
import { editClientAction } from "../(actions)/updateClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const result = await getClientById(id);

  if (!result || !result.data) {
    notFound();
  }

  return (
    <EditClientForm
      client={result.data}
      action={editClientAction}
    />
  );
}
