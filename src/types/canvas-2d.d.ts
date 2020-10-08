namespace Canvas2D {
  type ShapeType = "RECTANGLE" | "TRIANGLE" | "CIRCLE" | "STAR";

  interface Vector2 {
    x: number;
    y: number;
  }

  type Position = Vector2;

  interface Dimensions {
    width: number;
    height: number;
  }

  interface Color {
    red: number;
    blue: number;
    green: number;
  }

  type Translation = Vector2;

  interface Rotation {
    z: number;
  }

  type Scale = Vector2;

  interface Shape {
    type: ShapeType;
    position: Position;
    dimensions: Dimensions;
    color: Color;
    translation: Translation;
    rotation: Rotation;
    scale: Scale;
  }

  type Triangle = Shape & { type: "TRIANGLE" };
  type Rectangle = Shape & { type: "RECTANGLE" };
  type Circle = Shape & { type: "CIRCLE" };
  type Star = Shape & { type: "STAR" };
}
