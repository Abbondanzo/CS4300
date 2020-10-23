import { toFirstUpperCase } from "@common/util/strings";
import React from "react";

interface Props {
  selected: Canvas3D.ShapeType;
  onSelect: (shape: Canvas3D.ShapeType) => void;
}

const SHAPE_TYPES: Canvas3D.ShapeType[] = [
  "RECTANGLE",
  "TRIANGLE",
  "STAR",
  "CIRCLE",
  "CUBE",
];

const ShapeTypeSelect = ({ selected, onSelect }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLFieldSetElement>) => {
    const { value } = event.target as any;
    onSelect(value);
  };

  return (
    <fieldset
      name="shape"
      className="form-group"
      onChange={onChange}
      style={{ textAlign: "center" }}
    >
      {SHAPE_TYPES.map((shapeType) => {
        const id = `radio-${shapeType.toLowerCase()}`;
        return (
          <div key={id} className="form-check form-check-inline">
            <input
              id={id}
              className="form-check-input"
              type="radio"
              value={shapeType}
              checked={shapeType === selected}
              onChange={() => {}}
            />
            <label className="form-check-label" htmlFor={id}>
              {toFirstUpperCase(shapeType)}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default ShapeTypeSelect;
