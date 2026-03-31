"use client";

import  { useRef, useLayoutEffect, Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Environment,
  ScrollControls,
  useScroll,
  ContactShadows,
  Float,
  Points,
  PointMaterial,
} from "@react-three/drei";
import gsap from "gsap";
import { useLocale } from "next-intl";
import { Camera } from "@/public/models/Camera";
import Overlay from "./overlay";
import * as THREE from "three";

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(34, 211, 238, 1)"); 
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");      
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function CameraGlow({ glowRef }: { glowRef: any }) {
  const texture = useMemo(() => createGlowTexture(), []);
  
  return (
    <sprite ref={glowRef} scale={[12, 12, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

function FocusGrid({ count = 500, materialRef }: { count?: number; materialRef: any }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        ref={materialRef}
        transparent
        color="#22d3ee"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function AnimatedSceneContents() {
  const { camera } = useThree();
  const scroll = useScroll();
  const tl = useRef<gsap.core.Timeline | null>(null);
  const lookAtTarget = useRef({ x: 0, y: 0, z: 0 });
  const sparkleMat = useRef<any>(null);
  const glowRef = useRef<any>(null);

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });




tl.current.to(camera.position, { x: 0, y: 0.1, z: -6, duration: 1 }, 0);


tl.current.to(camera.position, { x: 7, y: 1, z: 4, duration: 1 }, 1.5);

tl.current.to(camera.position, { x: -5, y: 2, z: 6, duration: 1 }, 3);

tl.current.to(camera.position, { x: 5, y: 2, z: 4, duration: 1 }, 4.5);


tl.current.to(camera.position, { x: 0, y: .5, z: 8, duration: 1 }, 6);


    tl.current.to(
      lookAtTarget.current,
      { x: 0, y: -17, z: 0, duration: 6, ease: "power4.inOut" },
      5
    );

    if (glowRef.current) {
      tl.current.to(glowRef.current.material, {
        opacity: 0,
        duration: 2, 
        ease: "power2.out"
      }, 6);
    }

    if (sparkleMat.current) {
      tl.current.to(sparkleMat.current, {
        opacity: 0,
        duration: 2,
        ease: "power2.out"
      }, 6);
    }



  }, [camera]);

  useFrame(() => {
    if (!tl.current) return;
    const progress = scroll.offset * tl.current.duration();
    tl.current.seek(progress);
    camera.lookAt(lookAtTarget.current.x, lookAtTarget.current.y, lookAtTarget.current.z);
  });

  return (
    <>
      <Environment preset="studio" environmentIntensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#22d3ee" />

      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <CameraGlow glowRef={glowRef} />
          <FocusGrid count={400} materialRef={sparkleMat} />
          <Camera />
        </Float>
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />
      </Suspense>
    </>
  );
}

export default function Scene() {
  const locale = useLocale();
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Canvas shadows camera={{ position: [0, 0.1, -0.5], fov: 35 }}>
        <ScrollControls pages={12} damping={0.3}>
          <AnimatedSceneContents />
          <Overlay locale={locale as "en" | "ar"} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}