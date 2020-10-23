import React from "react";

interface Props {
  title: string;
  value: Canvas3D.Vector3;
  step: number;
  disabled?: boolean;
  onChange(value: Canvas3D.Vector3): void;
}

const FormVector3 = ({
  title,
  value,
  step,
  disabled,
  onChange: propChange,
}: Props) => {
  const onChange = (key: keyof Canvas3D.Vector3) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = Number(event.target.value);
    propChange({ ...value, [key]: newValue });
  };

  return (
    <div className="form-row">
      <div className="col-md-12">
        {title} [
        <label style={{ cursor: "pointer" }} htmlFor={`form-${title}-x`}>
          X
        </label>
        ,{" "}
        <label style={{ cursor: "pointer" }} htmlFor={`form-${title}-y`}>
          Y
        </label>
        ,{" "}
        <label style={{ cursor: "pointer" }} htmlFor={`form-${title}-z`}>
          Z
        </label>
        ]
      </div>
      <div className="form-group col-md-4">
        <input
          type="number"
          className="form-control"
          id={`form-${title}-x`}
          disabled={disabled}
          step={step}
          value={value.x}
          onChange={onChange("x")}
        />
      </div>
      <div className="form-group col-md-4">
        <input
          type="number"
          className="form-control"
          id={`form-${title}-y`}
          disabled={disabled}
          step={step}
          value={value.y}
          onChange={onChange("y")}
        />
      </div>
      <div className="form-group col-md-4">
        <input
          type="number"
          className="form-control"
          id={`form-${title}-z`}
          disabled={disabled}
          step={step}
          value={value.z}
          onChange={onChange("z")}
        />
      </div>
    </div>
  );
};

export default FormVector3;
