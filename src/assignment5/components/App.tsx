import NavBar from "@common/components/NavBar";
import { buildShape } from "@common/model/basicShapeBuilders";
import { objectEquality } from "@common/util/objects";
import React, { Component } from "react";

import Canvas from "./Canvas";
import { BLUE_RECTANGLE, RED_TRIANGLE } from "./constants";
import EditShape from "./edit/EditShape";
import ShapeColorSelect from "./add/ShapeColorSelect";
import ShapeList from "./form/ShapeList";
import ShapeTypeSelect from "./add/ShapeTypeSelect";
import Card from "@common/components/Card";
import AddShape from "./add/AddShape";

interface Props {}

interface State {
  shapes: Canvas3D.Shape[];
  selectedShapeIndex: number;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shapes: [],
      selectedShapeIndex: 0,
    };
  }

  renderAddShapeCard() {
    return (
      <div className="row">
        <div className="col mb-4">
          <div className="card">
            <Card
              title="Add Shape"
              subtitle="Select a shape type before clicking on the canvas"
            >
              <AddShape onConfigChange={console.log} />
            </Card>
          </div>
        </div>
      </div>
    );
  }

  onShapeIndexSelect = (selectedShapeIndex: number) =>
    this.setState({ selectedShapeIndex });

  getActiveShape = () => this.state.shapes[this.state.selectedShapeIndex];

  onUpdateShape = (shape: Canvas3D.Shape) => {
    const { shapes, selectedShapeIndex } = this.state;
    // Short circuit if both equal
    if (objectEquality(shapes[selectedShapeIndex], shape)) {
      return;
    }
    const newShapes = [...shapes];
    newShapes[selectedShapeIndex] = shape;
    this.setState({ shapes: newShapes });
  };

  onDeleteShape = () => {
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

  renderEditSection() {
    const activeShape = this.getActiveShape();
    return (
      <div className="card-deck">
        <Card title="Shape List" subtitle="Pick a shape to edit">
          <div style={{ maxHeight: 400, overflow: "auto" }}>
            <ShapeList
              shapes={this.state.shapes}
              activeShapeIndex={this.state.selectedShapeIndex}
              onSelect={this.onShapeIndexSelect}
            />
          </div>
        </Card>
        <Card
          title="Shape Edits"
          subtitle="Perform edits on the selected shape"
        >
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
      </div>
    );
  }

  onAddShape = (translation: Canvas3D.Translation) => {
    console.log(translation);
    // const shapeProperties = {
    //   color: this.state.addShapeColor,
    //   translation,
    //   scale: { x: 20, y: 20, z: 20 },
    // };
    // const newShape = buildShape(this.state.addShapeType, shapeProperties);
    // const newShapes = [...this.state.shapes, newShape];
    // this.setState({ shapes: newShapes });
  };

  render() {
    return (
      <div className="mb-4" style={{ margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <NavBar title="3D Perspective" />
          <Canvas onClick={this.onAddShape} shapes={this.state.shapes} />
        </div>
        {this.renderAddShapeCard()}
        {this.renderEditSection()}
      </div>
    );
  }
}

export default () => <App />;
