import { toFirstUpperCase } from "@common/util/strings";
import React from "react";

interface Props {
  shapes: Canvas3D.Shape[];
  activeShapeIndex: number;
  onSelect: (shapeIndex: number) => void;
}

const ShapeList = ({ shapes, activeShapeIndex, onSelect }: Props) => {
  return (
    <div className="list-group list-group-flush">
      {shapes.map((shape, index) => {
        const classList = ["list-group-item", "list-group-item-action"];
        if (index === activeShapeIndex) {
          classList.push("active");
        }
        return (
          <button
            key={index}
            className={classList.join(" ")}
            onClick={() => onSelect(index)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0">{toFirstUpperCase(shape.type)}</p>
              <small>
                X: {shape.translation.x} Y: {shape.translation.y} Z:{" "}
                {shape.translation.z}
              </small>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ShapeList;
