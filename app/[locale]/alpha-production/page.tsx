"use client";

import React from "react";
import Desktop from "@/app/components/pagesComponents/AlphaProduction/desktopComponent";
import Phone from "@/app/components/pagesComponents/AlphaProduction/phoneComponent";

export default function Page() {
  return (
    <div>
      <div className="hidden md:block">
        <Desktop />
      </div>
      <div className="block md:hidden">
        <Phone />
      </div>
    </div>
  );
}