"use client";
import React, { RefObject } from "react";
import Scene from "@/app/components/pagesComponents/AlphaProduction/camerasection/scene";

interface SceneSectionProps {
  sceneRef: RefObject<HTMLDivElement | null>;
}

export default function CameraSection({ sceneRef }: SceneSectionProps) {
  return (
    <div ref={sceneRef} className="h-screen w-full snap-start">
      <Scene />
    </div>
  );
}