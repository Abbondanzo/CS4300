import Card from "@common/components/Card";
import NavBar from "@common/components/NavBar";
import { buildShape } from "@common/model/canvas3DShapeBuilders";
import { objectEquality } from "@common/util/objects";
import React, { Component } from "react";

import { CameraSettings } from "../Camera";
import { LightSettings } from "../Light";
import AddShape from "./add/AddShape";
import Canvas from "./Canvas";
import {
  DEFAULT_CAMERA_SETTINGS,
  DEFAULT_LIGHT_SETTINGS,
  DEFAULT_SHAPES,
} from "./constants";
import EditShape from "./edit/EditShape";
import CameraSettingsForm from "./camera/CameraSettingsForm";
import ShapeList from "./list/ShapeList";
import LightSettingsForm from "./light/LightSettingsForm";

interface Props {}

interface State {
  shapes: Canvas3D.Shape[];
  selectedShapeIndex: number;
  addShapeConfig: Partial<Canvas3D.Shape>;
  cameraSettings: CameraSettings;
  lightSettings: LightSettings;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shapes: DEFAULT_SHAPES,
      selectedShapeIndex: 0,
      addShapeConfig: {},
      cameraSettings: DEFAULT_CAMERA_SETTINGS,
      lightSettings: DEFAULT_LIGHT_SETTINGS,
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

  renderLightCard() {
    return (
      <Card
        title="Light Settings"
        subtitle="Control the source of a point light"
      >
        <LightSettingsForm
          lightSettings={this.state.lightSettings}
          onChange={(lightSettings) => this.setState({ lightSettings })}
        />
      </Card>
    );
  }

  renderFOVCard() {
    return (
      <Card
        title="Camera Settings"
        subtitle="Performs translations of the world around the camera"
      >
        <CameraSettingsForm
          cameraSettings={this.state.cameraSettings}
          onChange={(cameraSettings) => this.setState({ cameraSettings })}
        />
      </Card>
    );
  }

  render() {
    const { shapes, cameraSettings, lightSettings } = this.state;
    return (
      <div className="container mb-4">
        <NavBar title="Lighting and Shading" />
        <div className="row">
          <div className="col">
            <div className="mb-4 w-100">
              <Canvas
                onClick={this.onAddShape}
                shapes={shapes}
                cameraSettings={cameraSettings}
                lightSettings={lightSettings}
              />
            </div>
            <div className="mb-4 w-100">{this.renderAddCard()}</div>
            <div className="mb-4 w-100">{this.renderListCard()}</div>
          </div>
          <div className="col">
            <div className="mb-4 w-100">{this.renderLightCard()}</div>
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
