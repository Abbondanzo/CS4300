export interface Buffers {
  position: WebGLBuffer;
  color: WebGLBuffer;
  indices: WebGLBuffer;
}

export const initializeBuffers = (gl: WebGLRenderingContext): Buffers => {
  const positionBuffer = initializePositionBuffer(gl);
  const colorBuffer = initializeColorBuffer(gl);
  const indexBuffer = initializeIndexBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
};

const initializePositionBuffer = (gl: WebGLRenderingContext) => {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // prettier-ignore
  const positions = [
   -1.0, -1.0,  1.0,    1.0, -1.0,  1.0,    1.0,  1.0,  1.0,   -1.0,  1.0,  1.0, // front
   -1.0, -1.0, -1.0,   -1.0,  1.0, -1.0,    1.0,  1.0, -1.0,    1.0, -1.0, -1.0, // back
   -1.0,  1.0, -1.0,   -1.0,  1.0,  1.0,    1.0,  1.0,  1.0,    1.0,  1.0, -1.0, // top
   -1.0, -1.0, -1.0,    1.0, -1.0, -1.0,    1.0, -1.0,  1.0,   -1.0, -1.0,  1.0, // bottom
    1.0, -1.0, -1.0,    1.0,  1.0, -1.0,    1.0,  1.0,  1.0,    1.0, -1.0,  1.0, // right
   -1.0, -1.0, -1.0,   -1.0, -1.0,  1.0,   -1.0,  1.0,  1.0,   -1.0,  1.0, -1.0, // left
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return positionBuffer;
};

const initializeColorBuffer = (gl: WebGLRenderingContext) => {
  // prettier-ignore
  const faceColors = [
    [1.0,  1.0,  1.0,  1.0], // front: white
    [1.0,  0.0,  0.0,  1.0], // back: red
    [0.0,  1.0,  0.0,  1.0], // top: green
    [0.0,  0.0,  1.0,  1.0], // bottom: blue
    [1.0,  1.0,  0.0,  1.0], // right: yellow
    [1.0,  0.0,  1.0,  1.0], // left: purple
  ];
  let colors = [];
  faceColors.forEach((color) => {
    colors = colors.concat(color, color, color, color);
  });
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
};

const initializeIndexBuffer = (gl: WebGLRenderingContext) => {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // prettier-ignore
  const indices = [
       0,  1,  2,      0,  2,  3, // front
       4,  5,  6,      4,  6,  7, // back
       8,  9, 10,      8, 10, 11, // top
      12, 13, 14,     12, 14, 15, // bottom
      16, 17, 18,     16, 18, 19, // right
      20, 21, 22,     20, 22, 23, // left
    ];

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  return indexBuffer;
};
