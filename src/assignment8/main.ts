import { initializeBuffers } from "./buffers";
import { drawScene } from "./render";
import { getProgramParameters, initializeShaderProgram } from "./shaders";
import { loadTexture } from "./textures";

export const main = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");

  const shaderProgram = initializeShaderProgram(gl);
  const parameters = getProgramParameters(gl, shaderProgram);
  const buffers = initializeBuffers(gl);

  const texture = loadTexture(gl, "rubics.png");

  let then = 0;
  let squareRotation = 0.0;
  const render = (now: number) => {
    now *= 0.001;
    const deltaTime = now - then;
    squareRotation += deltaTime;
    then = now;
    drawScene(gl, parameters, buffers, squareRotation, texture);

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};
