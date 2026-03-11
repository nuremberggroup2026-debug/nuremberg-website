"use client";

import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type ActionName = "Take 001";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Mesh: THREE.Mesh;
    Mesh_1: THREE.Mesh;
    Mesh_2: THREE.Mesh;
    bot_B_arm_l: THREE.Mesh;
    bot_B_arm_r: THREE.Mesh;
    Mesh003: THREE.Mesh;
    Mesh003_1: THREE.Mesh;
    Mesh003_2: THREE.Mesh;
    Mesh003_3: THREE.Mesh;
    bot_B_face: THREE.Mesh;
  };
  materials: {
    bot_B_texture_blue: THREE.MeshStandardMaterial;
    light_blue: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    face_02_blue: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type RobotProps = React.ComponentPropsWithoutRef<"group"> & {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  robotRotate: string;
  setRobotRotate: React.Dispatch<React.SetStateAction<string>>;
  headSensitivity?: number; // متغير جديد للحساسية
};

export function Robot({
  mouse,
  robotRotate,
  headSensitivity = 1, // افتراضي 1
  ...props
}: RobotProps) {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);

  const { nodes, materials, animations } = useGLTF(
    "/models/hrobot.glb"
  ) as unknown as GLTFResult;

  const { actions } = useAnimations(animations, group);

  const clickaction = () => {};

  /* ===== BODY ROTATION ===== */
  useFrame(() => {
    if (!bodyRef.current) return;

    let targetZ = 0;
    if (robotRotate === "left") targetZ = THREE.MathUtils.degToRad(20);
    else if (robotRotate === "right") targetZ = THREE.MathUtils.degToRad(-20);

    bodyRef.current.rotation.z = THREE.MathUtils.lerp(
      bodyRef.current.rotation.z,
      targetZ,
      0.05
    );
  });

  /* ===== HEAD FOLLOW MOUSE ===== */
  useFrame(() => {
    if (!headRef.current || !mouse?.current) return;

    const maxAngleY = -0.25 * headSensitivity; // الماكس مضروب بالحساسية
    const maxAngleX = -0.3 * headSensitivity;

    const targetRotationZ = mouse.current.x * maxAngleY;
    const targetRotationX = mouse.current.y * maxAngleX;

    // lerp سلس لتقليل التقطيش
    headRef.current.rotation.z = THREE.MathUtils.lerp(
      headRef.current.rotation.z,
      targetRotationZ,
      0.8
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      targetRotationX,
      0.8
    );
  });
  console.log(actions)

  /* ===== ANIMATION ===== */
  useEffect(() => {
    if (!actions) return;

    const action = actions["Take 001"];
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
            {/* ===== HEAD ===== */}
            <group name="bot_B_head" ref={headRef}>
              <mesh
                geometry={nodes.Mesh003.geometry}
                material={materials.bot_B_texture_blue}
              />
              <mesh
                geometry={nodes.Mesh003_1.geometry}
                material={materials.light_blue}
              />
              <mesh
                geometry={nodes.Mesh003_2.geometry}
                material={materials.glass}
              />
              <mesh
                geometry={nodes.Mesh003_3.geometry}
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
                geometry={nodes.Mesh.geometry}
                material={materials.bot_B_texture_blue}
              />
              <mesh
                geometry={nodes.Mesh_1.geometry}
                material={materials.light_blue}
              />
              <mesh
                geometry={nodes.Mesh_2.geometry}
                material={materials.glass}
              />
              <mesh
                geometry={nodes.bot_B_arm_l.geometry}
                material={materials.bot_B_texture_blue}
                position={[5.081, 0.547, -12.334]}
                rotation={[-Math.PI, 0, 0]}
                scale={-1}
              />
              <mesh
                geometry={nodes.bot_B_arm_r.geometry}
                material={materials.bot_B_texture_blue}
                position={[-5.068, 0.547, -12.334]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/hrobot.glb");