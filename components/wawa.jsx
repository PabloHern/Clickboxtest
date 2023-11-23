"use client";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import * as THREE from "three";
import { USDZExporter } from "three/addons/exporters/USDZExporter.js";
import { useContext, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "@/components/Experience";
import Floor from "@/components/Floor";
import CartContext from "@/context/cart/CartContext";
export default function Wawa({ prices }) {
  const { products, setTypes } = useContext(CartContext);
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
      { binary: true },
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
  useEffect(() => {
    prices.forEach((element) => {
      console.log(element);
      setTypes(element);
    });
  }, [prices]);
  useEffect(() => {
    console.log(prices);
  }, []);
  const groupRef = useRef();
  return (
    <div className="h-screen w-screen">
      <div className=" absolute left-4 top-4 z-10 rounded-lg bg-slate-200 p-3">
        <h1 className=" z-20 font-bold text-gray-800">
          {prices[0].unit_amount / 100}
        </h1>
        <div className="flex gap-2">
          <button
            className="rounded-l bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
            onClick={() => downloadNormal()}
          >
            Export scene
          </button>
          <button
            className="rounded-l bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
            onClick={() => downloadApple()}
          >
            Export scene usdz
          </button>
          <button
            className="rounded-l bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
            onClick={async () => {
              const res = await fetch("/api/checkout", {
                method: "POST",
                body: JSON.stringify({
                  priceId: products[0].type.id,
                  quantity: products[0].quantity,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await res.json();
              window.location.href = data.url;
            }}
          >
            Go to checkout
          </button>
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
