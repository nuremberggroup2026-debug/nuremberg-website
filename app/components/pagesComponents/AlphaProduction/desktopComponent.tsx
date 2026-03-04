"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroSection from "@/app/components/pagesComponents/AlphaProduction/HeroSection";
import CameraSection from "@/app/components/pagesComponents/AlphaProduction/CameraSection";
import CTA from "@/app/components/pagesComponents/Home/CTASection";

gsap.registerPlugin(useGSAP);
 
export default function Desktop() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const arrowsContainer = useRef<HTMLDivElement>(null);
  const [lockScroll, setLockScroll] = useState(true);
  const isShaking = useRef(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      tl.to(".arrow-icon", {
        y: 12,
        opacity: 0.8,
        duration: 0.7,
        stagger: 0.2,
        ease: "sine.inOut",
        force3D: true,
      });

      gsap.to(".arrow-icon", {
        filter: "drop-shadow(0px 0px 8px rgba(6, 182, 212, 0.6))",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    },
    { scope: arrowsContainer }
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!lockScroll) return;

      e.preventDefault();

      if (isShaking.current || !heroRef.current) return;

      isShaking.current = true;

      gsap.fromTo(
        heroRef.current,
        { y: 0 },
        {
          y: -20,
          duration: 0.08,
          yoyo: true,
          repeat: 3,
          ease: "power1.inOut",
          onComplete: () => {
            isShaking.current = false;
          },
        }
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setLockScroll(entry.isIntersecting);
      },
      { threshold: 0.9 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      observer.disconnect();
    };
  }, [lockScroll]);

  const scrollToScene = () => {
    setLockScroll(false);
    sceneRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="h-screen w-screen snap-y snap-mandatory overflow-x-hidden bg-black overflow-y-auto">
      <HeroSection
        heroRef={heroRef}
        arrowsContainer={arrowsContainer}
        scrollToScene={scrollToScene}
      />
      <CameraSection sceneRef={sceneRef} />

    </main>
  );
}