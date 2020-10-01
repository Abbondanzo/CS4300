const buildBasicShape = (type: ShapeType) => (
  properties: Partial<BasicCanvas.Shape> = {}
): BasicCanvas.Shape => {
  return {
    type,
    position: {
      x: 0,
      y: 0,
    },
    dimensions: {
      width: 1,
      height: 1,
    },
    color: {
      red: 0,
      green: 0,
      blue: 0,
    },
    translation: { x: 0, y: 0 },
    rotation: { z: 0 },
    scale: { x: 1, y: 1 },
    ...properties,
  };
};

export const buildRectangle = buildBasicShape("RECTANGLE");
export const buildTriangle = buildBasicShape("TRIANGLE");
export const buildStar = buildBasicShape("STAR");
export const buildCircle = buildBasicShape("CIRCLE");
