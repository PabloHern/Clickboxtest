import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiFillPlusCircle,
} from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import CartContext from "@/context/cart/CartContext";
import { useContext, useEffect } from "react";
export default function BoxUI({
  clickBox,
  cubes,
  setCubes,
  startRotation,
  setColor,
}) {
  const { addToCart, removeItem, products } = useContext(CartContext);
  const buttons = [
    { x: 0, y: 1.5, z: 0 },
    { x: 1.5, y: 0, z: 0 },
    { x: 0, y: -1.5, z: 0 },
    { x: -1.5, y: 0, z: 0 },
  ];
  const deleteCube = (index) => {
    const newArray = cubes.filter((obj) => obj !== cubes[index]);
    console.log(newArray);
    // Update the state with the new array
    setCubes(newArray);
    removeItem();
  };
  const createCube = (index) => {
    if (index == 0) {
      const newCubes = [
        ...cubes,
        [clickBox.position.x, clickBox.position.y + 3, clickBox.position.z],
      ];
      setCubes(newCubes);
      addToCart();
      console.log(products);
    }
    if (index == 1) {
      const newCubes = [
        ...cubes,
        [clickBox.position.x + 3, clickBox.position.y, clickBox.position.z],
      ];
      setCubes(newCubes);
      addToCart();
      console.log(products);
    }
    if (index == 2) {
      const newCubes = [
        ...cubes,
        [clickBox.position.x, clickBox.position.y - 3, clickBox.position.z],
      ];
      setCubes(newCubes);
      addToCart();
      console.log(products);
    }
    if (index == 3) {
      const newCubes = [
        ...cubes,
        [clickBox.position.x - 3, clickBox.position.y, clickBox.position.z],
      ];
      setCubes(newCubes);
      addToCart();
      console.log(products);
    }
  };

  return (
    <>
      <Html
        name="boxUiRotate"
        center
        position={[
          clickBox.position.x,
          clickBox.position.y - 1.5,
          clickBox.position.z,
        ]}
      >
        <div className="flex justify-between gap-40">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className=" w-12 cursor-pointer rounded-3xl bg-slate-400 p-1 text-white"
              onClick={(e) => startRotation(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className=" w-12 cursor-pointer rounded-3xl bg-slate-400 p-1 text-white"
              onClick={() => startRotation(1)}
            >
              <AiOutlineArrowRight />
            </button>
          </motion.div>
        </div>
      </Html>
      {buttons.map((button, index) => {
        return (
          <Html
            name={"boxUiAdd" + index}
            center
            position={[
              clickBox.position.x + button.x,
              clickBox.position.y + button.y,
              clickBox.position.z,
            ]}
          >
            <div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button
                  className=" z-10 flex w-12 cursor-pointer content-center rounded-3xl bg-slate-400 p-1 px-4 text-white"
                  onClick={() => createCube(index)}
                >
                  <AiFillPlusCircle />
                </button>
              </motion.div>
            </div>
          </Html>
        );
      })}
      <Html
        name="boxUiColorPicker"
        center
        position={[
          clickBox.position.x - 1.85,
          clickBox.position.y,
          clickBox.position.z,
        ]}
      >
        <motion.div
          className="mb-4 flex flex-col gap-4 rounded-3xl bg-slate-400 p-6"
          whileHover={{ scale: 1.1 }}
        >
          <h2>Color</h2>
          <div className="flex cursor-pointer flex-col gap-2">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className=" h-10 rounded-lg bg-white"
              onClick={() => setColor("#fff")}
            ></motion.div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className=" h-10 rounded-lg bg-red-600"
              onClick={() => setColor("#ff0000")}
            ></motion.div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className=" h-10 rounded-lg bg-green-600"
              onClick={() => setColor("#008000")}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div
          className="rounded-3xl bg-slate-400 p-6"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className="flex cursor-pointer flex-col gap-2"
              onClick={() => deleteCube(clickBox.name)}
            >
              <IoTrashBinOutline />
            </button>
          </motion.div>
        </motion.div>
      </Html>
    </>
  );
}
