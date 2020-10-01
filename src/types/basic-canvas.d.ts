type ShapeType = "RECTANGLE" | "TRIANGLE" | "CIRCLE" | "STAR";

namespace BasicCanvas {
  interface TwoDimensional {
    x: number;
    y: number;
  }

  type Position = TwoDimensional;

  interface Dimensions {
    width: number;
    height: number;
  }

  interface Color {
    red: number;
    blue: number;
    green: number;
  }

  type Translation = TwoDimensional;

  interface Rotation {
    z: number;
  }

  type Scale = TwoDimensional;

  interface Shape {
    type: ShapeType;
    position: Position;
    dimensions: Dimensions;
    color: Color;
    translation: Translation;
    rotation: Rotation;
    scale: Scale;
  }
}

type Triangle = BasicCanvas.Shape & { type: "TRIANGLE" };
type Rectangle = BasicCanvas.Shape & { type: "RECTANGLE" };
type Circle = BasicCanvas.Shape & { type: "CIRCLE" };
type Star = BasicCanvas.Shape & { type: "STAR" };
