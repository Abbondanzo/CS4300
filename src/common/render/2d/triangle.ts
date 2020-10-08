import { twoDimensionConverer } from "./twoDimensionConverter";

export const renderTriangle = (
  gl: WebGLRenderingContext,
  triangle: Canvas2D.Triangle | Canvas3D.Triangle
) => {
  const x1 = triangle.position.x - triangle.dimensions.width / 2;
  const y1 = triangle.position.y + triangle.dimensions.height / 2;
  const x2 = triangle.position.x + triangle.dimensions.width / 2;
  const y2 = triangle.position.y + triangle.dimensions.height / 2;
  const x3 = triangle.position.x;
  const y3 = triangle.position.y - triangle.dimensions.height / 2;

  let points = [x1, y1, x2, y2, x3, y3];

  const is3D = "z" in triangle.position;
  if (is3D) {
    points = twoDimensionConverer(points);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
