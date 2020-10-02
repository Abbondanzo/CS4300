export const renderStar = (gl: WebGLRenderingContext, star: Star) => {
  const radius = star.dimensions.height / 2;
  const dimenScale = star.dimensions.width / star.dimensions.height;
  const increment = (Math.PI * 2) / 5;
  const cx = star.position.x;
  const cy = star.position.y;
  const x1 = cx;
  const y1 = cy - radius;
  const x2 = cx + radius * Math.cos(Math.PI / 2 - increment) * dimenScale;
  const y2 = cy - radius * Math.sin(Math.PI / 2 - increment);
  const x3 = cx + radius * Math.cos(Math.PI / 2 - 2 * increment) * dimenScale;
  const y3 = cy - radius * Math.sin(Math.PI / 2 - 2 * increment);
  const x4 = cx + radius * Math.cos(Math.PI / 2 - 3 * increment) * dimenScale;
  const y4 = cy - radius * Math.sin(Math.PI / 2 - 3 * increment);
  const x5 = cx + radius * Math.cos(Math.PI / 2 - 4 * increment) * dimenScale;
  const y5 = cy - radius * Math.sin(Math.PI / 2 - 4 * increment);
  const x6 = cx;
  const y6 =
    cy + radius * (Math.tan((1 / 5) * Math.PI) - Math.tan((1 / 10) * Math.PI));
  // 1, 3, 6
  // 1, 6, 4
  // 5, 2, 6
  const t1 = [x1, y1, x3, y3, x6, y6];
  const t2 = [x1, y1, x6, y6, x4, y4];
  const t3 = [x5, y5, x2, y2, x6, y6];

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([...t1, ...t2, ...t3]),
    gl.STATIC_DRAW
  );
  gl.drawArrays(gl.TRIANGLES, 0, 9);
};
