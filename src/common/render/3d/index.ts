import { renderCircle } from "../2d/circle";
import { renderRectangle } from "../2d/rectangle";
import { renderStar } from "../2d/star";
import { renderTriangle } from "../2d/triangle";

export const renderShape = (
  gl: WebGLRenderingContext,
  shape: Canvas3D.Shape
) => {
  switch (shape.type) {
    case "RECTANGLE":
      renderRectangle(gl, shape as Canvas3D.Rectangle);
      break;
    case "TRIANGLE":
      renderTriangle(gl, shape as Canvas3D.Triangle);
      break;
    case "CIRCLE":
      renderCircle(gl, shape as Canvas3D.Circle);
      break;
    case "STAR":
      renderStar(gl, shape as Canvas3D.Star);
      break;
    default:
      console.error("Rendering unhandled shape type", shape);
  }
};
