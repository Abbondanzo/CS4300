export const renderCube = (gl: WebGLRenderingContext, cube: Canvas3D.Cube) => {
  const x1 = cube.position.x - cube.dimensions.width / 2;
  const y1 = cube.position.y - cube.dimensions.height / 2;
  const z1 = cube.position.z - cube.dimensions.depth / 2;
  const x2 = cube.position.x + cube.dimensions.width / 2;
  const y2 = cube.position.y + cube.dimensions.height / 2;
  const z2 = cube.position.z + cube.dimensions.depth / 2;

  // Front face
  const A = [x1, y2, z1]; // TL
  const B = [x2, y2, z1]; // TR
  const C = [x2, y1, z1]; // BR
  const D = [x1, y1, z1]; // BL

  // Back face (looking thru front)
  const E = [x1, y2, z2]; // TL
  const F = [x2, y2, z2]; // TR
  const G = [x2, y1, z2]; // BR
  const H = [x1, y1, z2]; // BL

  const front = [].concat(A, B, C, A, C, D);
  const right = [].concat(B, F, G, B, G, C);
  const back = [].concat(F, E, H, F, H, G);
  const left = [].concat(E, A, D, E, D, H);
  const top = [].concat(A, E, F, A, F, B);
  const bottom = [].concat(D, C, G, D, G, H);

  const points = [].concat(front, right, back, left, top, bottom);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 36);
};
