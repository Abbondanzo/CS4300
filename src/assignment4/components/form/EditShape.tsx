import { hexToRgb, rgbToHex } from "@common/util/colors";
import { degreesToRadians, radiansToDegrees } from "@common/util/degrees";
import { truncate } from "@common/util/numbers";
import React, { Component } from "react";

interface Props {
  activeShape: Canvas2D.Shape;
  onUpdate: (shape: Canvas2D.Shape) => void;
  onDelete: () => void;
}

class EditShape extends Component<Props> {
  onFieldChange = (
    shapeAttr: "translation" | "scale",
    stateItemKey: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = this.props.activeShape[shapeAttr];
    const eventValue = truncate(Number(event.target.value));
    const newValue = { ...currentValue, [stateItemKey]: eventValue };
    const newShape = { ...this.props.activeShape, [shapeAttr]: newValue };
    this.props.onUpdate(newShape);
  };

  onRotationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const newShape = {
      ...this.props.activeShape,
      rotation: { z: degreesToRadians(value) },
    };
    this.props.onUpdate(newShape);
  };

  renderTextInput() {
    const { translation, scale, rotation } = this.props.activeShape;

    return (
      <>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="tx">Translation X:</label>
            <input
              type="number"
              className="form-control"
              id="tx"
              step="5"
              value={translation.x}
              onChange={this.onFieldChange("translation", "x")}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="ty">Translation Y:</label>
            <input
              type="number"
              className="form-control"
              id="ty"
              step="5"
              value={translation.y}
              onChange={this.onFieldChange("translation", "y")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="sx">Scale X:</label>
            <input
              type="number"
              className="form-control"
              id="sx"
              step="0.5"
              value={scale.x}
              onChange={this.onFieldChange("scale", "x")}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="sy">Scale Y:</label>
            <input
              type="number"
              className="form-control"
              id="sy"
              step="0.5"
              value={scale.y}
              onChange={this.onFieldChange("scale", "y")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="rz">Rotation Z:</label>
            <input
              type="number"
              className="form-control"
              id="rz"
              step="2"
              value={radiansToDegrees(rotation.z)}
              onChange={this.onRotationChange}
            />
          </div>
        </div>
      </>
    );
  }

  onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = event.target.value;
    const color = hexToRgb(hexValue);
    const newShape = { ...this.props.activeShape, color };
    this.props.onUpdate(newShape);
  };

  renderColorInput() {
    const { color } = this.props.activeShape;
    return (
      <div className="form-row">
        <div className="form-group col-md-12">
          <label htmlFor="sx">Color</label>
          <input
            type="color"
            className="form-control"
            id="sx"
            value={rgbToHex(color)}
            onChange={this.onColorChange}
          />
        </div>
      </div>
    );
  }

  renderDeleteButton() {
    const onClick = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.props.onDelete();
    };
    return (
      <div className="form-row">
        <div className="form-group col-md-12">
          <button
            id="addShape"
            className="btn btn-secondary btn-block"
            onClick={onClick}
          >
            Delete Shape
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <form>
        {this.renderTextInput()}
        {this.renderColorInput()}
        {this.renderDeleteButton()}
      </form>
    );
  }
}

export default EditShape;
