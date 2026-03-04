import prisma from "@/lib/prisma";
import { Locale, NewClient } from "@/types";
import {  revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const addNewClient = async (data: NewClient) => {
  try {
    const result = await prisma.clients.create({
      data: {
        name_en: data.name_en,
        logo: data.logo,
        name_ar: data.name_ar,
      },
    });
    revalidateTag("clients","max")
    return { data: result, message: "Client Added Successfully", status: 201 };
  } catch (error) {
        console.log("fhfhfh error: ",error);

    return { data: error, message: "Error In Adding The Client", status: 500 };
  }
};

export const getAllClients = unstable_cache(async () => {
  try {
    const result = await prisma.clients.findMany({});
    return { data: result, message: "All Clients", status: 200 };
  } catch (error) {
    return { data: [], message: "Error In Adding The Clients", status: 500 };
  }
},["all clients"],{tags:["clients"],revalidate:3600})

export const getClientById = (clientId:string)=> unstable_cache(async () => {
  try {
    const result = await prisma.clients.findUnique({ where: { id: clientId } });
    if (!result)
      return { data: null, message: "Banner not found", status: 409 };

    return {
      data: result,
      message: `The Client With This ID: ${clientId}`,
      status: 201,
    };
  } catch (error) {
    
    return { data: null, message: "Error In Adding The Client", status: 500 };
  }
},[`client-by-id-${clientId}`],{tags:["clients"],revalidate:3600})()

export const updateClientById = async (
  clientId: string,
  data: Partial<NewClient>
) => {
  try {
    const existing = await prisma.clients.findUnique({
      where: { id: clientId },
    });
    if (!existing)
      return { data: null, message: "Client not found", status: 409 };

    const result = await prisma.clients.update({
      where: { id: clientId },
      data: data,
    });
    revalidateTag("clients","max")
    return {
      data: result,
      message: "Client updated successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error updating Client",
      status: 500,
    };
  }
};

export const deleteClientById = async (clientId: string) => {
  try {
    const existing = await prisma.clients.findUnique({
      where: { id: clientId },
      select: { id: true,logo:true },
    });
    if (!existing)
      return { data: null, message: "Client not found", status: 409 };

    const result = await prisma.clients.delete({ where: { id: clientId }});
    const logoKey= existing.logo?.split("/f/")[1];
    if(logoKey){
      await utapi.deleteFiles(logoKey);
    }
    revalidateTag("clients","max")
    return {
      data: result,
      message: "Client Deleted successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error Deleting The Client",
      status: 500,
    };
  }
};


export const getAllClientsByLocale= (locale:Locale)=> unstable_cache(async()=>{
  try {
    const result = await prisma.clients.findMany({});
const translatedClients= result.map((client:NewClient)=>{
  return {
    id:client.id,
    name: locale==="en"? client.name_en : client.name_ar,
    logo: client.logo,
  }
})
    return {
      data: translatedClients,
      message: "Clients fetched successfully",
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error fetching clients",
      status: 500,
    };
  }
})()