import React, {useRef, useMemo} from 'react'
import Airplane from './Airplane'
import BgSphere from './BgSphere'
import Clouds from "./Clouds"
import { Float, PerspectiveCamera,Line,useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from "three"

const NUM_POINTS = 200;

const Experience = () => {
    const linePoints =[
        new THREE.Vector3(0,0,30),
        new THREE.Vector3(0,0,20),
        new THREE.Vector3(0,0,10),
        new THREE.Vector3(0,0,-0),
        new THREE.Vector3(0,0,-10),
        new THREE.Vector3(-5,0,-20),
        new THREE.Vector3(0,3,-30),
        new THREE.Vector3(5,0,-40),
        new THREE.Vector3(0,-4,-50),
        new THREE.Vector3(-3,0,-60),
        new THREE.Vector3(0,5,-70),
        new THREE.Vector3(7,0,-80),
        new THREE.Vector3(-1,-1,-90),
        new THREE.Vector3(0,0,-100),
    ]

    const line = useMemo(()=>{
        return new THREE.CatmullRomCurve3(
                linePoints,
                false,
                "catmullrom",
                .5
        )
    })

    const lPoints = useMemo(()=>{
            return line.getPoints(NUM_POINTS)
    },[line])


    const cameraRef = useRef();
    const cloudRef = useRef();
    const scroll = useScroll();
    const clouds =[
        {id:1,position:[4,2,-10],rotation:[1,0,0],scale:3},
        {id:2,position:[-4,11,-20],rotation:[2,0,0],scale:2},
        {id:3,position:[4,10,-10],rotation:[0,0,0],scale:7},
        {id:4,position:[2,-10,-30],rotation:[2,0,0],scale:4},
        {id:5,position:[14,2,-40],rotation:[0,0,0],scale:12},
        {id:6,position:[-23,-12,-70],rotation:[0,0,0],scale:5},
        {id:7,position:[-1,-12,-80],rotation:[1,0,0],scale:2},
        {id:8,position:[3,2,-70],rotation:[2,0,0],scale:6},
        {id:9,position:[7,12,10],rotation:[1,0,0],scale:12},
        {id:10,position:[-5,3,-5],rotation:[2,3,0],scale:6},
        {id:11,position:[3,-6,0],rotation:[2,0,0],scale:2},
    ]

    useFrame((state,delta)=>{
        cloudRef.current.position.x += .07;
        cloudRef.current.position.y += .05;
        if(cloudRef.current.position.x > 30){
            cloudRef.current.position.x = -5;
            cloudRef.current.position.y = -10;
        }

        const currIdx = Math.min(Math.round(lPoints.length * scroll.offset),lPoints.length-1);
        console.log(currIdx);
        const curLocation = lPoints[currIdx];

        cameraRef.current.position.lerp(curLocation,delta * 24)
    })
  return (
    <>
    <BgSphere/>

<group ref={cameraRef}>
    <PerspectiveCamera makeDefault position={[0,1.5,10]}/>
    <Float>
    <Airplane rotation={[0,1.5,0]}/>
    </Float>
</group>
<group>
    <Line points={lPoints} lineWidth={10} color="red"/>
</group>

    {/* Clouds */}
<group ref={cloudRef}> 
{clouds.map(c=>(
    <Clouds key={c.id} position={c.position} rotation={c.rotation} scale={c.scale}/>
))}
</group>
    </>
  )
}

export default Experience