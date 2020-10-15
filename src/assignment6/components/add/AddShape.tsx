import React, { useEffect, useState } from "react";

import ShapeColorSelect from "./ShapeColorSelect";
import ShapeTypeSelect from "./ShapeTypeSelect";

type AddShapeConfig = Pick<Canvas3D.Shape, "type" | "color">;

interface Props {
  onConfigChange(config: AddShapeConfig): void;
}

const AddShape = ({ onConfigChange }: Props) => {
  const [type, setType] = useState<Canvas3D.ShapeType>("RECTANGLE");
  const [color, setColor] = useState<Canvas3D.Color>({
    red: 0,
    green: 1,
    blue: 0,
  });

  useEffect(() => {
    onConfigChange({ type, color });
  }, [type, color]);

  return (
    <>
      <ShapeTypeSelect selected={type} onSelect={setType} />
      <ShapeColorSelect shapeColor={color} setShapeColor={setColor} />
    </>
  );
};

export default AddShape;
