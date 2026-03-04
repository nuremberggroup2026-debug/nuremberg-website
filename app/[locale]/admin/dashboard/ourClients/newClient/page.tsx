import React from "react";
import CreateClientForm from "@/components/clients/CreateClientForm";
import { addClientAction } from "../(actions)/addClient";
async function page() {
  return (
    <>
      <CreateClientForm action={addClientAction} />
    </>
  );
}

export default page;
