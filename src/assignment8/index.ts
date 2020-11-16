import { mat4 } from "gl-matrix";

import { Buffers, initializeBuffers } from "./buffers";
import {
  getProgramParameters,
  initializeShaderProgram,
  ProgramParameters,
} from "./shaders";

const main = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");

  const shaderProgram = initializeShaderProgram(gl);
  const parameters = getProgramParameters(gl, shaderProgram);
  const buffers = initializeBuffers(gl);

  drawScene(gl, parameters, buffers);
};

const drawScene = (
  gl: WebGLRenderingContext,
  parameters: ProgramParameters,
  buffers: Buffers
) => {
  clearScene(gl);
  const projectionMatrix = createProjectionMatrix(gl);
  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
  configurePositionBufferRead(gl, buffers, parameters);
  gl.useProgram(parameters.program);
  setUniforms(gl, parameters, projectionMatrix, modelViewMatrix);
  gl.drawArrays(
    gl.TRIANGLE_STRIP,
    0, // offset
    4
  ); // vertexCount
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
    2,
    gl.FLOAT,
    false,
    0,

    0
  );
  gl.enableVertexAttribArray(parameters.attribLocations.vertexPosition);
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

document.addEventListener("DOMContentLoaded", () => {
  main();
});
