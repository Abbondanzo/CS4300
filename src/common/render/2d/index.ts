import { renderCircle } from "./circle";
import { renderRectangle } from "./rectangle";
import { renderStar } from "./star";
import { renderTriangle } from "./triangle";

export const renderShape = (
  gl: WebGLRenderingContext,
  shape: Canvas2D.Shape
) => {
  switch (shape.type) {
    case "RECTANGLE":
      renderRectangle(gl, shape as Canvas2D.Rectangle);
      break;
    case "TRIANGLE":
      renderTriangle(gl, shape as Canvas2D.Triangle);
      break;
    case "CIRCLE":
      renderCircle(gl, shape as Canvas2D.Circle);
      break;
    case "STAR":
      renderStar(gl, shape as Canvas2D.Star);
      break;
    default:
      console.error("Rendering unhandled shape type", shape);
  }
};
