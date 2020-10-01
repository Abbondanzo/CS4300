export const renderTriangle = (
  gl: WebGLRenderingContext,
  triangle: Triangle
) => {
  const x1 = triangle.position.x - triangle.dimensions.width / 2;
  const y1 = triangle.position.y + triangle.dimensions.height / 2;
  const x2 = triangle.position.x + triangle.dimensions.width / 2;
  const y2 = triangle.position.y + triangle.dimensions.height / 2;
  const x3 = triangle.position.x;
  const y3 = triangle.position.y - triangle.dimensions.height / 2;

  const float32Array = new Float32Array([x1, y1, x2, y2, x3, y3]);

  gl.bufferData(gl.ARRAY_BUFFER, float32Array, gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
