import type { Metadata } from "next";
import "./globals.css";
import { ROOT_METADATA } from "@/lib/constants/metadata";

import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner"
import LoadingScreen from "@/app/components/LoadingScreen";


import FontSwitcher from "@/app/components/fontswitcher/FontSwitcher";
import NextAuthProviders from "@/providers/NextAuthProvider";

export const metadata=ROOT_METADATA

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-white">
        <NextAuthProviders>
            <NextIntlClientProvider>
         {/* <LoadingScreen/> */}
              <FontSwitcher locale={"en"}>{children}</FontSwitcher>
             
          <Toaster
            position="bottom-right"
            richColors
            
          
            duration={3000}
          />
          </NextIntlClientProvider>
        </NextAuthProviders>
        
      </body>
    </html>
  );
}
