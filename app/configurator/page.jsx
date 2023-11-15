"use client";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import * as THREE from "three";
import { USDZExporter } from "three/addons/exporters/USDZExporter.js";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "@/components/Experience";
import Floor from "@/components/Floor";
export default function Page() {
  const downloadNormal = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      groupRef.current,
      function (result) {
        saveArrayBuffer(result, "blocks.glb");
      },
      // called when there is an error in the generation
      function (error) {
        console.log(error);
      },
      { binary: true }
    );
  };
  const downloadApple = async () => {
    let groupClone = groupRef.current.clone();
    groupClone.traverse((node) => {
      if (node.material !== undefined) {
        node.material.side = THREE.FrontSide;
      }
    });
    const exporter = new USDZExporter();
    const arraybuffer = await exporter.parse(groupClone);
    const blob = new Blob([arraybuffer], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround, see #6594
    link.href = URL.createObjectURL(blob);
    link.download = "blocks.usdz";
    link.click();
  };

  function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: "application/octet-stream" }), filename);
  }
  function save(blob, filename) {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround, see #6594
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
  // const addTest = () => {
  //   const newCube = [0, 3, -3];
  //   addCube(newCube);
  //   console.log(cubes);
  // };
  const groupRef = useRef();
  return (
    <div className="w-screen h-screen">
      <div className=" p-3 rounded-lg z-10 absolute top-4 left-4 bg-slate-200">
        <h1 className=" text-gray-800 font-bold z-20">Create your configuration</h1>
        <h3 className="text-gray-800 font-bold z-20">Max number of cubes: 5</h3>
        <div className="flex gap-2">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => downloadNormal()}>Export scene</button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => downloadApple()}>Export scene usdz</button>
        {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => addTest()}>TEST</button> */}
        </div>
      </div>
      <Canvas dpr={[1, 1.5]} camera={{ fov: 60, position: [0, 2, 15] }}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />
        <Floor></Floor>
        <Experience groupRef={groupRef}></Experience>
      </Canvas>
    </div>
  );
}
