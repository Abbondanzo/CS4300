import { getElementValue } from "@common/form/getElementValue";
import { buildRectangle } from "@common/model/canvas2DShapeBuilders";
import { renderShape } from "@common/render/2d";
import { createProgramFromScripts } from "@common/setup/createProgramFromScripts";
import { getScriptContentsById } from "@common/setup/getScriptContentsById";

const shapes: Canvas2D.Shape[] = [
  buildRectangle({
    position: {
      x: 200,
      y: 100,
    },
    dimensions: {
      width: 50,
      height: 50,
    },
    color: {
      red: Math.random(),
      green: Math.random(),
      blue: Math.random(),
    },
  }),
];

let gl: WebGLRenderingContext;
let attributeCoords: number;
let uniformColor: WebGLUniformLocation;
let bufferCoords: WebGLBuffer;

const init = () => {
  // get a reference to the canvas and WebGL context
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  gl = canvas.getContext("webgl");

  // create and use a GLSL program
  const program = createProgramFromScripts(
    gl,
    getScriptContentsById("vertex-shader-2d"),
    getScriptContentsById("fragment-shader-2d")
  );
  gl.useProgram(program);

  // Click listener
  document
    .querySelector("#addRectangle")
    .addEventListener("click", addRectangle);

  // get reference to GLSL attributes and uniforms
  attributeCoords = gl.getAttribLocation(program, "a_coords");
  const uniformResolution = gl.getUniformLocation(program, "u_resolution");
  uniformColor = gl.getUniformLocation(program, "u_color");

  // initialize coordinate attribute to send each vertex to GLSL program
  gl.enableVertexAttribArray(attributeCoords);

  // initialize coordinate buffer to send array of vertices to GPU
  bufferCoords = gl.createBuffer();

  // configure canvas resolution and clear the canvas
  gl.uniform2f(uniformResolution, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
};

const render = () => {
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferCoords);
  gl.vertexAttribPointer(attributeCoords, 2, gl.FLOAT, false, 0, 0);

  shapes.forEach((shape) => {
    gl.uniform4f(
      uniformColor,
      shape.color.red,
      shape.color.green,
      shape.color.blue,
      1
    );

    renderShape(gl, shape);
  });
};

const addRectangle = (e: Event) => {
  // Prevent form button from submitting
  e.preventDefault();
  e.stopPropagation();

  const x = parseInt(getElementValue("#x"));
  const y = parseInt(getElementValue("#y"));
  const width = parseInt(getElementValue("#width"));
  const height = parseInt(getElementValue("#height"));

  const rectangle = buildRectangle({
    position: { x, y },
    dimensions: { width, height },
    color: {
      red: Math.random(),
      green: Math.random(),
      blue: Math.random(),
    },
  });

  shapes.push(rectangle);
  render();
};

// Assign some functions to window
document.addEventListener("DOMContentLoaded", () => {
  init();
  render();
});
