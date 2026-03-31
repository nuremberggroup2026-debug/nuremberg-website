// lib/metadata.ts
import { getCareerById } from "@/app/server/careers/services";
import type { Metadata } from "next";

// --------------------------------------------------
// Base site info
// --------------------------------------------------
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE || "Nuremberg Group";

export const APP_NAME = SITE_TITLE;

export const HOME_DESCRIPTION_EN =
  "Nuremberg Group delivers web and app development, branding, social media management, content creation, and creative production services that help businesses grow in the digital world.";

export const HOME_DESCRIPTION_AR =
  "تقدّم مجموعة نورنبرغ خدمات تطوير المواقع والتطبيقات، والهوية البصرية، وإدارة وسائل التواصل الاجتماعي، وصناعة المحتوى، والإنتاج الإبداعي لمساعدة الشركات على النمو في العالم الرقمي.";

export const COMMON_KEYWORDS = [
  // English
  "Nuremberg Group",
  "web development",
  "app development",
  "branding",
  "social media management",
  "content management",
  "digital media strategy",
  "graphic design",
  "video production",
  "animation",
  "photography",
  "business software development",
  "creative agency",
  "marketing services",
  "production company",

  // Arabic
  "مجموعة نورنبرغ",
  "تطوير المواقع",
  "تطوير التطبيقات",
  "الهوية البصرية",
  "إدارة وسائل التواصل الاجتماعي",
  "إدارة المحتوى",
  "استراتيجية الإعلام الرقمي",
  "تصميم الجرافيك",
  "إنتاج الفيديو",
  "الرسوم المتحركة",
  "التصوير الفوتوغرافي",
  "تطوير برمجيات الأعمال",
  "وكالة إبداعية",
  "خدمات تسويقية",
  "شركة إنتاج",
] as const;

// --------------------------------------------------
// Root metadata
// --------------------------------------------------
export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: APP_NAME,
  description: HOME_DESCRIPTION_EN,
  keywords: COMMON_KEYWORDS.join(", "),
  icons: {
    icon: `${SITE_URL}/favicon.ico`,
    shortcut: `${SITE_URL}/favicon.ico`,
    apple: `${SITE_URL}/logo.png`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: APP_NAME,
    description: HOME_DESCRIPTION_EN,
    siteName: SITE_TITLE,
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: HOME_DESCRIPTION_EN,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// --------------------------------------------------
// Home metadata
// --------------------------------------------------
export const HOME_METADATA: Metadata = {
  title: `${APP_NAME} | Digital Growth & Creative Solutions`,
  description: HOME_DESCRIPTION_EN,
  keywords: COMMON_KEYWORDS.join(", "),
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${APP_NAME} | Digital Growth & Creative Solutions`,
    description: HOME_DESCRIPTION_EN,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} - Digital Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | Digital Growth & Creative Solutions`,
    description: HOME_DESCRIPTION_EN,
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

// --------------------------------------------------
// Page metadata
// --------------------------------------------------
type PageKey = "home" | "alpha-production" | "nuremberg-tech" | "careers" | "about-us"|"application-form";

const translations: Record<
  PageKey,
  {
    en: { title: string; description: string };
    ar: { title: string; description: string };
    path: string;
  }
> = {
  home: {
    path: "",
    en: {
      title: "Home",
      description:
        "Nuremberg Group delivers web and app development, branding, social media management, content creation, and creative production services that help businesses grow in the digital world.",
    },
    ar: {
      title: "الرئيسية",
      description:
        "تقدّم مجموعة نورنبرغ خدمات تطوير المواقع والتطبيقات، والهوية البصرية، وإدارة وسائل التواصل الاجتماعي، وصناعة المحتوى، والإنتاج الإبداعي لمساعدة الشركات على النمو في العالم الرقمي.",
    },
  },
  "application-form": {
  path: "application-form",
  en: {
  title: "Job Application Form",
  description:
    "Apply for job opportunities at Nuremberg Group through our online application form. Join our team in tech, media, and creative production.",
},
ar: {
  title: "نموذج التقديم للوظائف",
  description:
    "قدّم طلبك للوظائف في مجموعة نورنبرغ عبر نموذج التقديم الإلكتروني وانضم إلى فريقنا في مجالات التقنية والإعلام والإنتاج الإبداعي.",
},
},

  "alpha-production": {
    path: "alpha-production",
    en: {
      title: "Alpha Production",
      description:
        "Alpha Production by Nuremberg Group offers scripting, photography, video production, animation, and storytelling-focused creative media services.",
    },
    ar: {
      title: "ألفا للإنتاج",
      description:
        "تقدّم ألفا للإنتاج التابعة لمجموعة نورنبرغ خدمات كتابة السيناريو، والتصوير الفوتوغرافي، وإنتاج الفيديو، والرسوم المتحركة، والخدمات الإبداعية القائمة على السرد القصصي.",
    },
  },

  "nuremberg-tech": {
    path: "nuremberg-tech",
    en: {
      title: "Nuremberg Tech",
      description:
        "Nuremberg Tech provides web development, app development, business software development, and digital solutions built to support growth and performance.",
    },
    ar: {
      title: "نورنبرغ تك",
      description:
        "تقدّم نورنبرغ تك خدمات تطوير المواقع والتطبيقات، وتطوير برمجيات الأعمال، والحلول الرقمية المصممة لدعم النمو وتحسين الأداء.",
    },
  },

  careers: {
    path: "careers",
    en: {
      title: "Careers",
      description:
        "Explore career opportunities at Nuremberg Group and join a team working in technology, media, branding, and creative production.",
    },
    ar: {
      title: "الوظائف",
      description:
        "استكشف الفرص الوظيفية في مجموعة نورنبرغ وانضم إلى فريق يعمل في التقنية والإعلام والهوية البصرية والإنتاج الإبداعي.",
    },
  },

  "about-us": {
    path: "about-us",
    en: {
      title: "About Us",
      description:
        "Learn more about Nuremberg Group, our vision, our mission, and the services we deliver to help businesses grow locally and internationally.",
    },
    ar: {
      title: "من نحن",
      description:
        "تعرّف على مجموعة نورنبرغ، ورؤيتنا، ورسالتنا، والخدمات التي نقدمها لمساعدة الشركات على النمو محليًا ودوليًا.",
    },
  },
};

export function generatePageMetadata(
  page: PageKey,
  locale: "en" | "ar"
): Metadata {
  const isArabic = locale === "ar";
  const t = translations[page][isArabic ? "ar" : "en"];

  const canonical =
    page === "home"
      ? `${SITE_URL}/${locale}`
      : `${SITE_URL}/${locale}/${translations[page].path}`;

  return {
    title: `${t.title} | ${SITE_TITLE}`,
    description: t.description,
    keywords: COMMON_KEYWORDS.join(", "),
    alternates: {
      canonical,
      languages: {
        en:
          page === "home"
            ? `${SITE_URL}/en`
            : `${SITE_URL}/en/${translations[page].path}`,
        ar:
          page === "home"
            ? `${SITE_URL}/ar`
            : `${SITE_URL}/ar/${translations[page].path}`,
      },
    },
    openGraph: {
      title: `${t.title} | ${SITE_TITLE}`,
      description: t.description,
      url: canonical,
      siteName: SITE_TITLE,
      type: "website",
      locale: isArabic ? "ar_JO" : "en_US",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.title} | ${SITE_TITLE}`,
      description: t.description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}



export async function generateApplicationMetadata({
  id,
  locale = "en",
}: {
  id: string;
  locale: "en" | "ar";
}): Promise<Metadata> {
  // 🔥 fetch your career from DB / API
  const res = (await getCareerById(id))

  const career = res.data

  const isArabic = locale === "ar";

  const title = isArabic
    ? `التقديم على ${career?.position_ar} | ${SITE_TITLE}`
    : `Apply for ${career?.position_en} | ${SITE_TITLE}`;

  const description = isArabic
    ? `قدّم الآن على وظيفة ${career?.position_ar} في مجموعة نورنبرغ.`
    : `Apply now for the ${career?.position_en} position at Nuremberg Group.`;

  const image = career?.image || `${SITE_URL}/og-image.jpg`;

  const url = `${SITE_URL}/${locale}/careers/${id}/apply`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: isArabic ? "ar_JO" : "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: career?.position_en??"Career Iamge",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    alternates: {
      canonical: url,
    },
  };
}