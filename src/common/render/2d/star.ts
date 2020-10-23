import { twoDimensionConverter } from "./twoDimensionConverter";

/**
 * Renders a 5-pointed star inside the given webGL context.
 *
 * 2:33am geometry is good geometry
 *
 * @param gl rendering context
 * @param star dimensions holder
 */
export const renderStar = (
  gl: WebGLRenderingContext,
  star: Canvas2D.Star | Canvas3D.Star
) => {
  const radius = star.dimensions.height / 2;
  const dimenScale = star.dimensions.width / star.dimensions.height;
  const increment = (Math.PI * 2) / 5;
  const cx = star.position.x;
  const cy = star.position.y;
  // Generate points from top, clockwise
  const starPoints = {};
  for (let n = 0; n < 5; n++) {
    const angle = Math.PI / 2 - n * increment;
    const xn = cx + radius * Math.cos(angle) * dimenScale;
    const yn = cy - radius * Math.sin(angle);
    starPoints[`${n + 1}`] = [xn, yn];
  }
  // Generate sixth point below center
  starPoints["6"] = [
    cx,
    cy + radius * (Math.tan((1 / 5) * Math.PI) - Math.tan((1 / 10) * Math.PI)),
  ];
  // Produce three triangles that compose the star
  const t1 = [...starPoints["1"], ...starPoints["3"], ...starPoints["6"]];
  const t2 = [...starPoints["1"], ...starPoints["6"], ...starPoints["4"]];
  const t3 = [...starPoints["5"], ...starPoints["2"], ...starPoints["6"]];

  let points = [...t1, ...t2, ...t3];

  const is3D = "z" in star.position;
  if (is3D) {
    points = twoDimensionConverter(points);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 3 * 3);
};
