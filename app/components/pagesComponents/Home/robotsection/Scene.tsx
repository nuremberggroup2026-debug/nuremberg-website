"use client";

import React, { useEffect, useRef } from "react";
import { Robot } from "@/public/models/Robot";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

type SceneProps = {
  robotRotate: string;
  setRobotRotate: React.Dispatch<React.SetStateAction<string>>;
};

export default function Scene({
  robotRotate,
  setRobotRotate,
}: SceneProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      lastMouse.current.x = e.clientX;
      lastMouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouse);

    canvasRef.current = document.querySelector(".canvas") as HTMLElement;

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  useFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const gsapX = (gsap.getProperty(canvas, "x") as number) || 0;
    const gsapY = (gsap.getProperty(canvas, "y") as number) || 0;

    const centerX = rect.width / 3.5;

    const normX =
      (lastMouse.current.x - rect.left - centerX - gsapX) /
      (rect.width / 2);

    const normY =
      -(
        (lastMouse.current.y -
          rect.top -
          rect.height / 2 -
          gsapY) /
        (rect.height / 2)
      );

    mouse.current.x = normX;
    mouse.current.y = normY;
  });

  return (
    <Robot
      rotation={[0, Math.PI, 0]}
      mouse={mouse}
      robotRotate={robotRotate}
      setRobotRotate={setRobotRotate}
    />
  );
}