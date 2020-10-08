import React from "react";

import { toFirstUpperCase } from "../../utils/toFirstUpperCase";

interface Props {
  selected: Canvas2D.ShapeType;
  onSelect: (shape: Canvas2D.ShapeType) => void;
}

const SHAPE_TYPES: Canvas2D.ShapeType[] = [
  "RECTANGLE",
  "TRIANGLE",
  "STAR",
  "CIRCLE",
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
