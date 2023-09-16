import React, {useRef,useState,useLayoutEffect, useMemo} from 'react'
import Airplane from './Airplane'
import BgSphere from './BgSphere'
import Clouds from "./Clouds"
import { Float, PerspectiveCamera,Line,useScroll,Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from "three"

const NUM_POINTS = 200;

const Experience = () => {
    const [opacityOne,setOpacityOne] = useState(0)
    const [opacityTwo,setOpacityTwo] = useState(0)
    const [opacityThree,setOpacityThree] = useState(0)
    const [opacityFour,setOpacityFour] = useState(0)
    const [opacityFive,setOpacityFive] = useState(0)
    const linePoints =[
        new THREE.Vector3(0,0,75),
        new THREE.Vector3(0,10,20),
        new THREE.Vector3(-20,0,10),
        new THREE.Vector3(0,0,-0),
        new THREE.Vector3(0,0,-50),
        new THREE.Vector3(-47,0,-100),
        new THREE.Vector3(0,30,-150),
        new THREE.Vector3(50,0,-200),
        new THREE.Vector3(0,-40,-250),
        new THREE.Vector3(-10,0,-300),
        new THREE.Vector3(0,50,-350),
        new THREE.Vector3(25,0,-400),
        new THREE.Vector3(-1,-10,-450),
        new THREE.Vector3(0,0,-495),
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

    const shape = useMemo(()=>{
        const shape = new THREE.Shape();
        shape.moveTo(-.5,0);
        shape.lineTo(.5,0);

        return shape;
    })


    const cameraRef = useRef();
    const cloudRef = useRef();
    const planeRef = useRef();
    const scroll = useScroll();
    const clouds =[
        {id:1,position:[4,2,-10],rotation:[1,0,0],scale:3},
        {id:2,position:[-14,11,-260],rotation:[2,0,0],scale:2},
        {id:3,position:[4,30,-300],rotation:[0,0,0],scale:7},
        {id:4,position:[20,-50,-230],rotation:[2,0,0],scale:4},
        {id:5,position:[14,2,-40],rotation:[0,0,0],scale:12},
        {id:6,position:[-23,-12,-300],rotation:[0,0,0],scale:5},
        {id:7,position:[-21,-12,-80],rotation:[1,0,0],scale:2},
        {id:8,position:[3,2,-70],rotation:[2,0,0],scale:6},
        {id:9,position:[7,12,10],rotation:[1,0,0],scale:12},
        {id:10,position:[-25,3,-5],rotation:[2,3,0],scale:6},
        {id:11,position:[17,20,-160,],rotation:[2,0,0],scale:2},
        {id:12,position:[-13,-10,-206,],rotation:[2,0,0],scale:2},
        {id:13,position:[13,-12,-126,],rotation:[2,0,0],scale:4},
        {id:14,position:[13,14,-106,],rotation:[2,0,0],scale:12},
        {id:15,position:[20,-6,-130],rotation:[2,0,0],scale:20},
        {id:16,position:[6,-2,-220],rotation:[2,0,0],scale:11},
        {id:17,position:[10,-6,-325],rotation:[2,0,0],scale:7},
        {id:18,position:[7,-6,-415],rotation:[2,0,0],scale:7},
        {id:19,position:[10,-6,-415],rotation:[2,0,0],scale:12},
        {id:20,position:[-35,-10,-480],rotation:[2,0,0],scale:37},
        {id:21,position:[28,-6,-415],rotation:[2,0,0],scale:7},
        {id:22,position:[-35,6,-415],rotation:[2,0,0],scale:17},
        {id:23,position:[12,-10,-445],rotation:[2,0,0],scale:20},
    ]



    let lastPosition=new THREE.Vector3();
    let hasSpun = false;
    let counter = 0;

    useFrame((state,delta)=>{
        // cloudRef.current.position.x += .07;
        // cloudRef.current.position.y += .05;
        // if(cloudRef.current.position.x > 30){
        //     cloudRef.current.position.x = -5;
        //     cloudRef.current.position.y = -10;
        // }

        const currIdx = Math.min(Math.round(lPoints.length * scroll.offset),lPoints.length-1);
        // console.log(currIdx);
        // if(lastPosition.x > curLocation.x)
        const curLocation = lPoints[currIdx];
        // console.log(lastPosition.x,curLocation.x)
        if(lastPosition.x > curLocation.x){
            planeRef.current.rotation.z -= .02;
        }
        else if(lastPosition.x < curLocation.x){
            planeRef.current.rotation.z += .02;

        }
        lastPosition = curLocation;


        cameraRef.current.position.lerp(curLocation,delta * 24)
        if(Math.abs(curLocation.z) > 250 && !hasSpun){
            // console.log('spin damn you!!')
            planeRef.current.rotation.z += .1;
                counter++;
                console.log(counter)
                if(counter > 60){
                    hasSpun = true;
                    planeRef.current.rotation.z = 0;
                }
            }


            setOpacityOne(scroll.range(0/5,1/5) * 5)
            setOpacityTwo(scroll.range(1/5,1/5) * 5)
            setOpacityThree(scroll.range(2/5,1/5) * 5)
            setOpacityFour(scroll.range(2.5/5,1/5) * 5)
            setOpacityFive(scroll.range(4/5,1/5) * 5)
        
    })

    // useLayoutEffect(()=>{
    //       setOpacityOne(scroll.range(0/5,1/5) * 5)
    //         setOpacityTwo(scroll.range(1/5,1/5) * 5)
    //         setOpacityThree(scroll.range(2/5,1/5) * 5)
    //         setOpacityFour(scroll.range(2.5/5,1/5) * 5)
    //         setOpacityFive(scroll.range(4/5,1/5) * 5)
    //         console.log("updating opacity")

    // },[])



    const messages=[
        {id:1,message:"Welcome to AirJustin",blurb:"We hope you enjoy your flight!",position:[-12,10,15]},
        {id:2,message:"Our first stop",blurb:"This is where it all started! Codecademies and bootcamp!🌎",position:[8,2,-30]},
        {id:3,message:"More practice, more learning...",blurb:"Digest the course material, plus learn more and keep advancing my skills!🧑‍💻",position:[-35,10,-140]},
        {id:4,message:"Builds and deployments",blurb:"Finally putting things into prod mode! 😎",position:[25,-15,-240]},
        {id:5,message:"Now here comes your part",blurb:"Ready to help and contribute to a company, as well as grow my skills!🥳",position:[10,45,-400]},
        {id:6,message:"The End",blurb:"We cant wait to see you again!✈️",position:[0,2,-499]},
    ]

    // useLayoutEffect=(()=>{
      
    // })

  return (
    <>
    <BgSphere/>
<group>
    {messages.map((m,idx)=>(
        <group key={m.id} position={m.position}>
        <Text fontSize={.9} color="black" material-opacity={idx == 0 ? opacityOne : idx == 1 ? opacityTwo : idx == 2 ? opacityThree : idx == 3 ? opacityFour : idx == 4 ? opacityFour : opacityFive}>
            {m.message}
        </Text>
        <Text color="black" position={[0,-1,0]}>
        {/* // fontSize={.5} material-opacity={idx == 0 ? opacityOne : idx == 1 ? opacityTwo : idx == 2 ? opacityThree : idx == 3 ? opacityFour : idx == 4 ? opacityFour :opacityFive}  */}
            {m.blurb}
        </Text>
        </group>
    ))}
</group>
<group ref={cameraRef}>
    <PerspectiveCamera makeDefault fov={30} position={[0,-.5,35]}/>
    <Float floatIntensity={3} speed={4.5}>
        <group ref={planeRef}> 
    <Airplane rotation={[0,1.5,0]}/>
    </group>
    </Float>
</group>
<group position={[0,-2,0]}>
     <mesh>
        <extrudeGeometry args={
            [shape,
            {
                steps: NUM_POINTS,
                depth: 16,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 1,
                extrudePath:line
            }
        ]
        }/>
    </mesh> 
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