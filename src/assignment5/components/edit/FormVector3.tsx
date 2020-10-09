import React from "react";

interface Props {
  title: string;
  value: Canvas3D.Vector3;
  step: number;
  onChange(value: Canvas3D.Vector3): void;
}

const FormVector3 = ({ title, value, step, onChange: propChange }: Props) => {
  const onChange = (key: keyof Canvas3D.Vector3) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = Number(event.target.value);
    propChange({ ...value, [key]: newValue });
  };

  return (
    <div className="form-row">
      <div className="col-md-12">{title}</div>
      <div className="form-group col-md-4">
        <label htmlFor={`form-${title}-x`}>X:</label>
        <input
          type="number"
          className="form-control"
          id={`form-${title}-x`}
          step={step}
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
          step={step}
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
          step={step}
          value={value.z}
          onChange={onChange("z")}
        />
      </div>
    </div>
  );
};

export default FormVector3;
