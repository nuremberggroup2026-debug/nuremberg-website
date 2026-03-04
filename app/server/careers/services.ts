import prisma from "@/lib/prisma";
import { Locale, NewCareer } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";
import {UTApi} from "uploadthing/server";
import { ca } from "zod/v4/locales";

const utapi = new UTApi();

export const addNewCareer = async (data: NewCareer) => {
  const isExisted = await prisma.careers.findFirst({
    where: {
      position_en: data.position_en,
    },
  });

  if (isExisted)
    return {
      success: false,
      message: "Position Is Already Existed",
      status: 409,
    };
  try {
    const result = await prisma.careers.create({ data });
    revalidateTag("careers","max");
    return { data: result, message: "Career Added Successfully", status: 201 };
  } catch (error) {
    console.log("error: ",error);
    
    return { data: error, message: "Error In Adding The Career", status: 500 };
  }
};

export const getAllCareers = unstable_cache(
  async () => {
    try {
      const result = await prisma.careers.findMany({include:{applications:{select:{id:true}}}});
      if (!result)
        return { data: null, message: "There Are No Careers", status: 200 };
      return { data: result, message: "All Careers", status: 200 };
    } catch (error) {
      return { data: null, message: "Error In Getting Careers", status: 500 };
    }
  },
  ["all careers"],
  { tags: ["careers"], revalidate: 3600 }
);

export const getAllCareersWithApplications = unstable_cache(
  async () => {
    try {
      const result = await prisma.careers.findMany({include:{applications:true}});
      if (!result)
        return { data: null, message: "There Are No Careers", status: 200 };
      return { data: result, message: "All Careers With Applications", status: 200 };
    } catch (error) {
      return { data: error, message: "Error In Getting Careers", status: 500 };
    }
  },
  ["all-careers-with-applications"],
  { tags: ["careers"], revalidate: 3600 }
);

export const getCareerById = (id:string)=> unstable_cache(
  async () => {
    try {
      const result = await prisma.careers.findUnique({where:{id}});
      if (!result)
        return { data: null, message: `There is No Career with ${id}`, status: 200 };
      return { data: result, message: `Career ${id}:`, status: 200 };
    } catch (error) {
      return { data: null, message: "Error In Getting Career", status: 500 };
    }
  },
  [`career-by-id-${id}`],
  { tags: ["careers"], revalidate: 3600 }
)();

export const getCareerBySlug = (slug:string)=> unstable_cache(
  async (slug:string) => {
    try {
      const result = await prisma.careers.findUnique({where:{slug}});
      if (!result)
        return { data: null, message: `There is No Career with ${slug}`, status: 200 };
      return { data: result, message: `Career ${slug}:`, status: 200 };
    } catch (error) {
      return { data: error, message: "Error In Getting Career", status: 500 };
    }
  },
  [`career-by-slug-${slug}`],
  { tags: ["careers"], revalidate: 3600 }
);

export const getCareerWithApplicationsById = (id:string)=> unstable_cache(
  async (id:string) => {
    try {
      const result = await prisma.careers.findUnique({where:{id},include:{applications:true}});
      if (!result)
        return { data: null, message: `There is No Career with ${id}`, status: 200 };
      return { data: result, message: `Career ${id} With Applications`, status: 200 };
    } catch (error) {
      return { data: error, message: "Error In Getting Career", status: 500 };
    }
  },
  [`career-with-applications-by-id-${id}`],
  { tags: ["careers"], revalidate: 3600 }
);

export const updateCareer= async(id:string, data:Partial<NewCareer>)=>{
    try {
    const existing = await prisma.careers.findUnique({
      where: { id},
    });
    if (!existing)
      return {
        data: null,
        message: `There Is No Career With This ID: ${id}`,
        status: 409,
      };

    const result = await prisma.careers.update({
      where: { id },
      data,
    });
    revalidateTag("careers","max");
    return {
      data: result,
      message: `Career Updated Successfully`,
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Updating The Career",
      status: 500,
    };
  }
}

export const deleteCareers = async (id: string) => {
  try {
    const existing = await prisma.careers.findUnique({
      where: { id },select:{id:true,image:true},
    });
    if (!existing)
      return {
        data: null,
        message: `There Is No Career With This ID: ${id}`,
        status: 409,
      };

    const result = await prisma.careers.delete({
      where: { id },
    });
    const imageKey= existing.image?.split("/f/")[1];
    if(imageKey){
      await utapi.deleteFiles(imageKey);
    }
    revalidateTag("careers","max");
    return {
      data: result,
      message: `Career Deleted Successfully`,
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleting The Career",
      status: 500,
    };
  }
};

export const getCareerNameAndIdById = async (id:string) => {
  try {
    const result = await prisma.careers.findUnique({
      where: { id },
      select: {
        id: true,
        position_en: true,
      },
    });
    if (!result)
      return { data: null, message: `There is No Career with ${id}`, status: 200 };
    return { data: result, message: `Career ${id} Found`, status: 200 };
  } catch (error) {
    return { data: null, message: `Error In getting the Career`, status: 500 };
  }
}


export const getCareersByLocale= async(locale:Locale)=>
  unstable_cache(
    async()=>{
      try {
        const result= await prisma.careers.findMany({})

        const translatedCareers= result.map((career:NewCareer)=>{
          return {
            id:career.id,
            position:locale==="en"? career.position_en : career.position_ar,
            description:locale==="en"? career.description_en : career.description_ar,
            image:career.image,
            requirements:locale==="en"? career.requirements_en : career.requirements_ar,
            role:locale==="en"? career.role_en : career.role_ar,
            experience:locale==="en"? career.experience_en : career.experience_ar,
            slug:career.slug,
          }
        })
        return {
          data: translatedCareers,
          message: "Careers fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error fetching careers",
          status: 500,
        };
      }
    }
  )


export const getCareerByIdAndLocale= (id:string, locale:Locale)=> unstable_cache(
  async()=>{
    try {
      const result= await prisma.careers.findUnique({where:{id}})

      if(!result)
      return {
        data: null,
        message: `There is No Career with ${id}`,
        status: 200,
      }

      const translatedCareer = {
        id:result.id,
        position:locale==="en"? result.position_en : result.position_ar,
        description:locale==="en"? result.description_en : result.description_ar,
        image:result.image,
        requirements:locale==="en"? result.requirements_en : result.requirements_ar,
        role:locale==="en"? result.role_en : result.role_ar,
        experience:locale==="en"? result.experience_en : result.experience_ar,
        slug:result.slug
      }
      return {
        data: translatedCareer,
        message: `Career ${id} Found`,
        status: 200
      }
    } catch (error) {
      return {
        data: null,
        message: `Error In getting the Career`,
        status: 500,
      };
    }
  },[`career-by-id-and-locale-${id}-${locale}`],{tags:["careers"], revalidate:3600}
)




