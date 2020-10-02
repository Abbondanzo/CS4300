/**
 *
 * Renders a 5-pointed star inside the given webGL context.
 *
 * 2:33am geometry is good geometry
 *
 * @param gl rendering context
 * @param star dimensions holder
 */
export const renderStar = (gl: WebGLRenderingContext, star: Star) => {
  const radius = star.dimensions.height / 2;
  const dimenScale = star.dimensions.width / star.dimensions.height;
  const increment = (Math.PI * 2) / 5;
  const cx = star.position.x;
  const cy = star.position.y;
  // Generate points from top, clockwise
  const starPoints = {};
  for (let n = 0; n < 5; n++) {
    const xn = cx + radius * Math.cos(Math.PI / 2 - n * increment) * dimenScale;
    const yn = cy - radius * Math.sin(Math.PI / 2 - n * increment);
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

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([...t1, ...t2, ...t3]),
    gl.STATIC_DRAW
  );
  gl.drawArrays(gl.TRIANGLES, 0, 9);
};
