import { useState } from 'react'
import { Environment, OrbitControls, ScrollControls, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Loader from "./Loader"
import Experience from "./Experience"
import './App.css'

function App() {
  const progress = useProgress();

  return (
    <div className="app">
      {progress.progress != 100 ? 
    <Loader/>
    :
    <Canvas>
      <color attach="background" args={["black"]}/>
      <Environment preset="sunset"/>
      {/* <OrbitControls enableZoom={false}/> */}

        <ScrollControls pages={5}>
          <Experience/>
        </ScrollControls>
    </Canvas>
}
    </div>
  )
}

export default App
