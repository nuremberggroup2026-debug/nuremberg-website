export type NewUser = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginDetails = {
  email: string;
  password: string;
};

export type UserDetails = {
  id?: string;
  email: string;
  role: string;
  first_name: string;
};

export type NewBanner = {
  id?: string;
  alt: string | null;
  image: string | null;
  description_en: string | null;
  description_ar: string | null;
  created_at?: Date | null;
};

export type NewClient = {
  id?: string;
  name_en: string;
  name_ar: string;
  logo: string;
  created_at?: Date | null;
};





export type translatedClients = {
  id?: string;
  name: string;
  logo: string;
};

export type NewCategory = {
  id?: string;
  category_name_en: string;
  category_name_ar: string;
  category_description_en: string | null;
  category_description_ar: string | null;
  category_logo: string | null;
  slug: string;
};

export type NewProject = {
  id?: string;
  project_name_en: string;
  project_name_ar: string;
  project_description_en: string | null;
  project_description_ar: string | null;
  category_id: string;
  project_image: string | null;
  slug: string;
};

export type GetProject = {
  id?: string;
  project_name_en: string;
  project_name_ar: string;
  project_description_en: string | null;
  project_description_ar: string | null;
  category_id: string;
  project_image: string | null;
  slug: string;
  categories: {
    category_name_en: string;
    id: string;
  };
};

export type NewCareer = {
  id?: string;
  position_en: string | null;
  position_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  requirements_en: string[];
  requirements_ar: string[];
  experience_en: string | null;
  experience_ar: string | null;
  role_en: string | null;
  role_ar: string | null;
  image: string | null;
  is_deleted: boolean | null;
  slug: string;
};

export type NewApplication = {
  id?: string;
  first_name: string;
  last_name: string | null;
  major: string;
  email: string;
  cv: string;
  applied_at?: Date | null;
  career_id: string;
  phone_number: string | null;
  is_shown: boolean | null;
};

export type NewMember = {
  id?: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  position_en: string;
  position_ar: string;
  image: string;
  display_order?: number | null;
  main: boolean | null;
};
export type translatedMembers = {
  id?: string;
  name: string;
  description: string;
  position: string;
  image: string;

};
export type MemberOrder = {
  id: string;
  display_order: number;
};
export type translatedProjects = {
  id: string | undefined;
    project_image: string | null;
    project_slug: string;
    project_name: string;
    project_description: string | null;
    category_name: string;
    category_id: string;
    category_description: string | null;
};

export type Locale = "en" | "ar";
