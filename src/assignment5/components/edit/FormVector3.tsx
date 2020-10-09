import React from "react";

interface Props {
  title: string;
  value: Canvas3D.Vector3;
  onChange(value: Canvas3D.Vector3): void;
}

const FormVector3 = ({ title, value, onChange: propChange }: Props) => {
  const onChange = (key: keyof Canvas3D.Vector3) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = Number(event.target.value);
    propChange({ ...value, [key]: newValue });
  };

  return (
    <div className="form-row">
      <span>{title}</span>
      <div className="form-group col-md-4">
        <label htmlFor={`form-${title}-x`}>X:</label>
        <input
          type="number"
          className="form-control"
          id={`form-${title}-x`}
          step="5"
          value={value.x}
          onChange={onChange("x")}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor={`form-${title}-y`}>Y:</label>
        <input
          type="number"
          className="form-control"
          id={`form-${title}-y`}
          step="5"
          value={value.y}
          onChange={onChange("y")}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor={`form-${title}-z`}>Z:</label>
        <input
          type="number"
          className="form-control"
          id={`form-${title}-z`}
          step="5"
          value={value.z}
          onChange={onChange("z")}
        />
      </div>
    </div>
  );
};

export default FormVector3;
