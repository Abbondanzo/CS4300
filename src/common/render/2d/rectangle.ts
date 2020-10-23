import { twoDimensionConverter } from "./twoDimensionConverter";

export const renderRectangle = (
  gl: WebGLRenderingContext,
  rectangle: Canvas2D.Rectangle | Canvas3D.Rectangle
) => {
  const x1 = rectangle.position.x - rectangle.dimensions.width / 2;
  const y1 = rectangle.position.y - rectangle.dimensions.height / 2;
  const x2 = rectangle.position.x + rectangle.dimensions.width / 2;
  const y2 = rectangle.position.y + rectangle.dimensions.height / 2;
  let points = [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2];

  const is3D = "z" in rectangle.position;
  if (is3D) {
    points = twoDimensionConverter(points);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};
