import {
  buildRectangle,
  buildTriangle,
} from "@common/model/basicShapeBuilders";
import { hexToRgb } from "@common/util/colors";

const ORIGIN: BasicCanvas.Position = { x: 0, y: 0 };
const SIZE_ONE: BasicCanvas.Dimensions = { width: 1, height: 1 };
const RED_RGB = hexToRgb("#FF0000");
const BLUE_RGB = hexToRgb("#0000FF");

export const BLUE_RECTANGLE = buildRectangle({
  position: ORIGIN,
  dimensions: SIZE_ONE,
  color: BLUE_RGB,
  translation: { x: 200, y: 100 },
  rotation: { z: 0 },
  scale: { x: 50, y: 50 },
});

export const RED_TRIANGLE = buildTriangle({
  position: ORIGIN,
  dimensions: SIZE_ONE,
  color: RED_RGB,
  translation: { x: 300, y: 100 },
  rotation: { z: 0 },
  scale: { x: 50, y: 50 },
});
