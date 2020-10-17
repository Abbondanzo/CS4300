import { hexToRgb, rgbToHex } from "@common/util/colors";
import React from "react";

interface Props {
  color: Canvas3D.Color;
  onChange(color: Canvas3D.Color): void;
}

const FormColor = ({ color, onChange: propChange }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = hexToRgb(event.target.value);
    propChange(color);
  };

  return (
    <div className="form-row">
      <div className="form-group col-md-12">
        <label htmlFor="form-color">Color</label>
        <input
          type="color"
          className="form-control"
          id="form-color"
          value={rgbToHex(color)}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormColor;
