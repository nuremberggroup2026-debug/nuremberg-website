"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Loading from "@/app/components/LoadingScreen";

type CanvassProps = {
  robotRotate: string;
  setRobotRotate: React.Dispatch<React.SetStateAction<string>>;
};

export default function Canvass({
  robotRotate,
  setRobotRotate,
}: CanvassProps) {
  return (
    <Canvas
      className="!w-[30vw] !h-[100%]"
      camera={{ position: [0, 2, -6] }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl, scene, camera }) => {
        gl.compile(scene, camera);
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 0]} intensity={1} />

      <Suspense fallback={null}>
        <Scene
          robotRotate={robotRotate}
          setRobotRotate={setRobotRotate}
        />
      </Suspense>
    </Canvas>
  );
}