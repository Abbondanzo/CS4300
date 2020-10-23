import React, { Component } from "react";

import { LightSettings } from "../../Light";

interface Props {
  lightSettings: LightSettings;
  onChange(lightSettings: LightSettings): void;
}

export default class LightSettingsForm extends Component<Props> {
  private onChange = (axis: keyof Canvas3D.Vector3) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    const newDirection = {
      ...this.props.lightSettings.direction,
      [axis]: value,
    };
    this.props.onChange({
      ...this.props.lightSettings,
      direction: newDirection,
    });
  };

  render() {
    const { x, y, z } = this.props.lightSettings.direction;
    return (
      <form>
        <div className="form-group row">
          <label htmlFor="dlrx" className="col-auto col-form-label">
            X
          </label>
          <div className="col">
            <input
              type="range"
              className="form-control form-control-range"
              id="dlrx"
              value={x}
              min="-1"
              max="1"
              step="0.1"
              onChange={this.onChange("x")}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="dlry" className="col-auto col-form-label">
            Y
          </label>
          <div className="col">
            <input
              type="range"
              className="form-control form-control-range"
              id="dlry"
              value={y}
              min="-1"
              max="1"
              step="0.1"
              onChange={this.onChange("y")}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="dlrz" className="col-auto col-form-label">
            Z
          </label>
          <div className="col">
            <input
              type="range"
              className="form-control form-control-range"
              id="dlrz"
              value={z}
              min="-1"
              max="1"
              step="0.1"
              onChange={this.onChange("z")}
            />
          </div>
        </div>
      </form>
    );
  }
}
