import { ClientsColumns } from "@/components/columns/clients-columns";
import { DataTable } from "@/components/data-table";
import {deleteClientAction}from "./(actions)/deleteClient"
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllClients } from "@/app/server/clients/services";

export default async function ClientsTable() {
  const allClients = (await getAllClients()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-2 md:ml-7 w-[90vw] md:w-[70vw] text-black">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Clients</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Clients.
        </h2>
      </div>

      {/* Conditional rendering */}
      {allClients.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Clients Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Clients Yet.
            </p>
            <NavigationButton
              routeName="newClient"
              value="Add New Clients"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={ClientsColumns}
            data={allClients}
            routeName="ourClients"
            deleteAction={deleteClientAction}
          />
          <NavigationButton
            routeName="newClient"
            value="Add New Client"
          />
        </>
      )}
    </main>
  );
}
