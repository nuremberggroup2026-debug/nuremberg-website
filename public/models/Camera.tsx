"use client";


import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { JSX } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    ['#CAM0001_Battery_Check_#CAM0001_Textures_0']: THREE.Mesh
    ['#CAM0001_Spool_#CAM0001_Textures_0']: THREE.Mesh
    ['#CAM0001_Film_Advance_#CAM0001_Textures_0']: THREE.Mesh
    ['#CAM0001_Shutter_#CAM0001_Textures_0']: THREE.Mesh
    ['#CAM0001_Shutter_Speed_#CAM0001_Textures_0']: THREE.Mesh
    ['#CAM0001_Body_#CAM0001_Textures_0']: THREE.Mesh
  }
  materials: {
    CAM0001_Textures: THREE.MeshStandardMaterial
  }
}

export function Camera(props: JSX.IntrinsicElements['group']) {
  const gltf = useGLTF('/models/camera.glb') as unknown as GLTFResult
  const { nodes, materials } = gltf

  const fixedMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: materials.CAM0001_Textures.map,
      normalMap: materials.CAM0001_Textures.normalMap,
      roughnessMap: materials.CAM0001_Textures.roughnessMap,
      metalnessMap: materials.CAM0001_Textures.metalnessMap,
      transparent: false,
      opacity: 1,
      side: THREE.DoubleSide,
    })
  }, [materials])

  return (
    <group {...props} dispose={null} scale={15} position={[0, -0.5, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh receiveShadow castShadow geometry={nodes['#CAM0001_Body_#CAM0001_Textures_0'].geometry} material={fixedMaterial} />
        <mesh receiveShadow castShadow geometry={nodes['#CAM0001_Battery_Check_#CAM0001_Textures_0'].geometry} material={fixedMaterial} position={[0.05, 0.001, 0.072]} />
        <mesh receiveShadow castShadow geometry={nodes['#CAM0001_Spool_#CAM0001_Textures_0'].geometry} material={fixedMaterial} position={[0.05, 0.001, 0.075]} />
        <mesh receiveShadow castShadow geometry={nodes['#CAM0001_Film_Advance_#CAM0001_Textures_0'].geometry} material={fixedMaterial} position={[-0.057, 0.001, 0.077]} />
        <mesh receiveShadow castShadow geometry={nodes['#CAM0001_Shutter_#CAM0001_Textures_0'].geometry} material={fixedMaterial} position={[-0.035, -0.006, 0.076]} />
        <mesh receiveShadow castShadow geometry={nodes['#CAM0001_Shutter_Speed_#CAM0001_Textures_0'].geometry} material={fixedMaterial} position={[-0.057, 0.001, 0.073]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/camera.glb')