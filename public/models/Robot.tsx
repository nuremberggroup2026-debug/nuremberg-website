"use client";

import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type ActionName =
  | "bot_B|Take 001|BaseLayer"
  | "bot_B_arm_l|Take 001|BaseLayer"
  | "bot_B_arm_r|Take 001|BaseLayer"
  | "bot_B_head|Take 001|BaseLayer"
  | "bot_B_face|Take 001|BaseLayer";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Mesh026: THREE.Mesh;
    Mesh026_1: THREE.Mesh;
    Mesh026_2: THREE.Mesh;
    bot_B_arm_l: THREE.Mesh;
    bot_B_arm_r: THREE.Mesh;
    Mesh029: THREE.Mesh;
    Mesh029_1: THREE.Mesh;
    Mesh029_2: THREE.Mesh;
    Mesh029_3: THREE.Mesh;
    bot_B_face: THREE.Mesh;
  };
  materials: {
    bot_B_texture_blue: THREE.MeshStandardMaterial;
    ["light_blue.001"]: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    face_02_blue: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type RobotProps = React.ComponentPropsWithoutRef<"group"> & {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  robotRotate: string;
  setRobotRotate: React.Dispatch<React.SetStateAction<string>>;
};

export function Robot({ mouse, robotRotate, ...props }: RobotProps) {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);

  const gltf = useGLTF("/models/robot.glb") as unknown as GLTFResult;
  const { nodes, materials, animations } = gltf;
  const { actions } = useAnimations(animations, group);
  const clickaction = () => {};

  useFrame(() => {
    if (!bodyRef.current) return;

    let targetZ = 0;
    if (robotRotate === "left") targetZ = THREE.MathUtils.degToRad(20);
    else if (robotRotate === "right") targetZ = THREE.MathUtils.degToRad(-20);

    bodyRef.current.rotation.z = THREE.MathUtils.lerp(
      bodyRef.current.rotation.z,
      targetZ,
      0.05,
    );
  });

  useFrame(() => {
    if (!headRef.current || !mouse?.current) return;

    const maxAngleY = -0.25;
    const maxAngleX = -0.3;

    headRef.current.rotation.z = THREE.MathUtils.lerp(
      headRef.current.rotation.z,
      mouse.current.x * maxAngleY,
      0.1,
    );

    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      mouse.current.y * maxAngleX,
      0.1,
    );
  });

useEffect(() => {
  if (!actions) return;

  const action = actions["bot_B_face|Take 001|BaseLayer"];
  if (!action) return;

  requestAnimationFrame(() => {
    action.reset().play();
    action.setLoop(THREE.LoopRepeat, Infinity);
  });

  return () => {
    action.stop();
  };
}, [actions]);

  return (
    <group
      onClick={clickaction}
      {...props}
      ref={group}
      dispose={null}
      rotation-y={Math.PI * 0.0}
    >
      <group name="Scene">
        <group
          name="blue"
          position={[0, -3, 0]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={0.2}
        >
          <group name="bot_B">
            <group name="bot_B_head" ref={headRef}>
              <mesh
                geometry={nodes.Mesh029.geometry}
                material={materials.bot_B_texture_blue}
              />
              <mesh
                geometry={nodes.Mesh029_1.geometry}
                material={materials["light_blue.001"]}
              />
              <mesh
                geometry={nodes.Mesh029_2.geometry}
                material={materials.glass}
              />
              <mesh
                geometry={nodes.Mesh029_3.geometry}
                material={materials.face_02_blue}
              />
              <mesh
                name="bot_B_face"
                geometry={nodes.bot_B_face.geometry}
                material={materials.face_02_blue}
                position={[0, -0.1, 0]}
              />
            </group>

            {/* ===== BODY ===== */}
            <group ref={bodyRef}>
              <mesh
                geometry={nodes.Mesh026.geometry}
                material={materials.bot_B_texture_blue}
              />
              <mesh
                geometry={nodes.Mesh026_1.geometry}
                material={materials["light_blue.001"]}
              />
              <mesh
                geometry={nodes.Mesh026_2.geometry}
                material={materials.glass}
              />
              <mesh
                geometry={nodes.bot_B_arm_l.geometry}
                material={materials.bot_B_texture_blue}
                position={[10.149, 0, 0]}
                rotation={[-Math.PI, 0, 0]}
                scale={-1}
              />
              <mesh
                geometry={nodes.bot_B_arm_r.geometry}
                material={materials.bot_B_texture_blue}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/robot.glb");
