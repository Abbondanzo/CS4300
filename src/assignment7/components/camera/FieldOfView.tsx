import React from "react";

interface Props {
  fieldOfView: number; // degrees
  onChange(fieldOfView: number): void;
}

const FieldOfView = ({ fieldOfView, onChange: propChange }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    propChange(value);
  };
  return (
    <div className="form-row">
      <div className="form-group col-md-12">
        <label htmlFor="form-fov">Degrees</label>
        <input
          type="number"
          className="form-control"
          id="form-fov"
          value={fieldOfView}
          step="2"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FieldOfView;
