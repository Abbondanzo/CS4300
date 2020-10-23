import FormColor from "@common/components/form/FormColor";
import FormVector3 from "@common/components/form/FormVector3";
import { truncate } from "@common/util/numbers";
import React, { Component } from "react";

interface Props {
  activeShape: Canvas3D.Shape;
  onUpdate: (shape: Canvas3D.Shape) => void;
  onDelete: () => void;
}

class EditShape extends Component<Props> {
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
    if (key === "rotation") {
      value = { x: value.x % 360, y: value.y % 360, z: value.z % 360 };
    }
    const { onUpdate, activeShape } = this.props;
    onUpdate({ ...activeShape, [key]: value });
  };

  private onColorUpdate = (color: Canvas3D.Color) => {
    const { onUpdate, activeShape } = this.props;
    onUpdate({ ...activeShape, color: color });
  };
}

export default EditShape;
