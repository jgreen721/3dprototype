import React, {useRef} from 'react'
import { Sphere } from '@react-three/drei'
import { LayerMaterial,Gradient } from 'lamina'
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'

const BgSphere = () => {
  const bgRef = useRef()

 
  return (
    <Sphere ref={bgRef} scale={500}>
        <LayerMaterial side={THREE.DoubleSide}>
            <Gradient colorA="lightblue" colorB="white" axes={"y"} start={0} end={.5}/>
        </LayerMaterial>
    </Sphere>
  )
}

export default BgSphere