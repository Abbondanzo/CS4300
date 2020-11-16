export interface Buffers {
  position: WebGLBuffer;
}

export const initializeBuffers = (gl: WebGLRenderingContext): Buffers => {
  const positionBuffer = initializePositionBuffer(gl);
  return {
    position: positionBuffer,
  };
};

const initializePositionBuffer = (gl: WebGLRenderingContext) => {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return positionBuffer;
};
