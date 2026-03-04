"use client";

import React, { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Environment,
  ScrollControls,
  useScroll,
  Scroll,
} from "@react-three/drei";
import gsap from "gsap";
import { useLocale } from "next-intl";
import { Camera } from "@/public/models/Camera";
import Overlay from "./overlay";

function AnimatedCamera() {
  const { camera } = useThree();
  const scroll = useScroll();
  const tl = useRef<gsap.core.Timeline | null>(null);

  const lookAtTarget = useRef({ x: 0, y: 0, z: 0 });

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(camera.position, { x: 0, y: 0.1, z: -6, duration: 1 }, 0);
    tl.current.to(camera.position, { x: 10, y: 1, z: 4, duration: 1 }, 1);
    tl.current.to(camera.position, { x: -5, y: 2, z: 4, duration: 1 }, 2);
    tl.current.to(camera.position, { x: 0, y: 5, z: 6, duration: 1 }, 3);
    tl.current.to(camera.position, { x: 6, y: -1, z: 3, duration: 1 }, 4);
    tl.current.to(camera.position, { x: -6, y: 0.5, z: 8, duration: 1 }, 5);
    tl.current.to(camera.position, { x: 0, y: 1, z: 11, duration: 1 }, 6);
    tl.current.to(camera.position, { x: 0, y: 1, z: 8, duration: 1 }, 7);

    tl.current.to(
      lookAtTarget.current,
      {
        x: 0,
        y: -17,
        z: 0,
        duration: 5,
        ease: "power4.inOut",
      },
      7
    );
  }, [camera]);

  useFrame(() => {
    if (!tl.current) return;
    const progress = scroll.offset * tl.current.duration();
    tl.current.seek(progress);

    camera.lookAt(
      lookAtTarget.current.x,
      lookAtTarget.current.y,
      lookAtTarget.current.z
    );
  });

  return null;
}

export default function Scene() {
  const locale = useLocale();
 


  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0.1, -0.5], fov: 35 }}
        className="bg-[radial-gradient(circle_at_center,_#323232_0%,_#050505_60%,_#000000_100%)]"
      >
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Environment preset="warehouse" environmentIntensity={0.5} />

        <Suspense fallback={null}>
          <Camera />
        </Suspense>

        <ScrollControls
          pages={8}
          damping={0.3}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <AnimatedCamera />

          <Scroll html>
            <Overlay locale={locale as "en" | "ar"} />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}