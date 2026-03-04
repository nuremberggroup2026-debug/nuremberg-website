import type { Metadata } from "next";

// Environment & Base Info
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const SITE_TITLE = "Nuremberg Group";
export const SITE_TAGLINE =
  "Web Development, Mobile Apps, Production & Social Media Solutions";

export const APP_NAME = `${SITE_TITLE} | ${SITE_TAGLINE}`;

export const HOME_DESCRIPTION =
  "Nuremberg Group is a full-service digital agency delivering high-performance websites, mobile applications, creative production, and strategic social media solutions for modern brands.";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Nuremberg Group is a digital solutions company specializing in website development, mobile applications, creative production, and social media strategy. We help brands grow through technology, creativity, and data-driven execution.";

export const COMMON_KEYWORDS = [
  // Brand
  "Nuremberg Group",
  "Nuremberg digital agency",

  // Web
  "web development",
  "website development company",
  "custom websites",
  "frontend development",
  "backend development",
  "Next.js development",
  "UI UX design",

  // Mobile
  "mobile app development",
  "iOS app development",
  "Android app development",
  "cross platform apps",
  "React Native development",

  // Production
  "creative production",
  "video production",
  "brand production",
  "commercial production",
  "media production company",

  // Social Media
  "social media marketing",
  "social media management",
  "content creation",
  "digital marketing agency",
  "branding strategy",

  // Arabic keywords
  "نورمبرغ جروب",
  "شركة نورمبرغ",
  "تصميم مواقع",
  "برمجة مواقع",
  "تطوير تطبيقات",
  "تطبيقات موبايل",
  "إدارة وسائل التواصل الاجتماعي",
  "إدارة السوشال ميديا",
  "إنتاج إعلامي",
  "شركة تسويق رقمي",
  "تصميم تجربة المستخدم",
] as const;

/* ================================
   HOME METADATA
================================ */

export const HOME_METADATA: Metadata = {
  title: APP_NAME,
  description: HOME_DESCRIPTION,
  keywords: COMMON_KEYWORDS.join(", "),
  metadataBase: new URL(SITE_URL),

  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    locale: "en-US",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — Digital Solutions Agency`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/logo.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

/* ================================
   SERVICES PAGE
================================ */

export const SERVICES_METADATA: Metadata = {
  title: `${SITE_TITLE} — Services`,
  description:
    "Explore Nuremberg Group services including website development, mobile application development, creative production, and social media management.",

  keywords: COMMON_KEYWORDS.join(", "),

  openGraph: {
    title: `${SITE_TITLE} — Our Services`,
    description:
      "Custom websites, powerful mobile applications, creative production, and social media growth strategies tailored to your business.",
    url: `${SITE_URL}/services`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — Services`,
      },
    ],
  },

  twitter: {
    card: "summary",
    title: `${SITE_TITLE} — Services`,
    description:
      "Website development, mobile apps, production, and social media growth solutions.",
  },
};

/* ================================
   ABOUT PAGE
================================ */

export const ABOUT_METADATA: Metadata = {
  title: `${SITE_TITLE} — About Us`,
  description:
    "Learn more about Nuremberg Group, our digital expertise, creative approach, and commitment to delivering scalable technology and marketing solutions.",

  keywords: COMMON_KEYWORDS.join(", "),

  openGraph: {
    title: `${SITE_TITLE} — About`,
    description:
      "Meet the team behind Nuremberg Group and discover how we build digital experiences that drive growth.",
    url: `${SITE_URL}/about`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "article",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — About`,
      },
    ],
  },

  twitter: {
    card: "summary",
    title: `${SITE_TITLE} — About`,
    description:
      "Digital innovation, creative production, and growth-driven strategies.",
  },
};

/* ================================
   ROOT METADATA
================================ */

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: APP_NAME,
  description: APP_DESCRIPTION,

  icons: {
    icon: `${SITE_URL}/favicon.ico`,
    shortcut: `${SITE_URL}/favicon.ico`,
    apple: `${SITE_URL}/logo.png`,
  },

  openGraph: {
    type: "website",
    locale: "en-US",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: SITE_TITLE,
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/logo.png`],
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};