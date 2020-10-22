import { renderCircle } from "../2d/circle";
import { renderRectangle } from "../2d/rectangle";
import { renderStar } from "../2d/star";
import { renderTriangle } from "../2d/triangle";
import { renderCube } from "./cube";

interface RenderOptions {
  shape: Canvas3D.Shape;
  context: WebGLRenderingContext;
  bufferCoords: WebGLBuffer;
  normalBuffer: WebGLBuffer | null;
}

export const renderShape = ({
  shape,
  context,
  bufferCoords,
  normalBuffer,
}: RenderOptions) => {
  switch (shape.type) {
    case "CUBE":
      renderCube(context, shape as Canvas3D.Cube, bufferCoords, normalBuffer);
      break;
    case "RECTANGLE":
      renderRectangle(context, shape as Canvas3D.Rectangle);
      break;
    case "TRIANGLE":
      renderTriangle(context, shape as Canvas3D.Triangle);
      break;
    case "CIRCLE":
      renderCircle(context, shape as Canvas3D.Circle);
      break;
    case "STAR":
      renderStar(context, shape as Canvas3D.Star);
      break;
    default:
      console.error("Rendering unhandled shape type", shape);
  }
};
