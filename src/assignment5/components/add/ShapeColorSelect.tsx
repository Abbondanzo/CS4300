import { hexToRgb, rgbToHex } from "@common/util/colors";
import React from "react";

interface Props {
  shapeColor: Canvas2D.Color;
  setShapeColor: (color: Canvas2D.Color) => void;
}

const ShapeColorSelect = ({ shapeColor, setShapeColor }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = event.target.value;
    const color = hexToRgb(hexValue);
    setShapeColor(color);
  };

  return (
    <input
      type="color"
      className="form-control"
      id="sx"
      value={rgbToHex(shapeColor)}
      onChange={onChange}
    />
  );
};

export default ShapeColorSelect;
