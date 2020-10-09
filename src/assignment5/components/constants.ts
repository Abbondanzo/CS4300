import { buildShape } from "@common/model/canvas3DShapeBuilders";
import { hexToRgb } from "@common/util/colors";

const ORIGIN: Canvas3D.Position = { x: 0, y: 0, z: 0 };
const SIZE_ONE: Canvas3D.Dimensions = { width: 1, height: 1, depth: 1 };
const RED_RGB = hexToRgb("#FF0000");
const BLUE_RGB = hexToRgb("#0000FF");

export const BLUE_RECTANGLE = buildShape("RECTANGLE", {
  position: ORIGIN,
  dimensions: SIZE_ONE,
  color: BLUE_RGB,
  translation: { x: -15, y: 0, z: -20 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 10, y: 10, z: 10 },
});

export const RED_TRIANGLE = buildShape("TRIANGLE", {
  position: ORIGIN,
  dimensions: SIZE_ONE,
  color: RED_RGB,
  translation: { x: 15, y: 0, z: -20 },
  scale: { x: 10, y: 10, z: 10 },
  rotation: { x: 0, y: 0, z: 180 },
});
