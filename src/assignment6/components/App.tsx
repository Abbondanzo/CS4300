import Card from "@common/components/Card";
import NavBar from "@common/components/NavBar";
import { buildShape } from "@common/model/canvas3DShapeBuilders";
import { objectEquality } from "@common/util/objects";
import React, { Component } from "react";

import { CameraSettings } from "../Camera";
import AddShape from "./add/AddShape";
import Canvas from "./Canvas";
import { BLUE_RECTANGLE, GREEN_CUBE, RED_TRIANGLE } from "./constants";
import EditShape from "./edit/EditShape";
import CameraSettingsForm from "./form/CameraSettingsForm";
import ShapeList from "./form/ShapeList";

interface Props {}

interface State {
  shapes: Canvas3D.Shape[];
  selectedShapeIndex: number;
  addShapeConfig: Partial<Canvas3D.Shape>;
  cameraSettings: CameraSettings;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shapes: [BLUE_RECTANGLE, RED_TRIANGLE, GREEN_CUBE],
      selectedShapeIndex: 0,
      addShapeConfig: {},
      cameraSettings: {
        fovDegrees: 90,
        translation: { x: 0, y: 0, z: 50 },
        target: { x: 0, y: 0, z: 0 },
      },
    };
  }

  renderAddCard() {
    return (
      <Card
        title="Add Shape"
        subtitle="Select a shape type before clicking on the canvas"
      >
        <AddShape onConfigChange={this.onConfigChange} />
      </Card>
    );
  }

  private onConfigChange = (addShapeConfig: Partial<Canvas3D.Shape>) =>
    this.setState({ addShapeConfig });

  renderListCard() {
    return (
      <Card title="Shape List" subtitle="Pick a shape to edit">
        <div style={{ maxHeight: 540, overflow: "auto" }}>
          <ShapeList
            shapes={this.state.shapes}
            activeShapeIndex={this.state.selectedShapeIndex}
            onSelect={this.onShapeIndexSelect}
          />
        </div>
      </Card>
    );
  }

  private onShapeIndexSelect = (selectedShapeIndex: number) =>
    this.setState({ selectedShapeIndex });

  renderEditCard() {
    const activeShape = this.getActiveShape();

    return (
      <Card title="Shape Edits" subtitle="Perform edits on the selected shape">
        {activeShape ? (
          <EditShape
            activeShape={activeShape}
            onUpdate={this.onUpdateShape}
            onDelete={this.onDeleteShape}
          />
        ) : (
          <p>Please add a shape to continue</p>
        )}
      </Card>
    );
  }

  private getActiveShape = () =>
    this.state.shapes[this.state.selectedShapeIndex];

  private onUpdateShape = (shape: Canvas3D.Shape) => {
    const { shapes, selectedShapeIndex } = this.state;
    // Short circuit if both equal
    if (objectEquality(shapes[selectedShapeIndex], shape)) {
      return;
    }
    const newShapes = [...shapes];
    newShapes[selectedShapeIndex] = shape;
    this.setState({ shapes: newShapes });
  };

  private onDeleteShape = () => {
    const shapes = [...this.state.shapes];
    shapes.splice(this.state.selectedShapeIndex, 1);
    let selectedShapeIndex = this.state.selectedShapeIndex;
    if (selectedShapeIndex >= shapes.length) {
      selectedShapeIndex = Math.max(shapes.length - 1, 0);
    }
    this.setState({
      shapes,
      selectedShapeIndex,
    });
  };

  renderFOVCard() {
    return (
      <Card title="Camera Settings">
        <CameraSettingsForm
          cameraSettings={this.state.cameraSettings}
          onChange={(cameraSettings) => this.setState({ cameraSettings })}
        />
      </Card>
    );
  }

  render() {
    return (
      <div className="container mb-4">
        <NavBar title="Moving the Camera in WebGL" />
        <div className="row">
          <div className="col">
            <Canvas
              onClick={this.onAddShape}
              shapes={this.state.shapes}
              cameraSettings={this.state.cameraSettings}
            />
            {this.renderListCard()}
          </div>
          <div className="col">
            <div className="mb-4 w-100">{this.renderAddCard()}</div>
            <div className="mb-4 w-100">{this.renderFOVCard()}</div>
            <div className="w-100">{this.renderEditCard()}</div>
          </div>
        </div>
      </div>
    );
  }

  private onAddShape = (translation: Canvas3D.Translation) => {
    const shape = buildShape(this.state.addShapeConfig.type, {
      ...this.state.addShapeConfig,
      translation,
      rotation: { x: 0, y: 0, z: 180 },
      scale: { x: 20, y: 20, z: 20 },
    });
    const newShapes = [...this.state.shapes, shape];
    this.setState({ shapes: newShapes });
  };
}

export default () => <App />;
