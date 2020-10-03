import NavBar from "@common/components/NavBar";
import { buildShape } from "@common/model/basicShapeBuilders";
import React, { Component } from "react";
import { objectEquality } from "../utils/objectEquality";
import Canvas from "./Canvas";

import { BLUE_RECTANGLE, RED_TRIANGLE } from "./constants";
import EditShape from "./form/EditShape";
import ShapeColorSelect from "./form/ShapeColorSelect";
import ShapeList from "./form/ShapeList";
import ShapeTypeSelect from "./form/ShapeTypeSelect";

interface Props {}

interface State {
  shapes: BasicCanvas.Shape[];
  selectedShapeIndex: number;
  addShapeType: ShapeType;
  addShapeColor: BasicCanvas.Color;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shapes: [BLUE_RECTANGLE, RED_TRIANGLE],
      selectedShapeIndex: 0,
      addShapeType: "RECTANGLE",
      addShapeColor: { red: 0, green: 1, blue: 0 },
    };
  }

  onAddShapeTypeSelect = (addShapeType: ShapeType) =>
    this.setState({ addShapeType });

  onAddShapeColorSelect = (addShapeColor: BasicCanvas.Color) =>
    this.setState({ addShapeColor });

  renderAddShapeCard() {
    return (
      <div className="row">
        <div className="col mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Shape</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Select a shape type before clicking on the canvas
              </h6>

              <ShapeTypeSelect
                selected={this.state.addShapeType}
                onSelect={this.onAddShapeTypeSelect}
              />
              <ShapeColorSelect
                shapeColor={this.state.addShapeColor}
                setShapeColor={this.onAddShapeColorSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  onShapeIndexSelect = (selectedShapeIndex: number) =>
    this.setState({ selectedShapeIndex });

  getActiveShape = () => this.state.shapes[this.state.selectedShapeIndex];

  onUpdateShape = (shape: BasicCanvas.Shape) => {
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
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Shape List</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Pick a shape to edit
              </h6>
              <ShapeList
                shapes={this.state.shapes}
                activeShapeIndex={this.state.selectedShapeIndex}
                onSelect={this.onShapeIndexSelect}
              />
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Shape Edits</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Perform edits on the selected shape
              </h6>
              {activeShape ? (
                <EditShape
                  activeShape={activeShape}
                  onUpdate={this.onUpdateShape}
                  onDelete={this.onDeleteShape}
                />
              ) : (
                <p>Please add a shape to continue</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  onAddShape = (translation: BasicCanvas.Translation) => {
    const shapeProperties = {
      color: this.state.addShapeColor,
      translation,
      scale: { x: 20, y: 20, z: 20 },
    };
    const newShape = buildShape(this.state.addShapeType, shapeProperties);
    const newShapes = [...this.state.shapes, newShape];
    this.setState({ shapes: newShapes });
  };

  render() {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <NavBar title="WebGL Transformations" />
          <Canvas onClick={this.onAddShape} shapes={this.state.shapes} />
        </div>
        {this.renderAddShapeCard()}
        {this.renderEditSection()}
      </div>
    );
  }
}

export default () => <App />;
