import { mat4 } from "gl-matrix";

import { Buffers } from "./buffers";
import { ProgramParameters } from "./shaders";

export const drawScene = (
  gl: WebGLRenderingContext,
  parameters: ProgramParameters,
  buffers: Buffers,
  squareRotation: number,
  texture: WebGLTexture
) => {
  clearScene(gl);
  const projectionMatrix = createProjectionMatrix(gl);
  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
  mat4.rotate(modelViewMatrix, modelViewMatrix, squareRotation, [0, 0, 1]);
  mat4.rotate(modelViewMatrix, modelViewMatrix, squareRotation * 0.7, [
    0,
    1,
    0,
  ]);

  configurePositionBufferRead(gl, buffers, parameters);
  configureTextureBufferRead(gl, buffers, parameters);

  gl.useProgram(parameters.program);
  setUniforms(gl, parameters, projectionMatrix, modelViewMatrix);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(parameters.uniformLocations.uSampler, 0);
};

const clearScene = (gl: WebGLRenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

const createProjectionMatrix = (gl: WebGLRenderingContext) => {
  const fieldOfView = (45 * Math.PI) / 180;
  const canvas = gl.canvas as HTMLCanvasElement;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  return projectionMatrix;
};

const configurePositionBufferRead = (
  gl: WebGLRenderingContext,
  buffers: Buffers,
  parameters: ProgramParameters
) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    parameters.attribLocations.vertexPosition,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(parameters.attribLocations.vertexPosition);
};

const configureTextureBufferRead = (
  gl: WebGLRenderingContext,
  buffers: Buffers,
  parameters: ProgramParameters
) => {
  const num = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
  gl.vertexAttribPointer(
    parameters.attribLocations.textureCoord,
    num,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(parameters.attribLocations.textureCoord);
};

const setUniforms = (
  gl: WebGLRenderingContext,
  parameters: ProgramParameters,
  projectionMatrix: mat4,
  modelViewMatrix: mat4
) => {
  gl.uniformMatrix4fv(
    parameters.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    parameters.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );
};
