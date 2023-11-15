import { useState } from "react";
export default function useChangeCube() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [color, setColor] = useState("#fff");
  const startRotation = (dir) => {
    console.log("wowowowo");
    setRotationAngle((prevAngle) => {
      console.log("prevAngle:", prevAngle);
      const newAngle = prevAngle + (Math.PI / 2) * dir;
      console.log("newAngle:", newAngle);
      return newAngle;
    });
  };
  return { setRotationAngle, color, setColor, startRotation, rotationAngle };
}
