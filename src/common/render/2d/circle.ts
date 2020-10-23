import { twoDimensionConverter } from "./twoDimensionConverter";

/**
 * Renders a n-side polygon as a circle inside the given webGL context.
 *
 * @param gl rendering context
 * @param circle dimensions holder
 */
export const renderCircle = (
  gl: WebGLRenderingContext,
  circle: Canvas2D.Circle | Canvas3D.Circle
) => {
  const radius = circle.dimensions.height / 2;
  const dimenScale = circle.dimensions.width / circle.dimensions.height;
  const increment = (Math.PI * 2) / SIDES;
  const cx = circle.position.x;
  const cy = circle.position.y;
  // Generate points based on unit circle
  let circlePoints = [cx, cy];
  for (let n = SIDES; n >= 0; n--) {
    const angle = n * increment;
    const xn = cx + radius * Math.cos(angle) * dimenScale;
    const yn = cy - radius * Math.sin(angle);
    circlePoints.push(xn, yn);
  }

  const is3D = "z" in circle.position;
  if (is3D) {
    circlePoints = twoDimensionConverter(circlePoints);
  }

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(circlePoints),
    gl.STATIC_DRAW
  );
  gl.drawArrays(gl.TRIANGLE_FAN, 0, SIDES + 2);
};

const SIDES = 24;
