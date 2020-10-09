import { hexToRgb, rgbToHex } from "@common/util/colors";
import { degreesToRadians, radiansToDegrees } from "@common/util/degrees";
import { truncate } from "@common/util/numbers";
import React, { Component } from "react";
import FormColor from "./FormColor";
import FormVector3 from "./FormVector3";

interface Props {
  activeShape: Canvas3D.Shape;
  onUpdate: (shape: Canvas3D.Shape) => void;
  onDelete: () => void;
}

class EditShape extends Component<Props> {
  onFieldChange = (
    shapeAttr: "translation" | "scale" | "rotation",
    stateItemKey: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = this.props.activeShape[shapeAttr];
    const eventValue = truncate(Number(event.target.value));
    const newValue = { ...currentValue, [stateItemKey]: eventValue };
    const newShape = { ...this.props.activeShape, [shapeAttr]: newValue };
    this.props.onUpdate(newShape);
  };

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
    const { translation, scale, rotation, color } = this.props.activeShape;

    return (
      <form>
        <FormVector3
          title="Translation"
          value={translation}
          step={5}
          onChange={this.onVectorUpdate("translation")}
        />
        <FormVector3
          title="Scale"
          value={scale}
          step={0.5}
          onChange={this.onVectorUpdate("scale")}
        />
        <FormVector3
          title="Rotation"
          value={rotation}
          step={2}
          onChange={this.onVectorUpdate("rotation")}
        />
        <FormColor color={color} onChange={this.onColorUpdate} />
        {this.renderDeleteButton()}
      </form>
    );
  }

  private onVectorUpdate = (key: "translation" | "scale" | "rotation") => (
    value: Canvas3D.Vector3
  ) => {
    const { onUpdate, activeShape } = this.props;
    onUpdate({ ...activeShape, [key]: value });
  };

  private onColorUpdate = (color: Canvas3D.Color) => {
    const { onUpdate, activeShape } = this.props;
    onUpdate({ ...activeShape, color: color });
  };
}

export default EditShape;
